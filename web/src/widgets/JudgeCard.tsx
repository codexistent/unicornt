import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { JudgeResult } from "@/types";

type JudgeCardProps = {
  result: JudgeResult;
};

type JudgeStyle = {
  emoji: string;
  tagline: string;
};

const JUDGE_STYLES: Record<string, JudgeStyle> = {
  "Hype Bro": { emoji: "🚀", tagline: "Has never met an idea he didn't love" },
  "Brutal Skeptic": {
    emoji: "🧐",
    tagline: "Has never met an idea she did love",
  },
  "Confused Boomer": { emoji: "👴", tagline: "Still not sure what an app is" },
};

const FALLBACK_STYLE: JudgeStyle = { emoji: "🦄", tagline: "Mystery investor" };

function scoreVariant(score: number): "default" | "secondary" | "destructive" {
  if (score >= 8) return "default";
  if (score <= 3) return "destructive";
  return "secondary";
}

export function JudgeCard({ result }: JudgeCardProps) {
  const { judgeName, feedback, score } = result;
  const style = JUDGE_STYLES[judgeName] ?? FALLBACK_STYLE;
  const clampedScore = Math.min(10, Math.max(0, score));

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xl"
            >
              {style.emoji}
            </span>
            <div>
              <CardTitle>{judgeName}</CardTitle>
              <CardDescription>{style.tagline}</CardDescription>
            </div>
          </div>
          <Badge
            variant={scoreVariant(score)}
            className="shrink-0 tabular-nums"
          >
            {score}/10
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col gap-4">
        <blockquote className="flex-1 border-l-2 border-primary pl-3 italic text-muted-foreground">
          “{feedback}”
        </blockquote>

        <div
          role="meter"
          aria-label={`${judgeName}'s score`}
          aria-valuemin={0}
          aria-valuemax={10}
          aria-valuenow={clampedScore}
          className="h-2 overflow-hidden rounded-full bg-muted"
        >
          <div
            className="h-full rounded-full bg-primary transition-[width] duration-500 motion-reduce:transition-none"
            style={{ width: `${clampedScore * 10}%` }}
          />
        </div>
      </CardContent>
    </Card>
  );
}
