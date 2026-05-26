import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { reviewItems } from "@/data/mock";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Volume2, Sparkles, Mic } from "lucide-react";

export const Route = createFileRoute("/_app/review")({
  head: () => ({
    meta: [
      { title: "Review — Fluent" },
      { name: "description", content: "Spaced repetition review for words, grammar, and speaking." },
    ],
  }),
  component: Review,
});

function Review() {
  const total = reviewItems.words.length + reviewItems.grammar.length + reviewItems.speaking.length;
  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-10 space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold">Smart Review</h1>
        <p className="text-muted-foreground mt-1">Spaced repetition keeps it sticky.</p>
      </div>

      {/* Daily progress */}
      <div className="rounded-2xl bg-gradient-hero text-primary-foreground p-5 sm:p-6 shadow-glow">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs uppercase tracking-wider opacity-80">Today</div>
            <div className="font-display text-2xl font-bold mt-0.5">{total} items ready</div>
          </div>
          <div className="text-4xl">🧠</div>
        </div>
        <div className="mt-4 h-2 bg-white/20 rounded-full overflow-hidden">
          <div className="h-full bg-accent" style={{ width: "30%" }} />
        </div>
        <p className="text-xs mt-2 opacity-90">3 of 10 reviewed today</p>
      </div>

      {/* Recommendations */}
      <div className="rounded-2xl bg-card border border-border p-5 shadow-soft">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <Sparkles className="h-4 w-4 text-primary" /> Smart picks
        </div>
        <p className="text-sm text-muted-foreground mt-1">Based on your latest mistakes, try these first:</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {["deadline", "follow up", "Present perfect", "Daily Stand-up"].map((p) => (
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
                <div className="font-semibold">{w.word}</div>
                <div className="text-xs text-muted-foreground">{w.meaning} · last seen {w.lastSeen}</div>
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
                <div className="font-semibold">{g.topic}</div>
                <div className="text-xs text-muted-foreground">{g.desc} · last seen {g.lastSeen}</div>
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
                <div className="font-semibold">{sp.scenario}</div>
                <div className="text-xs text-muted-foreground">Score {sp.score}/100 · {sp.lastSeen}</div>
              </div>
              <Button size="sm" className="bg-gradient-primary text-primary-foreground">Retry</Button>
            </div>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
