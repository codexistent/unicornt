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

var counter = 0;

function giveFullResults(): FullResults {
  counter++;
  counter %= 3;
  return counter == 0
    ? sampleResults1
    : counter == 1
      ? sampleResults2
      : sampleResults3;
}
