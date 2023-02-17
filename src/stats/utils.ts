import { useEffect } from "react";
import { useState } from "react";
import {
  EquipStatsResponse,
  EquipStatsResult,
  PlayerStatKeys,
  PlayerStatName,
  PlayerStatsResponse,
  PlayerStatsResult,
  WeaponStatsResponse,
  WeaponStatsResult,
} from "./types";

function weaponNameString(weaponNames: string[]) {
  const krNames: { [key: string]: string } = {
    arm_physic: "라일라",
    bigsword_ice: "메릴",
    bow_fire: "컴파운드 보우", //
    bow_ice: "츠바사",
    bow_physic: "바이링",
    canon_ice: "힐다",
    cube_fire: "제로",
    darts_physic: "시로",
    dgun_thunder: "새미어",
    digger_physic: "격투검",
    digger_thunder: "크로우",
    Dkatana_ice: "사키",
    fan_superpower: "린",
    Frigg_ice: "프리그",
    funnel_fire: "루비",
    gun_fire: "코발트",
    hammer_ice: "이네",
    ShieldAxe_Fire: "휴마",
    Snipe_fire: "애나벨라",
    sickle_fire: "킹",
    spear_ice: "얼음장창",
    spear_thunder: "시리우스",
    stave_ice: "코코리터",
    stave_thunder: "에코",
    Suspension_thunder: "네메시스",
    sword_physic: "클라우디아",
    sword_thunder: "전자검",
    tianlang_thunder: "시리우스",
    iceblade_ice: "앨리스",
  };

  return weaponNames
    .filter((x) => x !== "fan_superpower")
    .concat(weaponNames.includes("fan_superpower") ? ["fan_superpower"] : [])
    .map((enName) => krNames[enName])
    .join("/");
}

function useWeaponStats() {
  const [result, setResult] = useState<WeaponStatsResult>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_ENDPOINT}/stats/weapon`)
      .then((resp) => resp.json())
      .then((json) => json as WeaponStatsResponse)
      .then((rawResult) =>
        rawResult.sort(([_, numA], [__, numB]) => numB - numA)
      )
      .then((result) =>
        result.map(([rawString, count]): [string[], number] => [
          rawString.split(";"),
          count,
        ])
      )
      .then((result) => result.filter(([weapons]) => weapons.length === 3))
      .then((result) => {
        const mainResults: WeaponStatsResult = [];
        let etcCount = 0;
        result.forEach(([combination, count]) => {
          if (count >= 50)
            mainResults.push({ name: weaponNameString(combination), y: count });
          else etcCount += count;
        });
        mainResults.push({ name: "기타", y: etcCount });
        return mainResults;
      })
      .then(setResult);
  }, []);

  return result;
}

function usePlayerStats(statName: PlayerStatKeys) {
  const [result, setResult] = useState<PlayerStatsResult[]>([
    {
      name: "치명",
      data: [],
    },
  ]);

  useEffect(() => {
    const fetchTargets: string[] = [statName];
    if (statName.endsWith("Atk") && !statName.startsWith("superpower")) {
      fetchTargets.push(`${statName}Base`, `${statName}Default`);
    }

    Promise.all(
      fetchTargets.map((target) =>
        fetch(
          `${import.meta.env.VITE_API_ENDPOINT}/stats/player?stat=${target}`
        )
          .then((resp) => resp.json())
          .then((json) => json as PlayerStatsResponse)
          .then((result) => ({
            name: `${PlayerStatName[target as PlayerStatKeys]}`,
            data: result,
          }))
      )
    ).then(setResult);
  }, [statName]);

  return result;
}

function useEquipmentStats() {
  const [result, setResult] = useState<EquipStatsResult>({
    name: "공격력",
    data: [],
  });

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_ENDPOINT}/stats/equip`)
      .then((resp) => resp.json())
      .then((json) => json as PlayerStatsResponse)
      .then((result) => ({
        name: `공격력`,
        data: result,
      }))
      .then(setResult);
  }, []);

  return result;
}

export { useWeaponStats, usePlayerStats, useEquipmentStats };
