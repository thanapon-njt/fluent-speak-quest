import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { getChapter, type Chapter } from "@/data/mock";
import { Button } from "@/components/ui/button";
import { Check, X, Zap, Sparkles } from "lucide-react";

export const Route = createFileRoute("/_app/quiz/$chapterId")({
  head: ({ params }) => ({
    meta: [{ title: `Quiz — ${params.chapterId} — Fluent` }],
  }),
  loader: ({ params }) => {
    const c = getChapter(params.chapterId);
    if (!c) throw notFound();
    return c;
  },
  component: QuizPage,
});

type Q =
  | { type: "mc"; q: string; options: string[]; answer: number }
  | { type: "fill"; before: string; after: string; options: string[]; answer: number }
  | { type: "reorder"; tokens: string[]; correct: string };

const questions: Q[] = [
  { type: "mc", q: "Which is the most polite way to order?", options: ["Give me coffee.", "Coffee, now.", "Could I have a coffee, please?"], answer: 2 },
  { type: "fill", before: "I'd like a latte", after: "go, please.", options: ["to", "in", "on"], answer: 0 },
  { type: "reorder", tokens: ["have", "Could", "menu", "the", "I", "please"], correct: "Could I have the menu please" },
  { type: "mc", q: "Pick the correct response: 'How would you like that?'", options: ["Yes.", "To-go, please.", "Tomorrow."], answer: 1 },
];

function QuizPage() {
  const c = Route.useLoaderData() as Chapter;
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const q = questions[i];

  const submit = (idx: number) => {
    if (picked !== null) return;
    setPicked(idx);
    const correct =
      q.type === "mc" ? idx === q.answer :
      q.type === "fill" ? idx === q.answer : true;
    if (correct) setScore((s) => s + 1);
  };

  const next = () => {
    if (i === questions.length - 1) { setDone(true); return; }
    setI((x) => x + 1);
    setPicked(null);
  };

  const pct = ((i + (picked !== null ? 1 : 0)) / questions.length) * 100;
  const correct =
    picked === null ? null :
    q.type === "mc" ? picked === q.answer :
    q.type === "fill" ? picked === q.answer : true;

  if (done) {
    const xp = score * 25;
    return (
      <div className="max-w-md mx-auto p-6 sm:p-10 text-center min-h-[80vh] flex flex-col justify-center">
        <div className="text-7xl animate-xp-pop">🎉</div>
        <h1 className="font-display text-3xl font-bold mt-4">Quiz complete!</h1>
        <p className="text-muted-foreground mt-2">You got {score} of {questions.length} correct</p>
        <div className="mt-6 inline-flex self-center items-center gap-2 px-5 py-3 rounded-full bg-accent text-accent-foreground font-bold shadow-accent-glow animate-xp-pop">
          <Zap className="h-5 w-5" /> +{xp} XP earned
        </div>
        <div className="mt-8 flex flex-col gap-2">
          <Link to="/chapters/$chapterId" params={{ chapterId: c.id }}>
            <Button className="w-full h-12 bg-gradient-primary text-primary-foreground shadow-glow">Back to chapter</Button>
          </Link>
          <Link to="/conversations" className="text-sm text-primary font-semibold inline-flex items-center justify-center gap-1">
            <Sparkles className="h-4 w-4" /> Try the AI challenge
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-4 sm:p-6 lg:p-10">
      {/* Progress */}
      <div className="flex items-center gap-3 mb-8">
        <Link to="/chapters/$chapterId" params={{ chapterId: c.id }}>
          <X className="h-5 w-5 text-muted-foreground" />
        </Link>
        <div className="flex-1 h-2.5 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-gradient-primary transition-all duration-500" style={{ width: `${pct}%` }} />
        </div>
        <span className="text-xs font-medium tabular-nums">{i + 1}/{questions.length}</span>
      </div>

      {/* Question */}
      <div className="rounded-2xl bg-card border border-border p-5 sm:p-6 shadow-soft">
        <div className="text-xs uppercase tracking-wider text-muted-foreground">
          {q.type === "mc" ? "Multiple choice" : q.type === "fill" ? "Fill the blank" : "Reorder"}
        </div>

        {q.type === "mc" && (
          <>
            <h2 className="font-display text-xl font-bold mt-2">{q.q}</h2>
            <div className="mt-5 grid gap-2">
              {q.options.map((opt, idx) => {
                const state =
                  picked === null ? "idle" :
                  idx === q.answer ? "correct" :
                  idx === picked ? "wrong" : "idle";
                return (
                  <button
                    key={idx}
                    onClick={() => submit(idx)}
                    disabled={picked !== null}
                    className={`text-left rounded-xl border-2 px-4 py-3 transition-all ${
                      state === "correct" ? "border-success bg-success/10" :
                      state === "wrong" ? "border-destructive bg-destructive/10" :
                      picked === null ? "border-border hover:border-primary/40" : "border-border opacity-60"
                    }`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </>
        )}

        {q.type === "fill" && (
          <>
            <h2 className="font-display text-xl font-bold mt-2">Complete the sentence</h2>
            <p className="text-lg mt-4">
              {q.before} <span className="inline-block min-w-[64px] px-3 py-1 mx-1 rounded-md border-b-2 border-primary bg-primary/5 font-semibold text-primary">{picked !== null ? q.options[picked] : "____"}</span> {q.after}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {q.options.map((opt, idx) => {
                const state =
                  picked === null ? "idle" :
                  idx === q.answer ? "correct" :
                  idx === picked ? "wrong" : "idle";
                return (
                  <button
                    key={idx}
                    onClick={() => submit(idx)}
                    disabled={picked !== null}
                    className={`px-4 py-2 rounded-xl border-2 font-medium transition ${
                      state === "correct" ? "border-success bg-success/10" :
                      state === "wrong" ? "border-destructive bg-destructive/10" :
                      "border-border hover:border-primary/40"
                    }`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </>
        )}

        {q.type === "reorder" && (
          <ReorderQuestion q={q} onSubmit={() => submit(0)} picked={picked !== null} />
        )}
      </div>

      {/* Feedback */}
      {picked !== null && (
        <div className={`mt-4 rounded-2xl p-4 flex items-center justify-between gap-3 animate-xp-pop ${correct ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"}`}>
          <div className="flex items-center gap-2 font-semibold">
            {correct ? <Check className="h-5 w-5" /> : <X className="h-5 w-5" />}
            {correct ? "Nice work!" : "Not quite — keep going."}
          </div>
          <Button onClick={next} className="bg-foreground text-background hover:opacity-90">
            {i === questions.length - 1 ? "See results" : "Continue"}
          </Button>
        </div>
      )}
    </div>
  );
}

function ReorderQuestion({ q, onSubmit, picked }: { q: Extract<Q, { type: "reorder" }>; onSubmit: () => void; picked: boolean }) {
  const [chosen, setChosen] = useState<string[]>([]);
  const [pool, setPool] = useState<string[]>(q.tokens);

  const pick = (t: string) => {
    setChosen((c) => [...c, t]);
    setPool((p) => p.filter((x) => x !== t));
  };
  const remove = (t: string, idx: number) => {
    setChosen((c) => c.filter((_, i) => i !== idx));
    setPool((p) => [...p, t]);
  };

  return (
    <>
      <h2 className="font-display text-xl font-bold mt-2">Put the words in order</h2>
      <div className="mt-5 min-h-[56px] rounded-xl border-2 border-dashed border-border p-3 flex flex-wrap gap-2">
        {chosen.length === 0 ? (
          <span className="text-sm text-muted-foreground self-center">Tap words below to build the sentence</span>
        ) : chosen.map((t, idx) => (
          <button key={idx} onClick={() => remove(t, idx)} className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary font-medium text-sm">
            {t}
          </button>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {pool.map((t) => (
          <button key={t} onClick={() => pick(t)} className="px-3 py-1.5 rounded-lg bg-muted hover:bg-muted/70 font-medium text-sm">
            {t}
          </button>
        ))}
      </div>
      <Button
        onClick={onSubmit}
        disabled={pool.length > 0 || picked}
        className="w-full mt-5 bg-gradient-primary text-primary-foreground disabled:opacity-50"
      >
        Check answer
      </Button>
    </>
  );
}
