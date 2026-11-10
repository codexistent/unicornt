import type { FullResult, LeaderboardEntry, Pitch } from "./types";
import {
  leaderboardEntry1,
  leaderboardEntry2,
  leaderboardEntry3,
  sampleResult1,
  sampleResult2,
  sampleResult3,
} from "./mocks/mockData";

const API_URL: string = import.meta.env.VITE_API_URL;

console.log("env:", import.meta.env);
if (!API_URL) {
  throw new Error(
    "VITE_API_URL not set. Add to web/.env.local and restart server",
  );
}

// prints errors interpreted in a human-readable way
async function getErrorMessage(response: Response): Promise<string> {
  try {
    const body: unknown = await response.json();
    if (
      typeof body === "object" &&
      body !== null &&
      "detail" in body &&
      typeof body.detail === "string"
    ) {
      return body.detail;
    }
  } catch {} // body wasn't JSON
  return `Request failed (${response.status}). Please try again.`;
}

// request from remote server
async function request<T>(path: string, init?: RequestInit): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`${API_URL}${path}`, init);
  } catch {
    throw new Error(
      "Can't reach the judges right now. Check connection and try again.",
    );
  }

  if (!response.ok) {
    throw new Error(await getErrorMessage(response));
  }

  return (await response.json()) as T;
}

export async function judgePitch(_pitch: Pitch): Promise<FullResult> {
  return request<FullResult>("/api/judge", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(_pitch),
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
