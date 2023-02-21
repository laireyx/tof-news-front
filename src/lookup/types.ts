type PlayerStat = Partial<{
  maxHp: number;
  crit: number;

  phyAtkDefault: number;
  fireAtkDefault: number;
  iceAtkDefault: number;
  thunderAtkDefault: number;

  phyAtkBase: number;
  fireAtkBase: number;
  iceAtkBase: number;
  thunderAtkBase: number;

  phyAtk: number;
  fireAtk: number;
  iceAtk: number;
  thunderAtk: number;
  superpowerAtk: number;

  phyDef: number;
  fireDef: number;
  iceDef: number;
  thunderDef: number;
  superpowerDef: number;
}>;

type WeaponStat = {
  name: string;
  stars: number;
  level: number;
};

type EquipmentOptionElement =
  | "Common"
  | "Element"
  | "Phy"
  | "Thunder"
  | "Fire"
  | "Ice"
  | "Superpower";
type EquipmentOptionValue = "Atk" | "Def" | "MaxHealth" | "Crit";
type EquipmentOptionAdjust = "Added" | "Mult" | "ExtraUpMult";

type EquipmentOption = {
  element?: EquipmentOptionElement;
  value?: EquipmentOptionValue;
  adjust?: EquipmentOptionAdjust;
  amount?: string;
};

type EquipmentStat = {
  part: string;
  level: number;
  options: EquipmentOption[];
  stars: number;
};

type LookupRecord = {
  uid: string;
  name: string;
  server: "101" | "102";

  guildName?: string;
  inGameUid: string;
  level: number;
  battleStrength: number; // aka GS

  timestamp: number;
  data: {
    player: PlayerStat;
    weapons: WeaponStat[];
    equipments: EquipmentStat[];
  };
};

type LookupResponse = {
  queued?: boolean;
  num?: number;
  data?: LookupRecord;
};

export type {
  LookupResponse,
  LookupRecord,
  EquipmentOption,
  EquipmentOptionElement,
  EquipmentOptionValue,
  EquipmentOptionAdjust,
  PlayerStat,
  WeaponStat,
  EquipmentStat,
};
