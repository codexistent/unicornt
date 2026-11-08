/**
 * @fileoverview Defines types used throughout app
 */

// judge result
export type JudgeResult = {
  name: string;
  feedback: string;
  score: number;
};

// verdict - literal union type
export type Verdict = "unicorn" | "unicorndt";

// roast result
export type FullResults = {
  judgeResults: JudgeResult[];
  totalScore: number;
  verdict: Verdict;
  userId?: number;
};

// pitch
export type Pitch = {
  pitchId: number;
  name: string;
  pitch: string;
};

// leaderboard entry
export type LeaderboardEntry = {
  pitchId: number;
  totalScore: number;
  verdict: Verdict;
  userId: number;
  creationTime: Text; // JSON has no date type
};
