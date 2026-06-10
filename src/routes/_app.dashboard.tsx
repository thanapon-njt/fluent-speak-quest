import { createFileRoute, Link } from "@tanstack/react-router";
import { Zap, ArrowRight, Mic, Sparkles, Check, Target, Headphones } from "lucide-react";
import { user, chapters, dailyMissions } from "@/data/mock";

export const Route = createFileRoute("/_app/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — Fluent" },
      { name: "description", content: "Your daily speaking command center: streaks, missions, and progress." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const current = chapters.find((c) => c.status === "in-progress") ?? chapters[1];
  const xpPct = Math.round((user.xp / user.xpToNext) * 100);
  const dailyDone = dailyMissions.filter((m) => m.done).length;
  const dailyTotal = dailyMissions.length;
  const dailyPct = Math.round((dailyDone / dailyTotal) * 100);

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-10 space-y-6">
      {/* Greeting + motivational micro */}
      <div className="animate-fade-in-up">
        <p className="text-sm text-muted-foreground">Welcome back, {user.name.split(" ")[0]} 👋</p>
        <h1 className="font-display text-2xl sm:text-3xl font-bold mt-1">
          Ready for today's challenge?
        </h1>
        <p className="text-sm text-muted-foreground mt-1.5">
          You're <span className="text-primary font-semibold">{xpPct}%</span> closer to confident speaking — keep going.
        </p>
      </div>

      {/* HERO — Continue Your Journey */}
      <Link
        to="/chapters/$chapterId"
        params={{ chapterId: current.id }}
        className="block group relative overflow-hidden rounded-3xl bg-gradient-immersive text-white shadow-glow animate-fade-in-up"
        style={{ animationDelay: "120ms" }}
      >
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="absolute -right-12 -top-12 text-[12rem] leading-none opacity-20 select-none animate-float">{current.emoji}</div>
        <div className="absolute -left-10 -bottom-10 h-48 w-48 rounded-full bg-primary/40 blur-3xl" />

        <div className="relative p-6 sm:p-8">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" /> Continue your mission
            </span>
            {current.currentStep && current.totalSteps && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-black/25 backdrop-blur px-2.5 py-1 text-[11px] font-semibold">
                Step {current.currentStep} of {current.totalSteps}
              </span>
            )}
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold mt-3 leading-tight">{current.title}</h2>
          <p className="text-sm sm:text-base opacity-90 mt-2 max-w-lg">{current.objective}</p>

          {/* Reward + time chips */}
          <div className="mt-4 flex items-center gap-2 flex-wrap text-[11px] font-semibold">
            <span className="inline-flex items-center gap-1 rounded-full bg-accent/90 text-accent-foreground px-2.5 py-1">
              <Zap className="h-3 w-3" /> +{current.xp} XP
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-white/15 backdrop-blur px-2.5 py-1">
              ≈ {Math.max(2, Math.round(current.minutes * (1 - current.progress / 100)))} min remaining
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-white/15 backdrop-blur px-2.5 py-1">
              {current.category}
            </span>
          </div>

          <div className="mt-6 max-w-sm">
            <div className="flex items-center justify-between text-xs opacity-90 mb-1.5">
              <span>{current.progress}% complete</span>
              <span>+{current.xp} XP on finish</span>
            </div>
            <div className="h-2.5 bg-white/15 rounded-full overflow-hidden relative">
              <div
                className="h-full bg-gradient-to-r from-accent to-primary-glow rounded-full transition-all duration-1000"
                style={{ width: `${current.progress}%` }}
              />
              <div className="absolute inset-0 animate-glow-sweep bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            </div>
          </div>

          <div className="mt-6 flex items-center gap-3 flex-wrap">
            <span className="inline-flex items-center gap-2 rounded-2xl bg-white text-secondary px-5 py-3 text-sm font-bold shadow-lg group-hover:scale-[1.03] transition">
              <Mic className="h-4 w-4" /> Continue Mission
            </span>
            <span className="text-xs opacity-80">Resume where you left off</span>
          </div>
        </div>
      </Link>

      {/* Motivational microcopy strip */}
      <div className="grid sm:grid-cols-3 gap-2.5 animate-fade-in-up" style={{ animationDelay: "150ms" }}>
        <MotivationChip icon="🎯" text={`Only ${user.xpToNext - user.xp} XP to Level ${user.level + 1}`} tone="primary" />
        <MotivationChip icon="🔥" text={`Keep your ${user.streak}-day streak alive`} tone="flame" />
        <MotivationChip icon="📈" text="You're improving faster than last week" tone="accent" />
      </div>

      {/* Speaking-first quick actions */}
      <div className="grid md:grid-cols-2 gap-4 animate-fade-in-up" style={{ animationDelay: "180ms" }}>
        <Link
          to="/conversations"
          className="group relative overflow-hidden rounded-3xl bg-secondary text-secondary-foreground p-6 shadow-card hover:-translate-y-0.5 transition"
        >
          <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-gradient-primary opacity-30 blur-2xl" />
          <div className="relative flex items-center gap-4">
            <div className="h-14 w-14 rounded-2xl bg-gradient-primary grid place-items-center shadow-glow shrink-0">
              <Mic className="h-6 w-6 text-primary-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[11px] uppercase tracking-wider opacity-70">Speak now</div>
              <div className="font-display text-xl font-bold mt-0.5">Practice a real conversation</div>
              <div className="text-xs opacity-80 mt-1">AI tutor · 5–15 min · instant feedback</div>
            </div>
            <ArrowRight className="h-5 w-5 opacity-70 group-hover:translate-x-1 transition" />
          </div>
        </Link>

        <Link
          to="/review"
          className="group rounded-3xl bg-card border border-border p-6 shadow-soft hover:border-primary/40 hover:-translate-y-0.5 transition"
        >
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-2xl bg-accent/30 grid place-items-center shrink-0">
              <Sparkles className="h-6 w-6 text-accent-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[11px] uppercase tracking-wider text-muted-foreground">Smart review</div>
              <div className="font-display text-xl font-bold mt-0.5">12 items ready</div>
              <div className="text-xs text-muted-foreground mt-1">Lock in what you learned this week</div>
            </div>
            <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:translate-x-1 group-hover:text-primary transition" />
          </div>
        </Link>
      </div>


      {/* Daily Goal + Daily Missions */}
      <section className="grid lg:grid-cols-[1fr_2fr] gap-4">

        {/* Daily goal ring */}
        <div className="rounded-3xl bg-card border border-border p-5 shadow-soft">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Today's goal</div>
              <div className="font-display text-lg font-bold mt-0.5 flex items-center gap-1.5">
                <Target className="h-4 w-4 text-primary" /> Speak 15 minutes
              </div>
            </div>
            <span className="text-xs font-bold px-2 py-1 rounded-full bg-primary/10 text-primary">+100 XP</span>
          </div>
          <div className="mt-4 flex items-center gap-4">
            <DailyRing pct={dailyPct} />
            <div className="text-sm">
              <div className="font-bold text-lg">{dailyDone}/{dailyTotal}</div>
              <div className="text-xs text-muted-foreground">missions done</div>
              <p className="text-xs text-primary mt-2 font-medium">
                {dailyPct >= 100 ? "🎉 Streak saved!" : "Ready for your next mission?"}
              </p>
            </div>
          </div>
        </div>

        {/* Missions list */}
        <div className="rounded-3xl bg-card border border-border p-5 shadow-soft">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-display text-lg font-bold flex items-center gap-2">
              <Headphones className="h-4 w-4 text-primary" /> Daily missions
            </h3>
            <span className="text-[11px] text-muted-foreground">Resets in 8h</span>
          </div>
          <div className="grid sm:grid-cols-2 gap-2.5">
            {dailyMissions.map((m, idx) => {
              const pct = (m.progress / m.total) * 100;
              return (
                <div
                  key={m.id}
                  className={`relative rounded-2xl border p-3 transition animate-fade-in-up ${
                    m.done
                      ? "border-success/30 bg-success/5"
                      : "border-border bg-background hover:border-primary/30"
                  }`}
                  style={{ animationDelay: `${idx * 60}ms` }}
                >
                  <div className="flex items-center gap-3">
                    <div className={`h-10 w-10 rounded-xl grid place-items-center text-lg shrink-0 ${
                      m.done ? "bg-success/20" : "bg-muted"
                    }`}>{m.icon}</div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold leading-snug truncate">{m.title}</div>
                      <div className="mt-1.5 flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-700 ${m.done ? "bg-success" : "bg-gradient-primary"}`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <span className="text-[10px] font-bold text-muted-foreground tabular-nums">
                          {m.progress}/{m.total}
                        </span>
                      </div>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                      m.done ? "bg-success text-success-foreground" : "bg-accent/30 text-accent-foreground"
                    }`}>
                      {m.done ? <Check className="h-3 w-3" /> : `+${m.xp}`}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Level progress bar — slim, focused */}
      <div className="rounded-3xl bg-card border border-border p-5 shadow-soft">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-primary grid place-items-center shadow-glow text-primary-foreground font-display font-bold">
              {user.level}
            </div>
            <div>
              <div className="text-xs text-muted-foreground uppercase tracking-wide">Level {user.level} · {user.goal}</div>
              <div className="font-display font-bold">{user.xpToNext - user.xp} XP to Level {user.level + 1}</div>
            </div>
          </div>
          <span className="text-xs font-medium text-muted-foreground tabular-nums">{user.xp} / {user.xpToNext}</span>
        </div>
        <div className="h-3 bg-muted rounded-full overflow-hidden relative">
          <div
            className="h-full bg-gradient-primary rounded-full transition-all duration-1000"
            style={{ width: `${xpPct}%` }}
          />
          <div className="absolute inset-0 animate-glow-sweep bg-gradient-to-r from-transparent via-white/40 to-transparent" />
        </div>
      </div>
    </div>
  );
}


function DailyRing({ pct }: { pct: number }) {
  const size = 96;
  const r = size / 2 - 8;
  const c = 2 * Math.PI * r;
  const offset = c - (pct / 100) * c;
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} stroke="var(--color-muted)" strokeWidth="8" fill="none" />
        <circle
          cx={size / 2} cy={size / 2} r={r}
          stroke="var(--color-primary)" strokeWidth="8" fill="none" strokeLinecap="round"
          strokeDasharray={c} strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 1.1s cubic-bezier(0.2,0.9,0.3,1)" }}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <div className="text-center">
          <div className="font-display text-xl font-bold">{pct}%</div>
        </div>
      </div>
    </div>
  );
}

function MotivationChip({ icon, text, tone }: { icon: string; text: string; tone: "primary" | "flame" | "accent" }) {
  const toneClass =
    tone === "flame"
      ? "border-flame/30 bg-flame/10 text-flame-foreground"
      : tone === "accent"
        ? "border-accent/40 bg-accent/15 text-accent-foreground"
        : "border-primary/30 bg-primary/10 text-primary";
  return (
    <div className={`flex items-center gap-2 rounded-2xl border px-3 py-2.5 text-xs font-semibold ${toneClass}`}>
      <span className="text-base leading-none">{icon}</span>
      <span className="leading-snug">{text}</span>
    </div>
  );
}

function TrendCard({ label, data, accent }: { label: string; data: number[]; accent: "primary" | "accent" | "success" }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = Math.max(1, max - min);
  const w = 100;
  const h = 32;
  const step = w / (data.length - 1);
  const points = data.map((v, i) => `${i * step},${h - ((v - min) / range) * h}`).join(" ");
  const stroke =
    accent === "accent" ? "var(--color-accent)" : accent === "success" ? "var(--color-success)" : "var(--color-primary)";
  const last = data[data.length - 1];
  const first = data[0];
  const delta = last - first;
  return (
    <div className="rounded-2xl border border-border bg-background p-3">
      <div className="flex items-center justify-between">
        <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</div>
        <div className={`text-[10px] font-bold ${delta >= 0 ? "text-success" : "text-destructive"}`}>
          {delta >= 0 ? "+" : ""}{delta}
        </div>
      </div>
      <div className="mt-2 flex items-end justify-between gap-2">
        <div className="font-display font-bold text-xl tabular-nums">{last}</div>
        <svg viewBox={`0 0 ${w} ${h}`} className="h-8 w-24 overflow-visible">
          <polyline fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" points={points} />
          <circle cx={(data.length - 1) * step} cy={h - ((last - min) / range) * h} r="2.5" fill={stroke} />
        </svg>
      </div>
    </div>
  );
}
