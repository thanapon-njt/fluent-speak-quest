import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getChapter } from "@/data/mock";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Lightbulb } from "lucide-react";

export const Route = createFileRoute("/_app/grammar/$chapterId")({
  head: ({ params }) => ({
    meta: [{ title: `Grammar — ${params.chapterId} — Fluent` }],
  }),
  loader: ({ params }) => {
    const c = getChapter(params.chapterId);
    if (!c) throw notFound();
    return c;
  },
  component: GrammarPage,
});

function GrammarPage() {
  const c = Route.useLoaderData();
  const topic = c.grammar[0] ?? "Polite requests";

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 lg:p-10">
      <Link to="/chapters/$chapterId" params={{ chapterId: c.id }} className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4">
        <ArrowLeft className="h-4 w-4" /> Chapter
      </Link>

      <h1 className="font-display text-3xl font-bold">{topic}</h1>
      <p className="text-muted-foreground mt-2">A friendly way to ask for something.</p>

      {/* Explanation */}
      <section className="mt-6 rounded-2xl bg-card border border-border p-5 sm:p-6 shadow-soft">
        <div className="flex items-center gap-2 text-primary font-semibold text-sm">
          <Lightbulb className="h-4 w-4" /> The rule
        </div>
        <p className="mt-3 leading-relaxed">
          Use <span className="font-mono px-1.5 py-0.5 rounded bg-primary/10 text-primary">Could I</span> + verb when you want to be polite.
          It's softer than <span className="font-mono px-1.5 py-0.5 rounded bg-muted">Can I</span> and works great in shops, cafés, and offices.
        </p>

        <div className="mt-5 grid sm:grid-cols-2 gap-3">
          <ExampleCard ok>"<u>Could I</u> have a latte, please?"</ExampleCard>
          <ExampleCard ok>"<u>Could I</u> sit by the window?"</ExampleCard>
          <ExampleCard>"Gimme coffee."</ExampleCard>
          <ExampleCard>"I want latte now."</ExampleCard>
        </div>
      </section>

      {/* Visual breakdown */}
      <section className="mt-4 rounded-2xl bg-gradient-hero text-primary-foreground p-5 sm:p-6">
        <div className="text-xs uppercase tracking-wider opacity-80">Sentence structure</div>
        <div className="mt-3 flex flex-wrap gap-2 font-display text-lg">
          <Token color="accent">Could</Token>
          <Token color="white">I</Token>
          <Token color="accent">have</Token>
          <Token color="white">a coffee</Token>
          <Token color="accent">please?</Token>
        </div>
      </section>

      {/* Practice */}
      <section className="mt-4 rounded-2xl bg-card border border-border p-5 sm:p-6 shadow-soft">
        <div className="text-sm font-semibold mb-3">Quick practice</div>
        <p className="text-sm text-muted-foreground mb-3">Pick the polite version:</p>
        <div className="grid gap-2">
          {[
            { text: "Give me the menu.", ok: false },
            { text: "Could I have the menu, please?", ok: true },
            { text: "I want menu.", ok: false },
          ].map((opt) => (
            <button
              key={opt.text}
              className="text-left rounded-xl border border-border bg-background hover:border-primary/40 px-4 py-3 text-sm transition"
            >
              {opt.text}
            </button>
          ))}
        </div>
      </section>

      <Link to="/quiz/$chapterId" params={{ chapterId: c.id }}>
        <Button className="w-full h-12 mt-6 bg-gradient-primary text-primary-foreground shadow-glow text-base">
          Continue to quiz
        </Button>
      </Link>
    </div>
  );
}

function ExampleCard({ children, ok }: { children: React.ReactNode; ok?: boolean }) {
  return (
    <div className={`rounded-xl border p-3 text-sm ${ok ? "border-success/30 bg-success/5" : "border-destructive/30 bg-destructive/5 line-through opacity-70"}`}>
      <span className={`text-xs font-semibold mr-2 ${ok ? "text-success" : "text-destructive"}`}>{ok ? "✓" : "✗"}</span>
      {children}
    </div>
  );
}

function Token({ children, color }: { children: React.ReactNode; color: "accent" | "white" }) {
  return (
    <span className={`px-3 py-1.5 rounded-xl font-semibold ${color === "accent" ? "bg-accent text-accent-foreground" : "bg-white/15"}`}>
      {children}
    </span>
  );
}
