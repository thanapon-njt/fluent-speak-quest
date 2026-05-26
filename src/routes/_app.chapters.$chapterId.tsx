import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getChapter } from "@/data/mock";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, Mic, Sparkles, Clock, Trophy, Star } from "lucide-react";

export const Route = createFileRoute("/_app/chapters/$chapterId")({
  head: ({ params }) => ({
    meta: [
      { title: `${params.chapterId} — Chapter — Fluent` },
      { name: "description", content: "Chapter overview, vocabulary, grammar, and rewards." },
    ],
  }),
  loader: ({ params }) => {
    const c = getChapter(params.chapterId);
    if (!c) throw notFound();
    return c;
  },
  notFoundComponent: () => (
    <div className="p-10 text-center">
      <p className="text-muted-foreground">Chapter not found.</p>
      <Link to="/map" className="text-primary underline">Back to map</Link>
    </div>
  ),
  component: ChapterDetail,
});

function ChapterDetail() {
  const c = Route.useLoaderData();
  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-10">
      <Link to="/map" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4">
        <ArrowLeft className="h-4 w-4" /> Back to map
      </Link>

      {/* Hero */}
      <div className="rounded-3xl bg-gradient-hero p-6 sm:p-8 text-primary-foreground shadow-glow relative overflow-hidden">
        <div className="absolute -right-6 -top-6 text-[8rem] opacity-20 select-none">{c.emoji}</div>
        <div className="relative">
          <div className="flex items-center gap-2 text-xs">
            <span className="px-2 py-0.5 rounded-full bg-white/20">{c.category}</span>
            <span className="flex items-center gap-0.5">
              {[1, 2, 3].map((d) => (
                <Star key={d} className={`h-3.5 w-3.5 ${d <= c.difficulty ? "fill-accent text-accent" : "opacity-30"}`} />
              ))}
            </span>
            <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {c.minutes} min</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold mt-3">{c.title}</h1>
          <p className="opacity-90 mt-2 max-w-xl">{c.objective}</p>
          <div className="mt-5 max-w-sm">
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full bg-accent rounded-full" style={{ width: `${c.progress}%` }} />
            </div>
            <div className="text-xs mt-1.5 opacity-90">{c.progress}% complete</div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="grid md:grid-cols-3 gap-4 mt-6">
        {/* Vocab */}
        <section className="md:col-span-2 rounded-2xl bg-card border border-border p-5 shadow-soft">
          <div className="flex items-center justify-between">
            <h2 className="font-display font-bold text-lg flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-primary" /> Vocabulary
            </h2>
            <span className="text-xs text-muted-foreground">{c.vocabulary.length} words</span>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {c.vocabulary.length > 0 ? c.vocabulary.map((v) => (
              <span key={v.word} className="px-3 py-1.5 rounded-full bg-muted text-sm font-medium">
                {v.word}
              </span>
            )) : (
              <p className="text-sm text-muted-foreground">No vocabulary yet — unlock to preview.</p>
            )}
          </div>
        </section>

        {/* Rewards */}
        <section className="rounded-2xl bg-card border border-border p-5 shadow-soft">
          <h2 className="font-display font-bold text-lg flex items-center gap-2">
            <Trophy className="h-4 w-4 text-accent-foreground" /> Rewards
          </h2>
          <div className="mt-3 space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">XP</span><span className="font-semibold">+{c.xp}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Badge</span><span className="font-semibold">{c.title} Pro</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Unlocks</span><span className="font-semibold">Next chapter</span></div>
          </div>
        </section>

        {/* Grammar */}
        <section className="md:col-span-2 rounded-2xl bg-card border border-border p-5 shadow-soft">
          <h2 className="font-display font-bold text-lg flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" /> Grammar topics
          </h2>
          <ul className="mt-3 space-y-2">
            {c.grammar.length > 0 ? c.grammar.map((g) => (
              <li key={g} className="flex items-center gap-3 text-sm py-2 px-3 rounded-xl bg-muted/40">
                <span className="h-2 w-2 rounded-full bg-primary" />
                {g}
              </li>
            )) : <li className="text-sm text-muted-foreground">Coming soon.</li>}
          </ul>
        </section>

        {/* AI Challenge */}
        <section className="rounded-2xl bg-secondary text-secondary-foreground p-5 shadow-card">
          <div className="text-xs uppercase tracking-wider opacity-70">AI Challenge</div>
          <div className="font-display font-bold text-lg mt-1">Live roleplay</div>
          <p className="text-sm opacity-80 mt-1">Practice this chapter with your AI tutor.</p>
          <Link to="/conversations" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-accent-glow">
            <Mic className="h-4 w-4" /> Start challenge →
          </Link>
        </section>
      </div>

      {/* Actions */}
      <div className="mt-8 flex flex-col sm:flex-row gap-3">
        <Link to="/vocabulary/$chapterId" params={{ chapterId: c.id }} className="flex-1">
          <Button className="w-full h-12 bg-gradient-primary text-primary-foreground shadow-glow text-base">
            Start lesson
          </Button>
        </Link>
        <Link to="/grammar/$chapterId" params={{ chapterId: c.id }} className="flex-1">
          <Button variant="outline" className="w-full h-12 text-base">Review grammar</Button>
        </Link>
      </div>
    </div>
  );
}
