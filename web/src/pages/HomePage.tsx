import { judgeResult1 } from "../mocks/mockData";
import { JudgeCard } from "../widgets/JudgeCard";

export function HomePage() {
  return (
    <>
      <JudgeCard result={judgeResult1} />
    </>
  );
}
