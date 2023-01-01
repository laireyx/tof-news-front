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
  const isPercent =
    (value === "Crit" && +(amount ?? "0") < 73) || adjust?.endsWith("Mult");
  return (
    (isPercent
      ? (parseFloat(amount ?? "0") * 100)?.toFixed(2)
      : parseInt(amount ?? "0").toString()) + (isPercent ? "%" : "")
  );
}

function copyNametag(uid: string) {
  // Prepare canvas
  const cv = document.createElement("canvas");
  cv.width = 480;
  cv.height = 320;

  // Get an image
  const img = document.querySelector<HTMLImageElement>("#nametag");
  if (!img) {
    alert("알 수 없는 오류가 발생하였습니다.");
    return;
  }

  img.crossOrigin = "anonymous";
  img.src = `https://api.tof.news/nametag/${uid}`;

  const ctx = cv.getContext("2d");
  if (!ctx) {
    alert("알 수 없는 오류가 발생하였습니다.");
    return;
  }
  ctx.imageSmoothingQuality = "high";
  // ctx.imageSmoothingEnabled = false;
  ctx.drawImage(img, 0, 0, 480, 320);

  cv.toBlob(
    (bl) => {
      if (!bl) {
        alert("알 수 없는 오류가 발생하였습니다.");
        return;
      }

      navigator.clipboard.write([new ClipboardItem({ "image/png": bl })]);

      alert("유저 프로필을 복사하였습니다.");
    },
    "image/png",
    1
  );
}

export { lookup, parsePart, optionText, copyNametag };
