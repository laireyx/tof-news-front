import { LookupResponse } from "./types";

async function lookup(option: string, uid: string) {
  if (option === "uid" && uid.length !== 17) return Promise.reject();

  const resp = await fetch(`https://api.tof.news/lookup/${option}/${uid}`);
  return resp.json() as LookupResponse;
}

export { lookup };
