const PlayerStatName = {
  maxHp: "최대 HP",
  crit: "치명",

  phyAtkDefault: "물리 공격력(표준)",
  fireAtkDefault: "화염 공격력(표준)",
  iceAtkDefault: "얼음 공격력(표준)",
  thunderAtkDefault: "번개 공격력(표준)",

  phyAtkBase: "물리 공격력(기본)",
  fireAtkBase: "화염 공격력(기본)",
  iceAtkBase: "얼음 공격력(기본)",
  thunderAtkBase: "번개 공격력(기본)",
  superpowerAtkBase: "이능 공격력(기본)",

  phyAtk: "물리 공격력(표기)",
  fireAtk: "화염 공격력(표기)",
  iceAtk: "얼음 공격력(표기)",
  thunderAtk: "번개 공격력(표기)",
  superpowerAtk: "이능 공격력(표기)",

  phyDef: "물리 내성",
  fireDef: "화염 내성",
  iceDef: "얼음 내성",
  thunderDef: "번개 내성",
  superpowerDef: "이능 내성",
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
