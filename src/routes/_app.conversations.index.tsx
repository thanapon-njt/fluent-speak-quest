import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { scenarios, type Scenario } from "@/data/mock";
import { Clock, Filter, Mic, Zap, Sparkles, ArrowRight, Star } from "lucide-react";

export const Route = createFileRoute("/_app/conversations/")({
  head: () => ({
    meta: [
      { title: "AI Conversation Lobby — Fluent" },
      { name: "description", content: "Pick a scenario and speak with your AI tutor." },
    ],
  }),
  component: Lobby,
});

const categories = ["all", "travel", "work", "casual", "interview"] as const;
const difficulties = ["all", "Easy", "Medium", "Hard"] as const;

function Lobby() {
  const [cat, setCat] = useState<(typeof categories)[number]>("all");
  const [diff, setDiff] = useState<(typeof difficulties)[number]>("all");

  const featured = scenarios.find((s) => s.featured) ?? scenarios[0];
  const rest = scenarios.filter((s) => s.id !== featured.id);
  const filtered = rest.filter(
    (s) => (cat === "all" || s.category === cat) && (diff === "all" || s.difficulty === diff)
  );

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-10">
      <div className="flex items-center gap-3 animate-fade-in-up">
        <div className="h-10 w-10 rounded-xl bg-gradient-primary grid place-items-center shadow-glow">
          <Mic className="h-5 w-5 text-primary-foreground" />
        </div>
        <div>
          <h1 className="font-display text-3xl font-bold">Speak with your AI tutor</h1>
          <p className="text-muted-foreground text-sm">Real scenarios. Real feedback.</p>
        </div>
      </div>

      {/* Featured / Recommended Today */}
      <Link
        to="/conversations/$scenarioId"
        params={{ scenarioId: featured.id }}
        className="group block mt-6 relative overflow-hidden rounded-3xl bg-gradient-immersive text-white shadow-glow animate-fade-in-up"
      >
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute -right-10 -top-10 text-[10rem] leading-none opacity-20 select-none">{featured.tutor.emoji}</div>
        <div className="absolute -left-10 -bottom-10 h-44 w-44 rounded-full bg-primary/40 blur-3xl" />
        <div className="relative p-6 sm:p-8">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider">
            <Sparkles className="h-3 w-3 text-accent" /> Recommended today
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold mt-3 leading-tight">{featured.title}</h2>
          <p className="text-sm opacity-90 mt-1.5 max-w-md">{featured.objective}</p>
          <div className="mt-4 flex flex-wrap items-center gap-2 text-[11px] font-semibold">
            <span className="inline-flex items-center gap-1 rounded-full bg-accent/90 text-accent-foreground px-2.5 py-1">
              <Zap className="h-3 w-3" /> +{featured.xp ?? 100} XP
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-white/15 backdrop-blur px-2.5 py-1">
              <Clock className="h-3 w-3" /> {featured.duration} min
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-white/15 backdrop-blur px-2.5 py-1">
              {featured.difficulty}
            </span>
            {featured.confidenceTag && (
              <span className="inline-flex items-center gap-1 rounded-full bg-white/15 backdrop-blur px-2.5 py-1">
                {featured.confidenceTag}
              </span>
            )}
          </div>
          <div className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-white text-secondary px-5 py-2.5 text-sm font-bold shadow-lg group-hover:scale-[1.02] transition">
            <Mic className="h-4 w-4" /> Start now <ArrowRight className="h-4 w-4" />
          </div>
        </div>
      </Link>

      {/* Filters */}
      <div className="mt-6 space-y-3">
        <FilterRow label="Category" options={categories} value={cat} onChange={setCat} />
        <FilterRow label="Level" options={difficulties} value={diff} onChange={setDiff} />
      </div>

      {/* Cards */}
      <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((s) => (
          <ScenarioCard key={s.id} s={s} />
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full text-center py-12 text-muted-foreground">
            <Filter className="h-6 w-6 mx-auto opacity-50" />
            <p className="mt-2 text-sm">No scenarios match your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function FilterRow<T extends string>({ label, options, value, onChange }: { label: string; options: readonly T[]; value: T; onChange: (v: T) => void }) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1">
      <span className="text-xs uppercase tracking-wider text-muted-foreground shrink-0">{label}</span>
      {options.map((o) => (
        <button
          key={o}
          onClick={() => onChange(o)}
          className={`px-3 py-1.5 rounded-full text-sm font-medium shrink-0 transition ${
            value === o ? "bg-primary text-primary-foreground shadow-soft" : "bg-muted text-muted-foreground hover:bg-muted/70"
          }`}
        >
          {o === "all" ? "All" : o.charAt(0).toUpperCase() + o.slice(1)}
        </button>
      ))}
    </div>
  );
}

function ScenarioCard({ s }: { s: Scenario }) {
  const diffColor =
    s.difficulty === "Easy" ? "text-success" : s.difficulty === "Medium" ? "text-accent-foreground" : "text-destructive";
  const diffStars = s.difficulty === "Easy" ? 1 : s.difficulty === "Medium" ? 2 : 3;
  return (
    <Link
      to="/conversations/$scenarioId"
      params={{ scenarioId: s.id }}
      className="group rounded-2xl bg-card border border-border p-5 shadow-soft hover:shadow-card hover:-translate-y-0.5 hover:border-primary/40 transition-all flex flex-col"
    >
      <div className="flex items-start justify-between">
        <div className="text-4xl">{s.tutor.emoji}</div>
        <div className="flex flex-col items-end gap-1">
          <span className={`text-[10px] font-bold uppercase tracking-wider ${diffColor}`}>{s.difficulty}</span>
          <span className="flex items-center gap-0.5">
            {[1, 2, 3].map((d) => (
              <Star key={d} className={`h-3 w-3 ${d <= diffStars ? "fill-accent text-accent" : "text-muted-foreground/30"}`} />
            ))}
          </span>
        </div>
      </div>
      <h3 className="font-display font-bold text-lg mt-3 group-hover:text-primary transition">{s.title}</h3>
      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{s.useCase ?? s.objective}</p>
      {s.confidenceTag && (
        <span className="mt-3 inline-flex w-fit items-center gap-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider px-2 py-0.5">
          <Sparkles className="h-2.5 w-2.5" /> {s.confidenceTag}
        </span>
      )}
      <div className="mt-auto pt-4 flex items-center justify-between text-xs">
        <span className="flex items-center gap-1 text-muted-foreground font-medium">
          <Clock className="h-3 w-3" /> {s.duration} min
        </span>
        <span className="flex items-center gap-1 font-bold text-accent-foreground">
          <Zap className="h-3 w-3" /> +{s.xp ?? 100} XP
        </span>
      </div>
    </Link>
  );
}
