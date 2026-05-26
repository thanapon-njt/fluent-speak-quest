import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getScenario, type Scenario } from "@/data/mock";
import { Button } from "@/components/ui/button";
import { ScoreRing } from "@/components/score-ring";
import { Sparkles, Zap, RotateCcw, ArrowRight, AlertCircle } from "lucide-react";

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

function Result() {
  const s = Route.useLoaderData() as Scenario;
  const scores = { pronunciation: 86, fluency: 78, grammar: 82, vocabulary: 74 };
  const xp = 120;

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 lg:p-10">
      <div className="text-center">
        <div className="text-6xl animate-xp-pop">🎯</div>
        <h1 className="font-display text-3xl font-bold mt-3">Great conversation!</h1>
        <p className="text-muted-foreground mt-1">{s.title} · {s.tutor.name}</p>

        <div className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent text-accent-foreground font-bold shadow-accent-glow animate-xp-pop">
          <Zap className="h-5 w-5" /> +{xp} XP
        </div>
      </div>

      {/* Scores */}
      <div className="mt-8 rounded-3xl bg-card border border-border p-6 shadow-soft">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <ScoreRing score={scores.pronunciation} label="Pronunciation" color="primary" />
          <ScoreRing score={scores.fluency} label="Fluency" color="accent" />
          <ScoreRing score={scores.grammar} label="Grammar" color="success" />
          <ScoreRing score={scores.vocabulary} label="Vocabulary" color="primary" />
        </div>
      </div>

      {/* AI feedback */}
      <section className="mt-6 grid md:grid-cols-2 gap-4">
        <FeedbackCard tone="success" title="What worked great">
          You used <b>"Could I"</b> naturally and ordered confidently. Your intonation on questions was on point.
        </FeedbackCard>
        <FeedbackCard tone="accent" title="Try next time">
          Slow down a bit on "<b>oat-milk</b>" — split into <i>oat</i> + <i>milk</i> for clarity.
        </FeedbackCard>
      </section>

      {/* Mistakes */}
      <section className="mt-4 rounded-2xl bg-card border border-border p-5 shadow-soft">
        <div className="flex items-center gap-2 font-semibold text-sm">
          <AlertCircle className="h-4 w-4 text-destructive" /> Highlights to review
        </div>
        <div className="mt-3 space-y-3 text-sm">
          <div className="rounded-xl bg-destructive/5 border border-destructive/20 p-3">
            <div className="text-xs text-destructive font-semibold mb-1">Pronunciation</div>
            <p>"<span className="line-through opacity-60">vænila</span>" → <b className="text-success">vəˈnɪlə</b> (vanilla)</p>
          </div>
          <div className="rounded-xl bg-destructive/5 border border-destructive/20 p-3">
            <div className="text-xs text-destructive font-semibold mb-1">Grammar</div>
            <p>"<span className="line-through opacity-60">I want latte</span>" → <b className="text-success">I'd like a latte</b></p>
          </div>
        </div>
      </section>

      {/* Actions */}
      <div className="mt-8 flex flex-col sm:flex-row gap-3">
        <Link to="/conversations/$scenarioId" params={{ scenarioId: s.id }} className="flex-1">
          <Button variant="outline" className="w-full h-12">
            <RotateCcw className="h-4 w-4 mr-2" /> Try again
          </Button>
        </Link>
        <Link to="/dashboard" className="flex-1">
          <Button className="w-full h-12 bg-gradient-primary text-primary-foreground shadow-glow">
            Continue learning <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </Link>
      </div>
    </div>
  );
}

function FeedbackCard({ tone, title, children }: { tone: "success" | "accent"; title: string; children: React.ReactNode }) {
  const bg = tone === "success" ? "bg-success/10 border-success/30" : "bg-accent/15 border-accent/40";
  const Icon = Sparkles;
  return (
    <div className={`rounded-2xl border p-5 ${bg}`}>
      <div className="flex items-center gap-2 font-semibold text-sm">
        <Icon className="h-4 w-4" /> {title}
      </div>
      <p className="text-sm mt-2 leading-relaxed">{children}</p>
    </div>
  );
}
