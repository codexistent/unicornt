/**
 * @fileoverview Temporary fake data for ui testing
 */
import type { FullResults, LeaderboardEntry } from "../types";

export const sampleResults1: FullResults = {
  judgeResults: [
    {
      judgeName: "Jacobi",
      feedback:
        "Very sketchy pitch. Your company's future is looking dimmer than my son's.",
      score: 3,
    },
    {
      judgeName: "Toobie",
      feedback: "The sector's not looking great, I'm not sure about this.",
      score: 4,
    },
    {
      judgeName: "Appa",
      feedback: "I got depressed in the middle of your pitch.",
      score: 3,
    },
  ],
  totalScore: 10,
  verdict: "unicornt",
  pitchId: "a1b2c3",
};

export const sampleResults2: FullResults = {
  judgeResults: [
    {
      judgeName: "Jacobi",
      feedback:
        "Very sketchy pitch. Your company's future is looking dimmer than my son's.",
      score: 3,
    },
    {
      judgeName: "Toobie",
      feedback: "The sector's not looking great, I'm not sure about this.",
      score: 10,
    },
    {
      judgeName: "Ono",
      feedback: "Nopie nope nope.",
      score: 3,
    },
  ],
  totalScore: 16,
  verdict: "unicornt",
  pitchId: "a1b2c3",
};

export const sampleResults3: FullResults = {
  judgeResults: [
    {
      judgeName: "Jacobi",
      feedback:
        "Very sketchy pitch. Your company's future is looking dimmer than my son's.",
      score: 3,
    },
    {
      judgeName: "Toobie",
      feedback: "The sector's not looking great, I'm not sure about this.",
      score: 4,
    },
    {
      judgeName: "Onope",
      feedback: "Onope.",
      score: 3,
    },
  ],
  totalScore: 10,
  verdict: "unicornt",
  pitchId: "a1b2c3",
};

export const leaderboardEntry1: LeaderboardEntry = {
  pitch: {
    companyName: "RightLeftRightLeftRightLeftRightLeftRightLeftRight",
    text: "Helping people differentiate their left from their right hands",
  },
  pitchId: "z9b2c3",

  totalScore: 20,
  verdict: "unicorn",
  githubUsername: "strong",
  avatarUrl: "https://github.com/test.png",
  creationTime: "2026-11-08T19:41:00Z",
};

export const leaderboardEntry2: LeaderboardEntry = {
  pitch: {
    companyName: "Cabin",
    text: "Making only the highest quality cabins! Custom cabins, tall cabins, small cabins, dog cabins. Making only the highest quality cabins! Custom cabins, tall cabins, small cabins, dog cabins. Making only the highest quality cabins! Custom cabins, tall cabins, small cabins, dog cabins",
  },
  pitchId: "123rst",

  totalScore: 12,
  verdict: "unicornt",
  githubUsername: "maker2",
  avatarUrl: "https://github.com/codexistent.png",
  creationTime: "2026-11-08T19:41:00Z",
};

export const leaderboardEntry3: LeaderboardEntry = {
  pitch: {
    companyName: "SoggyWaffles",
    text: "We sell the soggiest waffles in town.",
  },
  pitchId: "a1b2c3",

  totalScore: 10,
  verdict: "unicornt",
  githubUsername: "maker2",
  avatarUrl: "https://github.com/waffles.png",
  creationTime: "2026-11-08T19:41:00Z",
};
