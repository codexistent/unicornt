import { MAX_NAME, MAX_TEXT } from "@/globals";
import { judgePitch } from "@/api";
import type { Pitch, PitchFormState } from "@/types";
import { useState, type SubmitEvent } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { JudgeCard } from "@/widgets/JudgeCard";

type HomePageProps = {
  isLoggedIn: boolean;
};

export default function HomePage({ isLoggedIn }: HomePageProps) {
  const [state, setState] = useState<PitchFormState>({ status: "idle" });
  const [companyName, setCompanyName] = useState("");
  const [text, setText] = useState("");

  const isLoading = state.status === "loading";
  const canSubmit = companyName.trim() != "" && text.trim() != "" && !isLoading;

  async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault(); // prevent full page reload
    if (!canSubmit) return;

    setState({ status: "loading" });
    try {
      const pitch: Pitch = {
        companyName: companyName.trim(),
        text: text.trim(),
      };
      const result = await judgePitch(pitch);
      setState({ status: "success", result });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Something went wrong.";
      setState({ status: "error", message });
    }
  }

  return (
    <main className="mx-auto max-w-3xl space-y-8 px-4 py-8">
      <section className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Pitch your startup</h1>
        <p className="text-muted-foreground">
          Unicorn or unicorndt? Get <s>humbled</s> judged now.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label htmlFor="companyName" className="text-sm font-medium">
              Company name
            </label>
            <Input
              id="companyName"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              maxLength={MAX_NAME}
              placeholder="UberMyDuck"
              disabled={state.status == "loading"}
            />
            <p className="text-right text-xs text-muted-foreground">
              {companyName.length}/{MAX_NAME}
            </p>
          </div>

          <div className="space-y-1">
            <label htmlFor="pitchText" className="text-sm font-medium">
              Your Pitch
            </label>
            <Textarea
              id="pitchText"
              value={text}
              onChange={(e) => setText(e.target.value)}
              maxLength={MAX_TEXT}
              rows={4}
              placeholder="We're disrupting..."
              disabled={state.status == "loading"}
            />
            <p className="text-right text-xs text-muted-foreground">
              {text.length}/{MAX_TEXT}
            </p>
          </div>

          <Button type="submit" disabled={!canSubmit} className="w-full">
            {isLoading ? "The judges are deliberating... " : "Pitch it"}
          </Button>
        </form>

        {/* show errors */}
        {state.status === "error" && (
          <p
            role="alert"
            className="rounded-md border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive"
          >
            {state.message}
          </p>
        )}
      </section>

      {state.status === "success" && (
        <section className="space-y-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {state.result.judgeResults.map((judge) => (
              <JudgeCard key={judge.judgeName} result={judge}></JudgeCard>
            ))}
          </div>

          <div className="space-y-1 text-center">
            <p className="text-5xl font-bold">
              {state.result.totalScore}
              <span className="text-2xl text-muted-foreground">/30</span>
            </p>
            <p className="text-2xl font-semibold">
              {state.result.verdict === "unicorn"
                ? "🦄 Unicorn"
                : "🐴 Unicorndt"}
            </p>
          </div>

          {isLoggedIn ? (
            state.result.pitchId && (
              <p className="text-center text-sm">
                Saved! Share link: /r/{state.result.pitchId}
              </p>
            )
          ) : (
            <p className="text-center text-sm text-muted-foreground">
              Sign in so we can steal your email.
            </p>
          )}
        </section>
      )}
    </main>
  );
}
