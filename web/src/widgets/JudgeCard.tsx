import type { JudgeResult } from "../types";

type JudgeCardProps = {
  judgeResult: JudgeResult;
};

export function JudgeCard({ judgeResult }: JudgeCardProps) {
  return (
    <article className="flex h-full flex-col justify-between gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <header className="flex items-center gap-3">
        <span className="text-3xl" aria-hidden="true">
          🥴
        </span>
        <div>
          <p className="text-sm text-gray-500">Judge</p>
          <h3 className="font-semibold text-gray-900">
            {judgeResult.judgeName}
          </h3>
        </div>
      </header>

      <blockquote className="text-gray-700 italic">
        “{judgeResult.feedback}”
      </blockquote>

      <footer className="flex items-baseline justify-between border-t border-gray-100 pt-3">
        <span className="text-sm text-gray-500">Judge rating</span>
        <span className="text-2xl font-bold text-emerald-600">
          {judgeResult.score}
          <span className="text-sm text-gray-400">/10</span>
        </span>
      </footer>
    </article>
  );
}
