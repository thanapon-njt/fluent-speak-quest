import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { scenarios, type Scenario } from "@/data/mock";
import { Clock, Filter, Mic } from "lucide-react";

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

  const filtered = scenarios.filter(
    (s) => (cat === "all" || s.category === cat) && (diff === "all" || s.difficulty === diff)
  );

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-10">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-gradient-primary grid place-items-center shadow-glow">
          <Mic className="h-5 w-5 text-primary-foreground" />
        </div>
        <div>
          <h1 className="font-display text-3xl font-bold">Speak with your AI tutor</h1>
          <p className="text-muted-foreground text-sm">Real scenarios. Real feedback.</p>
        </div>
      </div>

      {/* Filters */}
      <div className="mt-6 space-y-3">
        <FilterRow label="Category" options={categories} value={cat} onChange={setCat} />
        <FilterRow label="Difficulty" options={difficulties} value={diff} onChange={setDiff} />
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
  const diffColor = s.difficulty === "Easy" ? "text-success" : s.difficulty === "Medium" ? "text-accent-foreground" : "text-destructive";
  return (
    <Link
      to="/conversations/$scenarioId"
      params={{ scenarioId: s.id }}
      className="group rounded-2xl bg-card border border-border p-5 shadow-soft hover:shadow-card hover:-translate-y-0.5 transition-all"
    >
      <div className="flex items-start justify-between">
        <div className="text-4xl">{s.tutor.emoji}</div>
        <span className={`text-xs font-bold ${diffColor}`}>{s.difficulty}</span>
      </div>
      <h3 className="font-display font-bold text-lg mt-3 group-hover:text-primary transition">{s.title}</h3>
      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{s.objective}</p>
      <div className="mt-4 flex items-center justify-between text-xs">
        <span className="text-muted-foreground">{s.tutor.name} · {s.tutor.accent}</span>
        <span className="flex items-center gap-1 font-medium"><Clock className="h-3 w-3" />{s.duration} min</span>
      </div>
    </Link>
  );
}
