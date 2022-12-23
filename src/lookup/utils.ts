import { EquipmentOptionAdjust, LookupResponse } from "./types";

async function lookup(option: string, uid: string) {
  if (option === "uid" && uid.length !== 17) return Promise.reject();

  const resp = await fetch(`https://api.tof.news/lookup/${option}/${uid}`);
  return resp.json() as LookupResponse;
}

function parsePart(part: string) {
  return part.replace(/\d*_[^_]+$/, "");
}

function optionText(adjust: EquipmentOptionAdjust, amount: string) {
  return (
    (adjust?.endsWith("Mult")
      ? (parseFloat(amount ?? "0") * 100)?.toFixed(2)
      : parseInt(amount ?? "0").toString()) +
    (adjust?.endsWith("Mult") ? "%" : "")
  );
}

export { lookup, parsePart, optionText };
