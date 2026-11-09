import type { FullResults, Pitch } from "./types";
import {
  sampleResults1,
  sampleResults2,
  sampleResults3,
} from "./mocks/mockData";

export function judgePitch(_pitch: Pitch): Promise<FullResults> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(giveFullResults());
    }, 500);
  });
}

function giveFullResults(): FullResults {
  return sampleResults2;
}
