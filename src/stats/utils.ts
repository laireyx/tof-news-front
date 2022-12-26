import { useEffect } from "react";
import { useState } from "react";
import { WeaponStatsResponse, WeaponStatsResult } from "./types";

function useStats() {
  const [result, setResult] = useState<WeaponStatsResult>([]);

  useEffect(() => {
    fetch(`https://api.tof.news/statistics/weapon`)
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
      .then(setResult);
  }, []);

  return result;
}

export { useStats };
