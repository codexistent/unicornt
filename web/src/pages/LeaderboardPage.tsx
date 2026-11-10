import type { LeaderboardEntry } from "@/types";
import { useState, useEffect } from "react";
import LeaderboardRow from "../widgets/LeaderboardRow";
import { getLeaderboardEntries } from "@/api";

type LeaderboardState =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "success"; entries: LeaderboardEntry[] };

export function LeaderboardPage() {
  const [state, setState] = useState<LeaderboardState>({ status: "loading" });

  // run only once on mount
  useEffect(() => {
    let ignore = false;

    getLeaderboardEntries()
      .then((entries) => {
        if (!ignore) setState({ status: "success", entries });
      })
      .catch((error: unknown) => {
        if (ignore) return;
        const message =
          error instanceof Error
            ? error.message
            : "Couldn't load leaderboard. Refresh to try again.";
        setState({ status: "error", message });
      });

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <main className="mx-auto max-w-3xl space-y-6 px-4 py-8">
      <section className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Leaderboard</h1>
        <p className="text-muted-foreground">The top 20 pitches so far.</p>
      </section>

      {state.status == "loading" && (
        <p className="text-center text-muted-foreground">Loading pitches...</p>
      )}

      {state.status == "error" && (
        <p className="text-center text-destructive">{state.message}</p>
      )}

      {state.status === "success" && state.entries.length === 0 && (
        <p className="text-center text-muted-foreground">
          No pitches yet. Sign in and pitch to take the #1 spot.
        </p>
      )}

      {state.status === "success" && state.entries.length > 0 && (
        <ol>
          {state.entries.map((entry, index) => (
            <LeaderboardRow entry={entry} rank={index + 1} />
          ))}
        </ol>
      )}
    </main>
  );
}
