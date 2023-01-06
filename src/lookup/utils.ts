import {
  EquipmentOptionAdjust,
  EquipmentOptionValue,
  LookupRecord,
  LookupResponse,
} from "./types";
import avatars from "./avatars";

function lookupByName(name: string, server: string) {
  return fetch(
    `https://api.tof.news/lookup/name/${name}?server=${server}`
  ).then((resp) => resp.json()) as Promise<LookupResponse>;
}

function lookupByUid(uid: string, server: string) {
  let canonicalUid = uid;

  const isCanoincalUid = uid.match(/4294\d{13}/);
  if (!isCanoincalUid) {
    // 999910x style UID
    const isScreenUid = uid.match(/999910([12])(\d+)/);
    if (!isScreenUid) return Promise.reject();
    const [, server, index] = isScreenUid;
    canonicalUid = (
      BigInt(server === "1" ? "42945811784400896" : "42945816079368192") +
      BigInt(index)
    ).toString();
  }

  if (canonicalUid.length !== 17) return Promise.reject();

  return fetch(
    `https://api.tof.news/lookup/uid/${canonicalUid}?server=${server}`
  ).then((resp) => resp.json()) as Promise<LookupResponse>;
}

function lookup(option: string, str: string, server: string) {
  if (option === "name") {
    return lookupByName(str, server);
  } else if (option === "uid") {
    return lookupByUid(str, server);
  } else return Promise.reject();
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
    ctx.fillText(
      `${record.server === "101" ? "아스트라" : "뱅기스"} ${
        record.guildName ?? "무소속"
      }`,
      400,
      174
    );
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

function copyNametag(cv: HTMLCanvasElement | null, name: string) {
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

      const url = URL.createObjectURL(bl);

      const anchorElement = document.createElement("a");
      anchorElement.setAttribute("href", url);
      anchorElement.setAttribute("download", `${name}.png`);
      anchorElement.click();

      anchorElement.addEventListener("click", () => {
        URL.revokeObjectURL(url);
        anchorElement.remove();
      });
    },
    "image/png",
    1
  );
}

export { lookup, parsePart, optionText, drawNametag, copyNametag };
