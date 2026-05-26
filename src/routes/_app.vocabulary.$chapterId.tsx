import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { getChapter } from "@/data/mock";
import { Button } from "@/components/ui/button";
import { Volume2, ChevronLeft, ChevronRight, X, Check } from "lucide-react";

export const Route = createFileRoute("/_app/vocabulary/$chapterId")({
  head: ({ params }) => ({
    meta: [{ title: `Vocabulary — ${params.chapterId} — Fluent` }],
  }),
  loader: ({ params }) => {
    const c = getChapter(params.chapterId);
    if (!c) throw notFound();
    return c;
  },
  component: VocabularyPage,
});

function VocabularyPage() {
  const c = Route.useLoaderData();
  const words = c.vocabulary.length > 0 ? c.vocabulary : [
    { word: "example", ipa: "/ɪɡˈzæmpəl/", meaning: "a sample", example: "Here is an example." },
  ];
  const [i, setI] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const w = words[i];
  const last = i === words.length - 1;

  const next = () => { setFlipped(false); setI((x) => Math.min(words.length - 1, x + 1)); };
  const prev = () => { setFlipped(false); setI((x) => Math.max(0, x - 1)); };

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-10">
      <div className="flex items-center justify-between mb-6">
        <Link to="/chapters/$chapterId" params={{ chapterId: c.id }} className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1">
          <X className="h-4 w-4" /> Close
        </Link>
        <span className="text-sm font-medium">{i + 1} / {words.length}</span>
      </div>

      {/* Progress dots */}
      <div className="flex gap-1 mb-8">
        {words.map((_, idx) => (
          <div key={idx} className={`h-1 flex-1 rounded-full ${idx <= i ? "bg-primary" : "bg-muted"}`} />
        ))}
      </div>

      {/* Flashcard */}
      <button
        onClick={() => setFlipped((f) => !f)}
        className="block w-full rounded-3xl bg-card border-2 border-border p-8 sm:p-12 shadow-card text-center min-h-[320px] active:scale-[0.99] transition"
      >
        {!flipped ? (
          <div className="space-y-4">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Word</div>
            <div className="font-display text-4xl sm:text-5xl font-bold text-primary">{w.word}</div>
            <div className="text-muted-foreground">{w.ipa}</div>
            <button
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm"
            >
              <Volume2 className="h-4 w-4" /> Play audio
            </button>
            <div className="text-xs text-muted-foreground mt-6">Tap card to reveal meaning</div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Meaning</div>
            <div className="font-display text-2xl font-bold">{w.meaning}</div>
            <div className="rounded-xl bg-muted/50 p-4 text-left mt-4">
              <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Example</div>
              <div className="italic">"{w.example}"</div>
            </div>
          </div>
        )}
      </button>

      {/* Controls */}
      <div className="mt-6 flex items-center justify-between gap-3">
        <Button variant="outline" onClick={prev} disabled={i === 0} className="flex-1 h-12">
          <ChevronLeft className="h-4 w-4 mr-1" /> Previous
        </Button>
        {last ? (
          <Link to="/quiz/$chapterId" params={{ chapterId: c.id }} className="flex-1">
            <Button className="w-full h-12 bg-gradient-primary text-primary-foreground shadow-glow">
              Quick quiz <Check className="h-4 w-4 ml-1" />
            </Button>
          </Link>
        ) : (
          <Button onClick={next} className="flex-1 h-12 bg-gradient-primary text-primary-foreground shadow-glow">
            Next <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        )}
      </div>
    </div>
  );
}
