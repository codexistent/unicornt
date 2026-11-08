/**
 * @fileoverview Defines types used throughout app
 */

// judge result
export type JudgeResult = {
  judgeName: string; // judge name
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
  pitchId?: string;
};

// pitch - for POST
export type Pitch = {
  companyName: string; // company name - max 50 chars
  text: string; // idea text - max 280 chars
};

// leaderboard entry
export type LeaderboardEntry = {
  pitch: Pitch; // TODO: replace with just pitchId and retrieve it

  totalScore: number;
  verdict: Verdict;
  userId: string; // also github username
  avatarUrl: string;
  creationTime: string; // JSON has no date type
};
