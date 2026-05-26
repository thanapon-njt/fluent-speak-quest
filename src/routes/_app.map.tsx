import { createFileRoute, Link } from "@tanstack/react-router";
import { chapters } from "@/data/mock";
import { Lock, Check, Star, Clock } from "lucide-react";

export const Route = createFileRoute("/_app/map")({
  head: () => ({
    meta: [
      { title: "Chapter map — Fluent" },
      { name: "description", content: "Explore your gamified English learning journey." },
    ],
  }),
  component: MapPage,
});

function MapPage() {
  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 lg:p-10">
      <div className="text-center mb-10">
        <h1 className="font-display text-3xl sm:text-4xl font-bold">Your Journey</h1>
        <p className="text-muted-foreground mt-2">Real-world chapters to fluency.</p>
      </div>

      <div className="relative">
        {/* Path line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 bg-gradient-to-b from-primary via-primary/40 to-muted rounded-full -z-10" />

        <ol className="space-y-10">
          {chapters.map((c, i) => {
            const side = i % 2 === 0 ? "left" : "right";
            const locked = c.status === "locked";
            const completed = c.status === "completed";

            return (
              <li key={c.id} className={`flex items-center gap-4 ${side === "right" ? "flex-row-reverse" : ""}`}>
                <div className="flex-1">
                  <Link
                    to="/chapters/$chapterId"
                    params={{ chapterId: c.id }}
                    disabled={locked}
                    className={`block group rounded-2xl border bg-card p-4 shadow-soft transition-all ${
                      locked
                        ? "opacity-60 pointer-events-none border-dashed"
                        : "hover:border-primary/40 hover:shadow-card hover:-translate-y-0.5"
                    } ${side === "right" ? "text-right" : ""}`}
                  >
                    <div className={`flex items-center gap-2 ${side === "right" ? "justify-end" : ""}`}>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-medium">
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
                    <h3 className="font-display font-bold text-lg mt-2">{c.title}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{c.objective || "Coming soon."}</p>
                    <div className={`flex items-center gap-3 mt-3 text-xs text-muted-foreground ${side === "right" ? "justify-end" : ""}`}>
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{c.minutes} min</span>
                      <span>+{c.xp} XP</span>
                    </div>
                    {c.progress > 0 && c.progress < 100 && (
                      <div className="mt-3 h-1.5 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-primary" style={{ width: `${c.progress}%` }} />
                      </div>
                    )}
                  </Link>
                </div>

                {/* Node */}
                <div className={`relative shrink-0 h-16 w-16 rounded-full grid place-items-center text-2xl shadow-card border-4 ${
                  completed
                    ? "bg-success text-success-foreground border-success/30"
                    : locked
                      ? "bg-muted text-muted-foreground border-border"
                      : "bg-gradient-primary text-primary-foreground border-primary/20 shadow-glow"
                }`}>
                  {locked ? <Lock className="h-5 w-5" /> : completed ? <Check className="h-6 w-6" strokeWidth={3} /> : c.emoji}
                </div>

                <div className="flex-1" />
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
