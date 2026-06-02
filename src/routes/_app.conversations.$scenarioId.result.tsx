import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getScenario, type Scenario, user } from "@/data/mock";
import { Button } from "@/components/ui/button";
import { ScoreRing } from "@/components/score-ring";
import { XPBar } from "@/components/xp-bar";
import {
  Sparkles,
  Zap,
  RotateCcw,
  ArrowRight,
  AlertCircle,
  Check,
  Flame,
  Trophy,
  BookmarkPlus,
  Repeat,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/conversations/$scenarioId/result")({
  head: ({ params }) => ({
    meta: [{ title: `Results — ${params.scenarioId} — Fluent` }],
  }),
  loader: ({ params }) => {
    const s = getScenario(params.scenarioId);
    if (!s) throw notFound();
    return s;
  },
  component: Result,
});

function useCountUp(target: number, duration = 1100) {
  const [n, setN] = useState(0);
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setN(Math.round(target * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return n;
}

function overallSummary(avg: number) {
  if (avg >= 85)
    return {
      title: "Excellent Performance",
      body: "You communicated naturally and completed all mission objectives with confidence.",
      tone: "success" as const,
    };
  if (avg >= 70)
    return {
      title: "Good Progress",
      body: "Your message was clear and understandable. Keep practicing pronunciation and fluency.",
      tone: "primary" as const,
    };
  return {
    title: "Keep Going",
    body: "You finished the mission — every conversation builds confidence. Try again to sharpen your delivery.",
    tone: "accent" as const,
  };
}

function Result() {
  const s = Route.useLoaderData() as Scenario;
  const scores = { pronunciation: 86, fluency: 78, grammar: 82, vocabulary: 74 };
  const avg = Math.round(
    (scores.pronunciation + scores.fluency + scores.grammar + scores.vocabulary) / 4,
  );
  const xp = 120;
  const xpCount = useCountUp(xp, 1200);
  const summary = overallSummary(avg);

  const objectives = [
    "Ordered a drink",
    "Customized the drink",
    "Responded naturally",
    "Completed the scenario",
  ];

  const strengths = [
    "You used polite requests naturally (\"Could I...\").",
    "Your response sounded conversational and warm.",
    "Good use of complete sentences throughout.",
  ];

  const improvements = [
    { tag: "Pronunciation", text: "Slow down on \"oat-milk\" — split into oat + milk." },
    { tag: "Phrasing", text: "Prefer \"I'd like a latte\" over \"I want latte\"." },
  ];

  const reviewItems = [
    { tag: "Pronunciation", wrong: "vænila", right: "vəˈnɪlə (vanilla)" },
    { tag: "Grammar", wrong: "I want latte", right: "I'd like a latte" },
  ];

  const saveToReview = (label: string) =>
    toast.success("Added to review", { description: label });

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 lg:p-10 pb-28 sm:pb-10">
      {/* Success Moment */}
      <div className="text-center relative">
        <div className="relative inline-block">
          <div className="absolute inset-0 rounded-full blur-3xl bg-success/30 animate-pulse" />
          <div className="relative text-6xl animate-scale-in">🎯</div>
        </div>
        <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-success/15 text-success text-xs font-semibold animate-fade-in">
          <CheckCircle2 className="h-3.5 w-3.5" /> Mission Complete
        </div>
        <h1 className="font-display text-3xl font-bold mt-3 animate-fade-in">
          Great Conversation!
        </h1>
        <p className="text-muted-foreground mt-1">
          {s.title} · {s.tutor.name}
        </p>

        <div className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent text-accent-foreground font-bold shadow-accent-glow animate-xp-pop">
          <Zap className="h-5 w-5" />
          <span className="tabular-nums">+{xpCount} XP</span>
        </div>
      </div>

      {/* Overall Performance Summary */}
      <section
        className={`mt-6 rounded-2xl border p-5 shadow-soft animate-fade-in ${
          summary.tone === "success"
            ? "bg-success/10 border-success/30"
            : summary.tone === "primary"
              ? "bg-primary/10 border-primary/30"
              : "bg-accent/15 border-accent/40"
        }`}
      >
        <div className="flex items-start gap-3">
          <div className="h-10 w-10 rounded-full grid place-items-center bg-background/60 shrink-0">
            <Trophy className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h2 className="font-display font-bold text-lg">{summary.title}</h2>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-background/70 tabular-nums">
                {avg} / 100
              </span>
            </div>
            <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{summary.body}</p>
          </div>
        </div>
      </section>

      {/* Mission Completion Status */}
      <section className="mt-4 rounded-2xl bg-card border border-border p-5 shadow-soft">
        <div className="text-sm font-semibold mb-3 flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-success" /> Mission objectives
        </div>
        <ul className="grid sm:grid-cols-2 gap-2">
          {objectives.map((o, i) => (
            <li
              key={o}
              className="flex items-center gap-2 rounded-xl bg-success/5 border border-success/20 px-3 py-2 text-sm animate-fade-in"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <span className="h-5 w-5 grid place-items-center rounded-full bg-success text-success-foreground">
                <Check className="h-3 w-3" />
              </span>
              <span>{o}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Scores */}
      <div className="mt-6 rounded-3xl bg-card border border-border p-6 shadow-soft">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <ScoreRing score={scores.pronunciation} label="Pronunciation" color="primary" />
          <ScoreRing score={scores.fluency} label="Fluency" color="accent" />
          <ScoreRing score={scores.grammar} label="Grammar" color="success" />
          <ScoreRing score={scores.vocabulary} label="Vocabulary" color="primary" />
        </div>

        {/* Score explanations */}
        <div className="mt-5 grid sm:grid-cols-2 gap-2.5 text-sm">
          <ScoreNote label="Pronunciation" value={scores.pronunciation}
            note="Your words were understandable and mostly clear." />
          <ScoreNote label="Fluency" value={scores.fluency}
            note="Good pacing with a few natural pauses." />
          <ScoreNote label="Grammar" value={scores.grammar}
            note="Sentences were well-formed with small slips." />
          <ScoreNote label="Vocabulary" value={scores.vocabulary}
            note="Solid range — try a few more varied phrases." />
        </div>
      </div>

      {/* What worked great */}
      <section className="mt-6 rounded-2xl bg-success/10 border border-success/30 p-5">
        <div className="flex items-center gap-2 font-semibold text-sm">
          <Sparkles className="h-4 w-4 text-success" /> What worked great
        </div>
        <ul className="mt-3 space-y-2 text-sm">
          {strengths.map((t) => (
            <li key={t} className="flex gap-2">
              <Check className="h-4 w-4 text-success mt-0.5 shrink-0" />
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Try next time */}
      <section className="mt-4 rounded-2xl bg-accent/15 border border-accent/40 p-5">
        <div className="flex items-center gap-2 font-semibold text-sm">
          <Sparkles className="h-4 w-4" /> Try next time
        </div>
        <ul className="mt-3 space-y-2 text-sm">
          {improvements.map((i) => (
            <li key={i.text} className="flex gap-2">
              <span className="text-xs font-semibold px-1.5 py-0.5 rounded bg-background/60 shrink-0 mt-0.5">
                {i.tag}
              </span>
              <span>{i.text}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Review highlights */}
      <section className="mt-4 rounded-2xl bg-card border border-border p-5 shadow-soft">
        <div className="flex items-center gap-2 font-semibold text-sm">
          <AlertCircle className="h-4 w-4 text-destructive" /> Review highlights
        </div>
        <div className="mt-3 space-y-3 text-sm">
          {reviewItems.map((r) => (
            <div
              key={r.wrong}
              className="rounded-xl bg-destructive/5 border border-destructive/20 p-3"
            >
              <div className="text-xs text-destructive font-semibold mb-1">{r.tag}</div>
              <p>
                "<span className="line-through opacity-60">{r.wrong}</span>" →{" "}
                <b className="text-success">{r.right}</b>
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                <button
                  onClick={() => saveToReview(r.right)}
                  className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                >
                  <BookmarkPlus className="h-3.5 w-3.5" /> Add to review
                </button>
                <button
                  onClick={() => saveToReview(`Saved: ${r.right}`)}
                  className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-muted hover:bg-muted/70 transition-colors"
                >
                  <BookmarkPlus className="h-3.5 w-3.5" /> Save for later
                </button>
                <button
                  onClick={() => toast("Practice queued", { description: r.right })}
                  className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-muted hover:bg-muted/70 transition-colors"
                >
                  <Repeat className="h-3.5 w-3.5" /> Practice again
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Progression feedback */}
      <section className="mt-6 rounded-2xl bg-gradient-primary text-primary-foreground p-5 shadow-glow">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-xs opacity-80 uppercase tracking-wide">Level {user.level}</div>
            <div className="font-display font-bold text-lg">Your journey continues</div>
          </div>
          <div className="flex items-center gap-1 text-sm font-semibold bg-background/15 px-2.5 py-1 rounded-full">
            <Flame className="h-4 w-4 text-flame" /> {user.streak} day streak
          </div>
        </div>
        <div className="mt-3">
          <XPBar value={user.xp + xp} max={user.xpToNext} className="[&>div]:bg-background/20" />
          <div className="mt-2 flex justify-between text-xs opacity-90 tabular-nums">
            <span>+{xp} XP earned</span>
            <span>
              {user.xp + xp} / {user.xpToNext} XP
            </span>
          </div>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
          <Stat label="Missions today" value="3" />
          <Stat label="XP today" value={`+${xp}`} />
          <Stat label="Streak" value={`${user.streak}d`} />
        </div>
      </section>

      {/* Next actions */}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link to="/dashboard" className="flex-1 order-1 sm:order-2">
          <Button className="w-full h-12 bg-gradient-primary text-primary-foreground shadow-glow hover:shadow-glow-lg transition-shadow">
            Continue Learning <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </Link>
        <Link
          to="/conversations/$scenarioId"
          params={{ scenarioId: s.id }}
          className="flex-1 order-2 sm:order-1"
        >
          <Button variant="outline" className="w-full h-12">
            <RotateCcw className="h-4 w-4 mr-2" /> Practice Again
          </Button>
        </Link>
      </div>
      <div className="mt-3 text-center">
        <Link to="/review" className="text-sm text-muted-foreground hover:text-foreground story-link">
          Review mistakes →
        </Link>
      </div>
    </div>
  );
}

function ScoreNote({ label, value, note }: { label: string; value: number; note: string }) {
  return (
    <div className="rounded-xl bg-muted/40 border border-border/60 px-3 py-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
          {label}
        </span>
        <span className="text-xs font-bold tabular-nums">{value}</span>
      </div>
      <p className="text-xs text-muted-foreground mt-0.5 leading-snug">{note}</p>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-background/15 px-2 py-2">
      <div className="font-display font-bold text-base tabular-nums">{value}</div>
      <div className="text-[10px] opacity-80 uppercase tracking-wide">{label}</div>
    </div>
  );
}
