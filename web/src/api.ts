import type { FullResult, LeaderboardEntry, Pitch } from "./types";
import {
  leaderboardEntry1,
  leaderboardEntry2,
  leaderboardEntry3,
  sampleResult1,
  sampleResult2,
  sampleResult3,
} from "./mocks/mockData";

export function judgePitch(_pitch: Pitch): Promise<FullResult> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(getFullResult());
    }, 500);
  });
}

var counter = 0;

export function getFullResult(): FullResult {
  counter++;
  counter %= 3;
  return counter == 0
    ? sampleResult1
    : counter == 1
      ? sampleResult2
      : sampleResult3;
}

export function getLeaderboardEntries(): Promise<LeaderboardEntry[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([leaderboardEntry1, leaderboardEntry2, leaderboardEntry3]);
    }, 500);
  });
}
