import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { reviewItems, type MemoryStrength } from "@/data/mock";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  Volume2,
  Sparkles,
  Mic,
  Clock,
  Flame,
  Check,
  RotateCcw,
  ArrowRight,
  Zap,
  Trophy,
  X,
} from "lucide-react";

export const Route = createFileRoute("/_app/review")({
  head: () => ({
    meta: [
      { title: "Review — Fluent" },
      { name: "description", content: "Spaced repetition review for words, grammar, and speaking." },
    ],
  }),
  component: Review,
});

// ===== Types & helpers =====
type Kind = "word" | "grammar" | "speaking";
type Rating = "again" | "hard" | "good" | "easy";

type ReviewCard = {
  id: string;
  kind: Kind;
  front: string;
  back: string;
  hint?: string;
  example?: string;
  strength: MemoryStrength;
};

const RATING_XP: Record<Rating, number> = { again: 5, hard: 10, good: 20, easy: 25 };

function strengthStyles(s: MemoryStrength) {
  if (s === "Strong") return "bg-success/15 text-success border-success/30";
  if (s === "Needs Practice") return "bg-accent/20 text-accent-foreground border-accent/40";
  return "bg-destructive/15 text-destructive border-destructive/30";
}

function StrengthBadge({ s }: { s: MemoryStrength }) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 ${strengthStyles(s)}`}>
      {s === "Almost Forgotten" && <Flame className="h-2.5 w-2.5" />}
      {s}
    </span>
  );
}

function toCards(filter?: Kind): ReviewCard[] {
  const all: ReviewCard[] = [
    ...reviewItems.words.map((w) => ({
      id: `w-${w.word}`,
      kind: "word" as const,
      front: w.word,
      back: w.meaning,
      example: `I've got a tight ${w.word === "deadline" ? "deadline" : w.word} this week.`,
      strength: w.strength,
    })),
    ...reviewItems.grammar.map((g) => ({
      id: `g-${g.topic}`,
      kind: "grammar" as const,
      front: g.topic,
      back: g.desc,
      example: "She has finished her report already.",
      strength: g.strength,
    })),
    ...reviewItems.speaking.map((sp) => ({
      id: `s-${sp.scenario}`,
      kind: "speaking" as const,
      front: sp.scenario,
      back: `Last score: ${sp.score}/100`,
      hint: "Retry the scenario and beat your score.",
      strength: sp.strength,
    })),
  ];
  return filter ? all.filter((c) => c.kind === filter) : all;
}

// ===== Page =====
function Review() {
  const total = reviewItems.words.length + reviewItems.grammar.length + reviewItems.speaking.length;
  const minutes = Math.max(3, Math.round(total * 0.6));
  const high = [...reviewItems.words, ...reviewItems.grammar, ...reviewItems.speaking].filter((i) => i.priority >= 2).length;

  const [session, setSession] = useState<ReviewCard[] | null>(null);

  const startAll = () => setSession(toCards());
  const startOne = (kind: Kind, front: string) => {
    const card = toCards(kind).find((c) => c.front === front);
    if (card) setSession([card]);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-10 space-y-6">
      <div className="animate-fade-in-up">
        <h1 className="font-display text-3xl font-bold">Smart Review</h1>
        <p className="text-muted-foreground mt-1">Lock in what you learned. Spaced repetition keeps it sticky.</p>
      </div>

      {/* Review Queue summary */}
      <div className="rounded-3xl bg-gradient-hero text-primary-foreground p-5 sm:p-6 shadow-glow relative overflow-hidden animate-fade-in-up">
        <div className="absolute -right-10 -top-10 h-44 w-44 rounded-full bg-accent/40 blur-3xl" />
        <div className="relative flex items-center justify-between gap-3">
          <div className="min-w-0">
            <div className="text-[11px] uppercase tracking-wider opacity-80">Review queue</div>
            <div className="font-display text-2xl font-bold mt-0.5">{total} items ready</div>
            <div className="flex items-center gap-3 mt-2 text-xs opacity-90 flex-wrap">
              <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" /> ≈ {minutes} min</span>
              <span className="inline-flex items-center gap-1"><Flame className="h-3 w-3" /> {high} high priority</span>
            </div>
          </div>
          <div className="text-5xl shrink-0">🧠</div>
        </div>
        <div className="mt-4 h-2 bg-white/20 rounded-full overflow-hidden relative">
          <div className="h-full bg-accent rounded-full transition-all duration-700" style={{ width: "30%" }} />
        </div>
        <p className="text-xs mt-2 opacity-90">3 of 10 reviewed today · +20 XP per item</p>

        <Button
          onClick={startAll}
          className="mt-4 w-full sm:w-auto bg-white text-secondary hover:bg-white/90 font-bold shadow-lg"
        >
          <Sparkles className="h-4 w-4" /> Start Smart Review
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Recommendations */}
      <div className="rounded-2xl bg-card border border-border p-5 shadow-soft">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <Sparkles className="h-4 w-4 text-primary" /> Smart picks
        </div>
        <p className="text-sm text-muted-foreground mt-1">Based on your latest mistakes, try these first:</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {["follow up", "Conditional sentences", "Daily Stand-up"].map((p) => (
            <span key={p} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">{p}</span>
          ))}
        </div>
      </div>

      <Tabs defaultValue="words">
        <TabsList className="grid w-full grid-cols-3 max-w-md">
          <TabsTrigger value="words">Words ({reviewItems.words.length})</TabsTrigger>
          <TabsTrigger value="grammar">Grammar ({reviewItems.grammar.length})</TabsTrigger>
          <TabsTrigger value="speaking">Speaking ({reviewItems.speaking.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="words" className="space-y-2 mt-4">
          {reviewItems.words.map((w) => (
            <div key={w.word} className="flex items-center gap-3 rounded-2xl bg-card border border-border p-4 shadow-soft">
              <button className="h-10 w-10 rounded-full bg-primary/10 text-primary grid place-items-center shrink-0">
                <Volume2 className="h-4 w-4" />
              </button>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="font-semibold">{w.word}</div>
                  <StrengthBadge s={w.strength} />
                </div>
                <div className="text-xs text-muted-foreground mt-0.5">{w.meaning} · last seen {w.lastSeen}</div>
              </div>
              <Button size="sm" variant="outline" onClick={() => startOne("word", w.word)}>Review</Button>
            </div>
          ))}
        </TabsContent>

        <TabsContent value="grammar" className="space-y-2 mt-4">
          {reviewItems.grammar.map((g) => (
            <div key={g.topic} className="flex items-center gap-3 rounded-2xl bg-card border border-border p-4 shadow-soft">
              <div className="h-10 w-10 rounded-full bg-accent/30 grid place-items-center shrink-0 text-lg">📐</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="font-semibold">{g.topic}</div>
                  <StrengthBadge s={g.strength} />
                </div>
                <div className="text-xs text-muted-foreground mt-0.5">{g.desc} · last seen {g.lastSeen}</div>
              </div>
              <Button size="sm" variant="outline" onClick={() => startOne("grammar", g.topic)}>Review</Button>
            </div>
          ))}
        </TabsContent>

        <TabsContent value="speaking" className="space-y-2 mt-4">
          {reviewItems.speaking.map((sp) => (
            <div key={sp.scenario} className="flex items-center gap-3 rounded-2xl bg-card border border-border p-4 shadow-soft">
              <div className="h-10 w-10 rounded-full bg-gradient-primary text-primary-foreground grid place-items-center shrink-0">
                <Mic className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="font-semibold">{sp.scenario}</div>
                  <StrengthBadge s={sp.strength} />
                </div>
                <div className="text-xs text-muted-foreground mt-0.5">Score {sp.score}/100 · {sp.lastSeen}</div>
              </div>
              <Button size="sm" className="bg-gradient-primary text-primary-foreground" onClick={() => startOne("speaking", sp.scenario)}>Retry</Button>
            </div>
          ))}
        </TabsContent>
      </Tabs>

      {session && (
        <ReviewSession cards={session} onClose={() => setSession(null)} />
      )}
    </div>
  );
}

// ===== Session Dialog =====
function ReviewSession({ cards, onClose }: { cards: ReviewCard[]; onClose: () => void }) {
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [results, setResults] = useState<Record<Rating, number>>({ again: 0, hard: 0, good: 0, easy: 0 });
  const [done, setDone] = useState(false);

  const card = cards[index];
  const xp = useMemo(
    () => (Object.keys(results) as Rating[]).reduce((sum, r) => sum + results[r] * RATING_XP[r], 0),
    [results],
  );
  const correct = results.good + results.easy;
  const accuracy = cards.length ? Math.round((correct / Math.max(1, index + (done ? 0 : 0))) * 100) : 0;
  const progressPct = ((done ? cards.length : index) / cards.length) * 100;

  const rate = (r: Rating) => {
    setResults((prev) => ({ ...prev, [r]: prev[r] + 1 }));
    if (index + 1 >= cards.length) {
      setDone(true);
    } else {
      setIndex((i) => i + 1);
      setRevealed(false);
    }
  };

  const restart = () => {
    setIndex(0);
    setRevealed(false);
    setResults({ again: 0, hard: 0, good: 0, easy: 0 });
    setDone(false);
  };

  return (
    <Dialog open onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-md p-0 overflow-hidden border-border [&>button]:hidden">
        <DialogTitle className="sr-only">Smart Review session</DialogTitle>

        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5">
          <div className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
            {done ? "Session complete" : `Card ${index + 1} of ${cards.length}`}
          </div>
          <button
            onClick={onClose}
            className="h-8 w-8 grid place-items-center rounded-full hover:bg-muted text-muted-foreground"
            aria-label="Close review"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Progress */}
        <div className="px-5 mt-2">
          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-primary rounded-full transition-all duration-500"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        {done ? (
          <SessionSummary
            xp={xp}
            total={cards.length}
            correct={correct}
            results={results}
            onRestart={restart}
            onClose={onClose}
          />
        ) : (
          <div className="px-5 pb-5 pt-6 space-y-5">
            {/* Card */}
            <div className="rounded-3xl bg-gradient-immersive text-white p-6 min-h-[220px] flex flex-col justify-between shadow-glow relative overflow-hidden">
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary/30 blur-3xl" />
              <div className="relative">
                <div className="flex items-center gap-2">
                  <KindBadge kind={card.kind} />
                  <StrengthBadge s={card.strength} />
                </div>
                <div className="font-display text-3xl font-extrabold mt-4 leading-tight break-words">
                  {card.front}
                </div>
                {card.kind === "word" && (
                  <button className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur px-3 py-1 text-xs font-semibold hover:bg-white/25">
                    <Volume2 className="h-3.5 w-3.5" /> Listen
                  </button>
                )}
              </div>

              {revealed && (
                <div className="relative mt-5 pt-4 border-t border-white/15 animate-fade-in-up">
                  <div className="text-[11px] uppercase tracking-wider opacity-80">Answer</div>
                  <div className="text-base font-semibold mt-1">{card.back}</div>
                  {card.example && (
                    <div className="text-xs opacity-80 mt-2 italic">"{card.example}"</div>
                  )}
                  {card.hint && (
                    <div className="text-xs opacity-80 mt-2">{card.hint}</div>
                  )}
                </div>
              )}
            </div>

            {/* Actions */}
            {!revealed ? (
              <Button
                onClick={() => setRevealed(true)}
                className="w-full bg-gradient-primary text-primary-foreground font-bold h-12 shadow-glow"
              >
                Show answer
              </Button>
            ) : (
              <div className="space-y-2">
                <div className="text-center text-xs text-muted-foreground">How well did you remember it?</div>
                <div className="grid grid-cols-2 gap-2">
                  <RatingButton label="Again" sub="+5 XP" tone="destructive" onClick={() => rate("again")} />
                  <RatingButton label="Hard" sub="+10 XP" tone="flame" onClick={() => rate("hard")} />
                  <RatingButton label="Good" sub="+20 XP" tone="primary" onClick={() => rate("good")} />
                  <RatingButton label="Easy" sub="+25 XP" tone="success" onClick={() => rate("easy")} />
                </div>
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

function KindBadge({ kind }: { kind: Kind }) {
  const map: Record<Kind, { label: string; icon: string }> = {
    word: { label: "Word", icon: "🔤" },
    grammar: { label: "Grammar", icon: "📐" },
    speaking: { label: "Speaking", icon: "🎤" },
  };
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-white/15 backdrop-blur px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">
      <span>{map[kind].icon}</span> {map[kind].label}
    </span>
  );
}

function RatingButton({
  label,
  sub,
  tone,
  onClick,
}: {
  label: string;
  sub: string;
  tone: "destructive" | "flame" | "primary" | "success";
  onClick: () => void;
}) {
  const tones: Record<string, string> = {
    destructive: "border-destructive/40 bg-destructive/10 text-destructive hover:bg-destructive/20",
    flame: "border-flame/40 bg-flame/10 text-flame hover:bg-flame/20",
    primary: "border-primary/40 bg-primary/10 text-primary hover:bg-primary/20",
    success: "border-success/40 bg-success/10 text-success hover:bg-success/20",
  };
  return (
    <button
      onClick={onClick}
      className={`rounded-2xl border px-3 py-3 text-sm font-bold transition active:scale-[0.98] ${tones[tone]}`}
    >
      <div>{label}</div>
      <div className="text-[10px] font-semibold opacity-80 mt-0.5">{sub}</div>
    </button>
  );
}

function SessionSummary({
  xp,
  total,
  correct,
  results,
  onRestart,
  onClose,
}: {
  xp: number;
  total: number;
  correct: number;
  results: Record<Rating, number>;
  onRestart: () => void;
  onClose: () => void;
}) {
  const accuracy = Math.round((correct / Math.max(1, total)) * 100);
  return (
    <div className="px-5 pb-5 pt-6 space-y-5 text-center">
      <div className="mx-auto h-20 w-20 rounded-full bg-gradient-primary grid place-items-center shadow-glow animate-fade-in-up">
        <Trophy className="h-9 w-9 text-primary-foreground" />
      </div>
      <div>
        <h2 className="font-display text-2xl font-extrabold">Nice work!</h2>
        <p className="text-sm text-muted-foreground mt-1">You locked {correct} of {total} items into memory.</p>
      </div>

      <div className="rounded-2xl bg-gradient-immersive text-white p-4 flex items-center justify-center gap-2 shadow-glow">
        <Zap className="h-5 w-5 text-accent" />
        <span className="font-display text-2xl font-extrabold">+{xp} XP</span>
        <span className="text-xs opacity-80 ml-1">earned</span>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <StatPill label="Accuracy" value={`${accuracy}%`} tone="primary" />
        <StatPill label="Reviewed" value={`${total}`} tone="accent" />
      </div>

      <div className="rounded-2xl border border-border bg-muted/30 p-3 text-left text-xs space-y-1.5">
        <SummaryRow label="Easy" count={results.easy} dotClass="bg-success" />
        <SummaryRow label="Good" count={results.good} dotClass="bg-primary" />
        <SummaryRow label="Hard" count={results.hard} dotClass="bg-flame" />
        <SummaryRow label="Again" count={results.again} dotClass="bg-destructive" />
      </div>

      <div className="grid grid-cols-2 gap-2 pt-1">
        <Button variant="outline" onClick={onRestart} className="font-semibold">
          <RotateCcw className="h-4 w-4" /> Review again
        </Button>
        <Button onClick={onClose} className="bg-gradient-primary text-primary-foreground font-bold">
          <Check className="h-4 w-4" /> Done
        </Button>
      </div>
    </div>
  );
}

function StatPill({ label, value, tone }: { label: string; value: string; tone: "primary" | "accent" }) {
  const toneClass = tone === "primary"
    ? "bg-primary/10 text-primary border-primary/30"
    : "bg-accent/20 text-accent-foreground border-accent/40";
  return (
    <div className={`rounded-2xl border px-3 py-2.5 ${toneClass}`}>
      <div className="font-display text-xl font-extrabold">{value}</div>
      <div className="text-[10px] uppercase tracking-wider opacity-80">{label}</div>
    </div>
  );
}

function SummaryRow({ label, count, dotClass }: { label: string; count: number; dotClass: string }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className={`h-2 w-2 rounded-full ${dotClass}`} />
        <span className="font-semibold">{label}</span>
      </div>
      <span className="tabular-nums text-muted-foreground">{count}</span>
    </div>
  );
}
