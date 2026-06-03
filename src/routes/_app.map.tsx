import { createFileRoute, Link } from "@tanstack/react-router";
import { chapters } from "@/data/mock";
import { Lock, Check, Star, Clock, Sparkles, Trophy } from "lucide-react";

export const Route = createFileRoute("/_app/map")({
  head: () => ({
    meta: [
      { title: "Chapter map — Fluent" },
      { name: "description", content: "Explore your gamified English learning adventure." },
    ],
  }),
  component: MapPage,
});

const worldNames = ["Daily Life World", "Travel Realm", "Office Frontier", "Adventure Beyond"];

function MapPage() {
  const completed = chapters.filter((c) => c.status === "completed").length;
  const total = chapters.length;

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Atmospheric backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-primary/5 via-background to-accent/5" />
      <div className="pointer-events-none absolute top-20 -left-20 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 -right-20 h-72 w-72 rounded-full bg-accent/15 blur-3xl" />

      <div className="max-w-3xl mx-auto p-4 sm:p-6 lg:p-10">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary">
            <Sparkles className="h-3.5 w-3.5" /> Your speaking adventure
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold mt-4">The Journey to Fluency</h1>
          <p className="text-muted-foreground mt-2 text-sm">{completed} of {total} chapters conquered</p>
          <div className="mt-4 max-w-xs mx-auto h-2 rounded-full bg-muted overflow-hidden">
            <div className="h-full bg-gradient-primary rounded-full" style={{ width: `${(completed / total) * 100}%` }} />
          </div>
        </div>

        <div className="relative">
          {/* Path line — dashed RPG trail */}
          <svg className="absolute left-1/2 top-0 -translate-x-1/2 h-full w-2 -z-10" preserveAspectRatio="none">
            <line x1="1" y1="0" x2="1" y2="100%" stroke="var(--color-border)" strokeWidth="2" strokeDasharray="6 8" />
          </svg>

          <ol className="space-y-10">
            {chapters.map((c, i) => {
              const side = i % 2 === 0 ? "left" : "right";
              const locked = c.status === "locked";
              const completed = c.status === "completed";
              const active = c.status === "in-progress";
              const worldIdx = Math.floor(i / 2);
              const showWorldLabel = i % 2 === 0;

              return (
                <li key={c.id} className="space-y-4 animate-fade-in-up" style={{ animationDelay: `${i * 60}ms` }}>
                  {showWorldLabel && (
                    <div className="text-center">
                      <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground bg-muted/60 backdrop-blur rounded-full px-3 py-1">
                        <Trophy className="h-3 w-3" /> {worldNames[worldIdx] ?? "Beyond"}
                      </span>
                    </div>
                  )}
                  <div className={`flex items-center gap-3 sm:gap-4 ${side === "right" ? "flex-row-reverse" : ""}`}>
                    {/* Card */}
                    <div className="flex-1">
                      <Link
                        to="/chapters/$chapterId"
                        params={{ chapterId: c.id }}
                        aria-disabled={locked}
                        className={`block group rounded-2xl border bg-card p-4 transition-all ${
                          locked
                            ? "opacity-50 pointer-events-none border-dashed"
                            : active
                              ? "border-primary/40 shadow-glow ring-2 ring-primary/20"
                              : "shadow-soft hover:border-primary/40 hover:shadow-card hover:-translate-y-0.5"
                        } ${side === "right" ? "text-right" : ""}`}
                      >
                        <div className={`flex items-center gap-2 ${side === "right" ? "justify-end" : ""}`}>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-bold uppercase tracking-wide">
                            {c.category}
                          </span>
                          <span className="flex items-center gap-0.5">
                            {[1, 2, 3].map((d) => (
                              <Star
                                key={d}
                                className={`h-3 w-3 ${d <= c.difficulty ? "fill-accent text-accent" : "text-muted-foreground/30"}`}
                              />
                            ))}
                          </span>
                        </div>
                        <h3 className="font-display font-bold text-base sm:text-lg mt-2 leading-tight">{c.title}</h3>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{c.objective || "Coming soon."}</p>
                        <div className={`flex items-center gap-3 mt-3 text-[11px] text-muted-foreground ${side === "right" ? "justify-end" : ""}`}>
                          <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{c.minutes} min</span>
                          <span className="font-bold text-accent-foreground">+{c.xp} XP</span>
                        </div>
                        {active && (
                          <>
                            <div className="mt-3 h-1.5 bg-muted rounded-full overflow-hidden relative">
                              <div className="h-full bg-gradient-primary" style={{ width: `${c.progress}%` }} />
                              <div className="absolute inset-0 animate-glow-sweep bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                            </div>
                            <div className={`mt-2 text-[11px] font-bold text-primary inline-flex items-center gap-1 ${side === "right" ? "ml-auto" : ""}`}>
                              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" /> Continue mission
                            </div>
                          </>
                        )}
                        {completed && c.completedAt && (
                          <div className={`mt-3 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-success ${side === "right" ? "ml-auto" : ""}`}>
                            <Check className="h-3 w-3" /> Completed · {c.completedAt}
                          </div>
                        )}
                      </Link>
                    </div>

                    {/* Node */}
                    <div className="relative shrink-0">
                      {active && (
                        <>
                          <span className="absolute inset-0 rounded-full bg-primary/30 animate-mic-pulse" />
                          <span className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] font-bold uppercase tracking-wider bg-primary text-primary-foreground rounded-full px-2 py-0.5 shadow-glow">
                            You are here
                          </span>
                        </>
                      )}
                      <div className={`relative h-16 w-16 sm:h-18 sm:w-18 rounded-full grid place-items-center text-2xl shadow-card border-4 transition-transform ${
                        completed
                          ? "bg-success text-success-foreground border-success/30"
                          : locked
                            ? "bg-muted text-muted-foreground border-border"
                            : active
                              ? "bg-gradient-primary text-primary-foreground border-white shadow-glow"
                              : "bg-card text-foreground border-primary/30 hover:scale-110"
                      }`}>
                        {locked ? <Lock className="h-5 w-5" /> : completed ? <Check className="h-6 w-6" strokeWidth={3} /> : c.emoji}
                      </div>
                      {completed && (
                        <span className="absolute -bottom-1 -right-1 text-base bg-card border-2 border-success/40 rounded-full h-7 w-7 grid place-items-center shadow-soft" title="Badge earned">
                          🏆
                        </span>
                      )}
                      {!locked && !completed && !active && (
                        <span className="absolute -top-1 -right-1 text-[9px] font-bold bg-accent text-accent-foreground rounded-full px-1.5 py-0.5">NEW</span>
                      )}
                    </div>

                    <div className="flex-1" />
                  </div>
                </li>
              );
            })}
          </ol>

          {/* End marker */}
          <div className="mt-12 text-center animate-fade-in-up">
            <div className="inline-flex items-center gap-2 rounded-2xl bg-gradient-primary text-primary-foreground px-5 py-3 shadow-glow">
              <Trophy className="h-5 w-5" />
              <div className="text-left">
                <div className="text-[10px] uppercase tracking-wider opacity-90">Final destination</div>
                <div className="font-display font-bold">Fluent Speaker</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
