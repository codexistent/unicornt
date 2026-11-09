// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Card, CardContent } from "@/components/ui/card";
// import type { LeaderboardEntry, Pitch } from "@/types";

// type LeaderboardRowProps = {
//   entry: LeaderboardEntry;
//   rank: number;
// };

// export default function LeaderboardRow({ entry, rank }: LeaderboardRowProps) {
//   const {
//     pitch: { companyName, text },
//     totalScore,
//     verdict,
//     githubUsername,
//     avatarUrl,
//     creationTime,
//   } = entry;

//   return (
//     <li>
//       <Card>
//         <CardContent className="flex items-start gap-4">
//           <span className="w-8 shrink-0 pt-1 text-center text-xl font-bold tabular-nums text-muted-foreground">
//             #{rank}
//           </span>

//           <div className="min-w-0 flex-1 space-y-1">
//             <p className="truncate font-semibold">{companyName}</p>
//             <p className="line-clamp-2 break-words text-sm text-muted-foreground">
//               {text}
//             </p>
//             <div className="flex items-center gap-2 text-xs text-muted-foreground">
//               <Avatar size="sm">
//                 <AvatarImage src={avatarUrl} alt="" />
//                 <AvatarFallback>
//                   {githubUsername.slice(0, 2).toUpperCase()}
//                 </AvatarFallback>
//               </Avatar>
//               <span className="truncate">@{githubUsername}</span>
//               <time dateTime={creationTime} className="ml-auto shrink-0">
//                 {dateFormatter.format(new Date(creationTime))}
//               </time>
//             </div>
//           </div>
//         </CardContent>
//       </Card>
//     </li>
//   );
// }
