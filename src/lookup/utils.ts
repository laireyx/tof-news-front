import {
  EquipmentOptionAdjust,
  EquipmentOptionValue,
  LookupRecord,
  LookupResponse,
} from "./types";
import avatars from "./avatars";

async function lookup(option: string, uid: string, server: string) {
  if (option === "uid" && uid.length !== 17) return Promise.reject();

  return (await fetch(
    `https://api.tof.news/lookup/${option}/${uid}?server=${server}`
  ).then((resp) => resp.json())) as LookupResponse;
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

async function drawNametag(
  cv: HTMLCanvasElement,
  record: LookupRecord,
  avatarIdx: number
) {
  const ctx = cv.getContext("2d");
  if (!ctx) return;

  function drawImg(
    url: string,
    dx: number,
    dy: number,
    dw?: number,
    dh?: number
  ) {
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = url;
    return new Promise((resolve, reject) => {
      img.onload = () => {
        if (dw && dh) ctx.drawImage(img, dx, dy, dw, dh);
        else ctx.drawImage(img, dx, dy);
        resolve(null);
      };
      img.onerror = (err) => {
        reject(err);
      };
    });
  }

  async function task(cb: () => void | Promise<void>) {
    if (!ctx) return;

    ctx.save();
    await cb();
    ctx.restore();
  }

  await task(() => {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, 900, 500);
    ctx.fillStyle = "#030066";
    ctx.fillRect(0, 410, 900, 45);

    ctx.font = "800 28px Roboto Slab";
    const { width } = ctx.measureText("Tower of Fantasy");
    ctx.fillStyle = "white";
    ctx.fillText("Tower of Fantasy", 450 - width / 2, 441);

    ctx.fillStyle = "grey";
    ctx.fillRect(350, 75, 2, 280);
  });

  await task(async () => {
    drawImg(`img/avatar/${avatars[avatarIdx]}`, 48, 75, 256, 256);
  });

  await task(() => {
    ctx.fillStyle = "#030066";
    ctx.font = "800 48px NanumSquareRound";
    ctx.fillText(`${record.name}`, 400, 128);
  });

  await task(async () => {
    ctx.fillStyle = "black";
    ctx.font = "bold 24px NanumSquareRound";
    ctx.fillText(`${record.guildName ?? "무소속"}`, 400, 174);
  });

  await task(async () => {
    ctx.fillStyle = "black";
    ctx.font = "800 24px Roboto Slab";
    ctx.fillText(
      `Lvl. ${record.level} | GS ${record.battleStrength}`,
      400,
      232
    );
  });

  await task(async () => {
    ctx.fillStyle = "#030066";
    ctx.font = "800 24px Roboto Slab";
    ctx.fillText("UID ", 400, 264);

    const { width } = ctx.measureText("UID ");
    ctx.fillStyle = "black";
    ctx.fillText(record.uid, 400 + width, 264);
  });

  await task(async () => {
    await Promise.all(
      record.data.weapons.map(async ({ name }, i) =>
        drawImg(`/img/weapon/${name}.webp`, 400 + i * 72, 280, 64, 64)
      )
    );
  });
}

function copyNametag(cv: HTMLCanvasElement | null) {
  if (!cv) {
    alert("알 수 없는 오류가 발생하였습니다.");
    return;
  }

  cv.toBlob(
    (bl) => {
      if (!bl || !navigator.clipboard) {
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

export { lookup, parsePart, optionText, drawNametag, copyNametag };
