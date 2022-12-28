import {
  EquipmentOptionAdjust,
  EquipmentOptionValue,
  LookupResponse,
} from "./types";

async function lookup(option: string, uid: string) {
  if (option === "uid" && uid.length !== 17) return Promise.reject();

  return (await fetch(`https://api.tof.news/lookup/${option}/${uid}`).then(
    (resp) => resp.json()
  )) as LookupResponse;
}

function parsePart(part: string) {
  return part.replace(/\d*_[^_]+$/, "");
}

function optionText({
  value,
  adjust,
  amount,
}: {
  value?: EquipmentOptionValue;
  adjust?: EquipmentOptionAdjust;
  amount?: string;
}) {
  const isPercent = value === "Crit" || adjust?.endsWith("Mult");
  return (
    (isPercent
      ? (parseFloat(amount ?? "0") * 100)?.toFixed(2)
      : parseInt(amount ?? "0").toString()) + (isPercent ? "%" : "")
  );
}

export { lookup, parsePart, optionText };
