import { createFileRoute } from "@tanstack/react-router";
import { user, achievements, personalBests, learningJourney, type Rarity } from "@/data/mock";
import { Flame, Zap, Trophy, Clock, Sparkles } from "lucide-react";

export const Route = createFileRoute("/_app/profile")({
  head: () => ({
    meta: [
      { title: "Profile — Fluent" },
      { name: "description", content: "Your learning stats, achievements, and streak." },
    ],
  }),
  component: Profile,
});

function Profile() {
  // Mock 12-week activity heatmap
  const weeks = 12;
  const days = 7;
  const heatmap = Array.from({ length: weeks * days }, (_, i) => {
    const v = (i * 7919) % 5; // pseudo-random 0..4
    return v;
  });

  const speakingHistory = [
    { scenario: "Coffee Order", date: "Today", score: 88 },
    { scenario: "Airport Check-in", date: "Yesterday", score: 76 },
    { scenario: "Daily Stand-up", date: "2 days ago", score: 72 },
    { scenario: "Small Talk", date: "4 days ago", score: 81 },
  ];

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-10 space-y-6">
      {/* Header */}
      <div className="rounded-3xl bg-gradient-hero p-6 sm:p-8 text-primary-foreground shadow-glow flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="h-20 w-20 rounded-2xl bg-white/20 backdrop-blur grid place-items-center text-5xl shrink-0">
          {user.avatar}
        </div>
        <div className="flex-1">
          <h1 className="font-display text-3xl font-bold">{user.name}</h1>
          <p className="opacity-90 text-sm mt-1">Goal: {user.goal} · Level {user.level}</p>
        </div>
        <div className="flex gap-2">
          <Pill icon={Flame} value={`${user.streak}`} label="streak" />
          <Pill icon={Zap} value={`${user.xp}`} label="XP" />
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatTile label="Speaking" value={`${user.speakingMinutes}m`} icon={Clock} />
        <StatTile label="Chapters" value="2/8" icon={Trophy} />
        <StatTile label="Words" value="142" icon={Zap} />
        <StatTile label="Accuracy" value="86%" icon={Flame} />
      </div>

      {/* Personal Bests */}
      <section>
        <h3 className="font-display font-bold text-lg mb-3 flex items-center gap-2">
          <Trophy className="h-4 w-4 text-accent-foreground" /> Personal bests
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {personalBests.map((p) => (
            <div key={p.label} className="rounded-2xl bg-card border border-border p-4 shadow-soft hover:border-primary/40 transition">
              <div className="text-2xl">{p.icon}</div>
              <div className="font-display text-xl font-bold mt-1">{p.value}</div>
              <div className="text-[11px] text-muted-foreground uppercase tracking-wide mt-0.5">{p.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Streak heatmap */}
      <section className="rounded-2xl bg-card border border-border p-5 shadow-soft">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-display font-bold text-lg">Streak calendar</h3>
          <span className="text-xs text-muted-foreground">Last 12 weeks</span>
        </div>
        <div className="grid grid-flow-col grid-rows-7 gap-1 overflow-x-auto">
          {heatmap.map((v, i) => (
            <div
              key={i}
              className="h-3.5 w-3.5 rounded-sm"
              style={{
                backgroundColor:
                  v === 0 ? "var(--color-muted)" :
                  v === 1 ? "color-mix(in oklab, var(--color-primary) 25%, transparent)" :
                  v === 2 ? "color-mix(in oklab, var(--color-primary) 50%, transparent)" :
                  v === 3 ? "color-mix(in oklab, var(--color-primary) 75%, transparent)" :
                  "var(--color-primary)",
              }}
            />
          ))}
        </div>
        <div className="flex items-center justify-end gap-2 mt-3 text-xs text-muted-foreground">
          Less
          {[0, 1, 2, 3, 4].map((v) => (
            <span
              key={v}
              className="h-3 w-3 rounded-sm"
              style={{
                backgroundColor:
                  v === 0 ? "var(--color-muted)" :
                  v === 1 ? "color-mix(in oklab, var(--color-primary) 25%, transparent)" :
                  v === 2 ? "color-mix(in oklab, var(--color-primary) 50%, transparent)" :
                  v === 3 ? "color-mix(in oklab, var(--color-primary) 75%, transparent)" :
                  "var(--color-primary)",
              }}
            />
          ))}
          More
        </div>
      </section>

      {/* Achievements */}
      <section>
        <h3 className="font-display font-bold text-lg mb-3">Achievements</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {achievements.map((a) => {
            const pct = a.progress ? (a.progress.current / a.progress.total) * 100 : 0;
            return (
              <div
                key={a.id}
                className={`relative rounded-2xl border p-4 transition ${
                  a.earned ? "bg-card border-border shadow-soft hover:-translate-y-0.5" : "bg-muted/20 border-dashed"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className={`text-3xl ${a.earned ? "" : "grayscale opacity-60"}`}>{a.emoji}</div>
                  <RarityBadge rarity={a.rarity} />
                </div>
                <div className="font-semibold text-sm mt-2">{a.title}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{a.desc}</div>
                {a.earned ? (
                  <div className="text-[10px] text-success font-bold mt-2 uppercase tracking-wider">
                    Earned · {a.unlockedAt}
                  </div>
                ) : a.progress ? (
                  <div className="mt-2">
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-primary rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                    <div className="text-[10px] text-muted-foreground mt-1 tabular-nums">
                      {a.progress.current} / {a.progress.total}
                    </div>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </section>

      {/* Learning Journey */}
      <section>
        <h3 className="font-display font-bold text-lg mb-3 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary" /> Your learning journey
        </h3>
        <div className="rounded-2xl bg-card border border-border p-5 shadow-soft">
          <ol className="relative border-l border-border/70 ml-3 space-y-5">
            {learningJourney.map((m) => (
              <li key={m.id} className="pl-5 relative">
                <span className="absolute -left-[11px] top-0 h-5 w-5 rounded-full bg-gradient-primary grid place-items-center text-[10px] shadow-glow">
                  {m.emoji}
                </span>
                <div className="font-semibold text-sm">{m.title}</div>
                <div className="text-xs text-muted-foreground">{m.date}</div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Speaking history */}
      <section>
        <h3 className="font-display font-bold text-lg mb-3">Speaking history</h3>
        <div className="rounded-2xl bg-card border border-border divide-y divide-border shadow-soft overflow-hidden">
          {speakingHistory.map((h) => (
            <div key={h.scenario} className="flex items-center justify-between p-4">
              <div>
                <div className="font-medium text-sm">{h.scenario}</div>
                <div className="text-xs text-muted-foreground">{h.date}</div>
              </div>
              <div className={`font-display font-bold ${h.score >= 80 ? "text-success" : "text-accent-foreground"}`}>
                {h.score}<span className="text-xs text-muted-foreground font-sans">/100</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function Pill({ icon: Icon, value, label }: { icon: React.ComponentType<{ className?: string }>; value: string; label: string }) {
  return (
    <div className="px-3 py-2 rounded-xl bg-white/15 backdrop-blur flex items-center gap-2">
      <Icon className="h-4 w-4" />
      <div className="text-sm">
        <span className="font-bold">{value}</span>
        <span className="opacity-80 ml-1">{label}</span>
      </div>
    </div>
  );
}

function StatTile({ label, value, icon: Icon }: { label: string; value: string; icon: React.ComponentType<{ className?: string }> }) {
  return (
    <div className="rounded-2xl bg-card border border-border p-4 shadow-soft">
      <Icon className="h-4 w-4 text-primary" />
      <div className="font-display text-2xl font-bold mt-2">{value}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  );
}
