const PlayerStatName = {
  maxHp: "최대 HP",
  crit: "치명",

  phyAtk: "물리 공격력",
  fireAtk: "화염 공격력",
  iceAtk: "얼음 공격력",
  thunderAtk: "번개 공격력",
  superpowerAtk: "이능 공격력",

  phyDef: "물리 저항",
  fireDef: "화염 저항",
  iceDef: "얼음 저항",
  thunderDef: "번개 저항",
  superpowerDef: "이능 저항",
} as const;

type PlayerStatKeys = keyof typeof PlayerStatName;

type WeaponStatsResponse = [string, number][];
type WeaponStatsResult = { name: string; y: number }[];

type PlayerStatsResponse = [number, number][];
type PlayerStatsResult = { name: string; data: number[] };

export { PlayerStatName };
export type {
  WeaponStatsResponse,
  WeaponStatsResult,
  PlayerStatsResponse,
  PlayerStatsResult,
  PlayerStatKeys,
};
