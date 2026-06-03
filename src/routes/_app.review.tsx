import { createFileRoute } from "@tanstack/react-router";
import { reviewItems, type MemoryStrength } from "@/data/mock";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Volume2, Sparkles, Mic, Clock, Flame } from "lucide-react";

export const Route = createFileRoute("/_app/review")({
  head: () => ({
    meta: [
      { title: "Review — Fluent" },
      { name: "description", content: "Spaced repetition review for words, grammar, and speaking." },
    ],
  }),
  component: Review,
});

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

function Review() {
  const total = reviewItems.words.length + reviewItems.grammar.length + reviewItems.speaking.length;
  const minutes = Math.max(3, Math.round(total * 0.6));
  const high = [...reviewItems.words, ...reviewItems.grammar, ...reviewItems.speaking].filter((i) => i.priority >= 2).length;
  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-10 space-y-6">
      <div className="animate-fade-in-up">
        <h1 className="font-display text-3xl font-bold">Smart Review</h1>
        <p className="text-muted-foreground mt-1">Lock in what you learned. Spaced repetition keeps it sticky.</p>
      </div>

      {/* Review Queue summary */}
      <div className="rounded-3xl bg-gradient-hero text-primary-foreground p-5 sm:p-6 shadow-glow relative overflow-hidden animate-fade-in-up">
        <div className="absolute -right-10 -top-10 h-44 w-44 rounded-full bg-accent/40 blur-3xl" />
        <div className="relative flex items-center justify-between flex-wrap gap-3">
          <div>
            <div className="text-[11px] uppercase tracking-wider opacity-80">Review queue</div>
            <div className="font-display text-2xl font-bold mt-0.5">{total} items ready</div>
            <div className="flex items-center gap-3 mt-2 text-xs opacity-90">
              <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" /> ≈ {minutes} min</span>
              <span className="inline-flex items-center gap-1"><Flame className="h-3 w-3" /> {high} high priority</span>
            </div>
          </div>
          <div className="text-5xl">🧠</div>
        </div>
        <div className="mt-4 h-2 bg-white/20 rounded-full overflow-hidden relative">
          <div className="h-full bg-accent rounded-full transition-all duration-700" style={{ width: "30%" }} />
        </div>
        <p className="text-xs mt-2 opacity-90">3 of 10 reviewed today · +20 XP per item</p>
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
              <Button size="sm" variant="outline">Review</Button>
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
              <Button size="sm" variant="outline">Review</Button>
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
              <Button size="sm" className="bg-gradient-primary text-primary-foreground">Retry</Button>
            </div>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
