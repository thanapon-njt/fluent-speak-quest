import { createFileRoute, Link } from "@tanstack/react-router";
import { Flame, Zap, Trophy, ArrowRight, Mic, Sparkles, Check } from "lucide-react";
import { user, chapters, dailyMissions, achievements } from "@/data/mock";
import { XPBar } from "@/components/xp-bar";
import { ScoreRing } from "@/components/score-ring";

export const Route = createFileRoute("/_app/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — Fluent" },
      { name: "description", content: "Your daily learning hub: streaks, missions, and progress." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const current = chapters.find((c) => c.status === "in-progress") ?? chapters[1];

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-10 space-y-6">
      {/* Greeting + stats */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-sm text-muted-foreground">Welcome back, {user.name.split(" ")[0]}</p>
          <h1 className="font-display text-3xl sm:text-4xl font-bold mt-1">
            Let's speak today. <span className="text-primary">15 min</span> to go.
          </h1>
        </div>
        <div className="hidden md:flex items-center gap-2">
          <Stat icon={Zap} value={user.xp.toLocaleString()} label="XP" tone="accent" />
          <Stat icon={Flame} value={`${user.streak} days`} label="Streak" tone="orange" />
          <Stat icon={Trophy} value={`Lv ${user.level}`} label="Level" tone="primary" />
        </div>
      </div>

      {/* Continue learning hero */}
      <Link
        to="/chapters/$chapterId"
        params={{ chapterId: current.id }}
        className="block group rounded-3xl bg-gradient-hero p-6 sm:p-8 text-primary-foreground shadow-glow relative overflow-hidden"
      >
        <div className="absolute -right-10 -top-10 text-[10rem] opacity-20 select-none">{current.emoji}</div>
        <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex-1 min-w-0">
            <div className="text-xs uppercase tracking-wider opacity-80">Continue learning</div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold mt-1">{current.title}</h2>
            <p className="opacity-90 mt-1 text-sm">{current.objective}</p>
            <div className="mt-5 max-w-xs">
              <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-accent rounded-full" style={{ width: `${current.progress}%` }} />
              </div>
              <div className="text-xs mt-2 opacity-90">{current.progress}% complete</div>
            </div>
          </div>
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur px-4 py-2.5 text-sm font-semibold group-hover:bg-white/30 transition">
              Resume <ArrowRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </Link>

      {/* Level + speaking minutes */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="md:col-span-2 rounded-2xl bg-card border border-border p-5 shadow-soft">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-xs text-muted-foreground uppercase tracking-wide">Level {user.level}</div>
              <div className="font-display text-xl font-bold mt-0.5">
                {user.xpToNext - user.xp} XP to Level {user.level + 1}
              </div>
            </div>
            <span className="text-xs text-muted-foreground">{user.xp} / {user.xpToNext}</span>
          </div>
          <XPBar value={user.xp} max={user.xpToNext} />
        </div>

        <div className="rounded-2xl bg-card border border-border p-5 shadow-soft flex items-center gap-4">
          <ScoreRing score={Math.min(100, Math.round((user.speakingMinutes / 250) * 100))} label="Monthly goal" size={84} />
          <div>
            <div className="text-xs text-muted-foreground uppercase tracking-wide">Speaking</div>
            <div className="font-display text-2xl font-bold">{user.speakingMinutes} min</div>
            <div className="text-xs text-muted-foreground mt-1">this month</div>
          </div>
        </div>
      </div>

      {/* Daily missions */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-display text-lg font-bold">Daily missions</h3>
          <span className="text-xs text-muted-foreground">Resets in 8h</span>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {dailyMissions.map((m) => {
            const pct = (m.progress / m.total) * 100;
            return (
              <div key={m.id} className="relative rounded-2xl bg-card border border-border p-4 shadow-soft">
                <div className="flex items-start justify-between">
                  <div className="text-2xl">{m.icon}</div>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-accent/20 text-accent-foreground">
                    +{m.xp} XP
                  </span>
                </div>
                <div className="font-medium text-sm mt-3 leading-snug">{m.title}</div>
                <div className="mt-3">
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${m.done ? "bg-success" : "bg-gradient-primary"}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <div className="text-[11px] text-muted-foreground mt-1.5 flex items-center gap-1">
                    {m.done && <Check className="h-3 w-3 text-success" />}
                    {m.progress}/{m.total}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Quick actions */}
      <section className="grid md:grid-cols-2 gap-4">
        <Link to="/conversations" className="group rounded-2xl bg-secondary text-secondary-foreground p-5 shadow-card flex items-center gap-4 hover:scale-[1.01] transition">
          <div className="h-12 w-12 rounded-xl bg-gradient-primary grid place-items-center shadow-glow">
            <Mic className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="flex-1">
            <div className="font-display text-lg font-bold">Talk to your AI tutor</div>
            <div className="text-sm opacity-80">Pick a scenario and start speaking</div>
          </div>
          <ArrowRight className="h-4 w-4 opacity-70 group-hover:translate-x-1 transition" />
        </Link>

        <Link to="/review" className="group rounded-2xl bg-card border border-border p-5 shadow-soft flex items-center gap-4 hover:border-primary/40 transition">
          <div className="h-12 w-12 rounded-xl bg-accent/30 grid place-items-center">
            <Sparkles className="h-5 w-5 text-accent-foreground" />
          </div>
          <div className="flex-1">
            <div className="font-display text-lg font-bold">Smart review</div>
            <div className="text-sm text-muted-foreground">12 items ready for review</div>
          </div>
          <ArrowRight className="h-4 w-4 opacity-70 group-hover:translate-x-1 transition" />
        </Link>
      </section>

      {/* Achievements preview */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-display text-lg font-bold">Achievements</h3>
          <Link to="/profile" className="text-xs text-primary font-semibold hover:underline">View all</Link>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {achievements.map((a) => (
            <div
              key={a.id}
              className={`min-w-[140px] rounded-2xl border p-4 text-center ${
                a.earned ? "bg-card border-border shadow-soft" : "bg-muted/40 border-dashed opacity-60"
              }`}
            >
              <div className="text-3xl">{a.emoji}</div>
              <div className="font-semibold text-sm mt-2">{a.title}</div>
              <div className="text-[11px] text-muted-foreground mt-0.5">{a.desc}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function Stat({
  icon: Icon,
  value,
  label,
  tone,
}: {
  icon: React.ComponentType<{ className?: string }>;
  value: string;
  label: string;
  tone: "primary" | "accent" | "orange";
}) {
  const styles = {
    primary: "bg-primary/10 text-primary",
    accent: "bg-accent/30 text-accent-foreground",
    orange: "bg-orange-500/15 text-orange-600",
  }[tone];
  return (
    <div className="rounded-xl bg-card border border-border px-3 py-2 flex items-center gap-2 shadow-soft">
      <div className={`h-8 w-8 rounded-lg grid place-items-center ${styles}`}>
        <Icon className="h-4 w-4" />
      </div>
      <div>
        <div className="text-sm font-bold leading-none">{value}</div>
        <div className="text-[10px] text-muted-foreground uppercase tracking-wide mt-0.5">{label}</div>
      </div>
    </div>
  );
}
