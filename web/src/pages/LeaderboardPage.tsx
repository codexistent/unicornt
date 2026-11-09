// import type { LeaderboardEntry } from "@/types";
// import { useState } from "react";

// type LeaderboardState =
//   | { status: "loading" }
//   | { status: "error"; message: string }
//   | { status: "success"; entries: LeaderboardEntry[] };

// export function LeaderboardPage() {
//   const [state, setState] = useState<LeaderboardState>({ status: "loading" });

//   return (
//     <main className="mx-auto max-w-3xl space-y-6 px-4 py-8">
//       <section className="space-y-2 text-center">
//         <h1 className="text-3xl font-bold">Leaderboard</h1>
//         <p className="text-muted-foreground">The top 20 pitches so far.</p>
//       </section>

//       {state.status == "loading" && (
//         <p className="text-center text-muted-foreground">Loading pitches...</p>
//       )}

//       {state.status === "success" && state.entries.length > 0 && (
//         <ol>
//           {state.entries.map((entry, index) => (
//             <LeaderboardRow />
//           ))}
//         </ol>
//       )}
//     </main>
//   );
// }
