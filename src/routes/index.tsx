import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Mic, Sparkles, Flame, Trophy, Globe2, Brain, MessageCircle, Check, Zap } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Fluent — Speak English Confidently in 1 Year" },
      { name: "description", content: "An AI speaking coach that turns daily 10-minute missions into real spoken English. Stop translating in your head. Start speaking." },
      { property: "og:title", content: "Fluent — Your AI English Speaking Coach" },
      { property: "og:description", content: "Daily 10-minute missions, real conversations, real feedback. Become a confident English speaker in 1 year." },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <header className="sticky top-0 z-40 backdrop-blur bg-background/80 border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl bg-gradient-primary grid place-items-center shadow-glow">
              <span className="text-primary-foreground font-bold">F</span>
            </div>
            <span className="font-display font-bold text-lg">Fluent</span>
          </Link>
          <nav className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
            <a href="#how" className="hover:text-foreground">How it works</a>
            <a href="#scenarios" className="hover:text-foreground">Scenarios</a>
            <a href="#journey" className="hover:text-foreground">Journey</a>
          </nav>
          <div className="flex items-center gap-2">
            <Link to="/login" className="text-sm font-medium px-3 py-2 hover:text-primary">Sign in</Link>
            <Link
              to="/register"
              className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-glow hover:scale-[1.02] transition"
            >
              Start free
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-immersive opacity-[0.06]" />
        <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-gradient-primary opacity-20 blur-3xl" />
        <div className="absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-gradient-accent opacity-20 blur-3xl" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-16 sm:pt-24 pb-16 grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary">
              <Sparkles className="h-3.5 w-3.5" /> AI speaking coach · 10 min a day
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold mt-5 leading-[1.05]">
              Stop translating in your head.
              <br />
              <span className="bg-gradient-primary bg-clip-text text-transparent">Start speaking naturally.</span>
            </h1>
            <p className="mt-5 text-base sm:text-lg text-muted-foreground max-w-xl">
              Fluent is your AI-powered speaking adventure. Run real conversations, complete daily missions,
              and build true English speaking confidence — in 1 year.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                to="/register"
                className="inline-flex items-center gap-2 rounded-2xl bg-gradient-primary px-6 py-3.5 text-base font-bold text-primary-foreground shadow-glow hover:scale-[1.02] transition"
              >
                <Mic className="h-5 w-5" /> Start your first mission
              </Link>
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 rounded-2xl border border-border bg-card px-5 py-3.5 text-base font-semibold hover:border-primary/40 transition"
              >
                See a demo <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-6 flex items-center gap-5 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-success" /> No credit card</span>
              <span className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-success" /> 14-day free</span>
              <span className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-success" /> Speak from day 1</span>
            </div>
          </div>

          {/* Floating AI orb mock */}
          <div className="relative h-[420px] hidden lg:block">
            <div className="absolute inset-0 grid place-items-center">
              <div className="relative">
                <div className="h-64 w-64 rounded-full bg-gradient-hero animate-orb shadow-orb" />
                <div className="absolute inset-0 rounded-full border border-white/20 animate-orb-spin" />
                <div className="absolute -top-4 -left-6 rounded-2xl bg-card border border-border shadow-card px-3 py-2 text-xs font-semibold animate-float">
                  <span className="text-primary">+50 XP</span> — Great pronunciation!
                </div>
                <div className="absolute -bottom-2 -right-8 rounded-2xl bg-card border border-border shadow-card px-3 py-2 text-xs font-semibold animate-bob">
                  🔥 24-day streak
                </div>
                <div className="absolute top-1/2 -right-16 rounded-2xl bg-secondary text-secondary-foreground shadow-card px-3 py-2 text-xs animate-float" style={{ animationDelay: "0.6s" }}>
                  “Could I get a latte to-go?”
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Social proof strip */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { v: "10 min", l: "Daily missions" },
              { v: "200+", l: "Real scenarios" },
              { v: "24/7", l: "AI tutor" },
              { v: "1 year", l: "To fluency" },
            ].map((s) => (
              <div key={s.l} className="rounded-2xl border border-border bg-card p-4 text-center">
                <div className="font-display text-2xl font-bold">{s.v}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Before vs After */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-center">From frozen to fluent</h2>
        <p className="text-center text-muted-foreground mt-3 max-w-xl mx-auto">
          The transformation isn't grammar drills. It's confidence — built one real conversation at a time.
        </p>

        <div className="mt-10 grid md:grid-cols-2 gap-5">
          <div className="rounded-3xl border border-destructive/20 bg-destructive/5 p-6 sm:p-8">
            <div className="text-xs font-bold uppercase tracking-wider text-destructive">Before</div>
            <h3 className="font-display text-2xl font-bold mt-2">Your brain freezes mid-sentence.</h3>
            <ul className="mt-5 space-y-3 text-sm">
              {[
                "Translate every word in your head",
                "Avoid speaking when foreigners approach",
                "Memorize grammar rules you never use",
                "Watch your confidence shrink each year",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-destructive" /> {t}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/10 to-accent/10 p-6 sm:p-8 shadow-glow">
            <div className="text-xs font-bold uppercase tracking-wider text-primary">After 12 months</div>
            <h3 className="font-display text-2xl font-bold mt-2">You think and speak in English.</h3>
            <ul className="mt-5 space-y-3 text-sm">
              {[
                "Hold work meetings without fear",
                "Travel and chat with locals naturally",
                "Reply on instinct — no translation",
                "Speak with a clear, confident voice",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2"><Check className="h-4 w-4 text-success mt-0.5 shrink-0" /> {t}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="bg-muted/40 border-y border-border py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-center">Learn by speaking — every day</h2>
          <p className="text-center text-muted-foreground mt-3">Three loops that build fluency on autopilot.</p>
          <div className="mt-10 grid md:grid-cols-3 gap-5">
            {[
              { icon: Brain, title: "Pick a mission", desc: "Coffee shops, airports, interviews. Choose a real-world scenario.", color: "bg-primary/10 text-primary" },
              { icon: MessageCircle, title: "Speak with AI", desc: "Have a natural voice conversation. Get instant pronunciation feedback.", color: "bg-accent/30 text-accent-foreground" },
              { icon: Trophy, title: "Earn & level up", desc: "Unlock new worlds, keep your streak, watch your confidence grow.", color: "bg-flame/15 text-flame" },
            ].map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={i} className="rounded-3xl bg-card border border-border p-6 shadow-soft hover:-translate-y-1 transition">
                  <div className={`h-12 w-12 rounded-2xl grid place-items-center ${s.color}`}><Icon className="h-6 w-6" /></div>
                  <div className="text-xs text-muted-foreground mt-4">Step {i + 1}</div>
                  <h3 className="font-display text-xl font-bold mt-1">{s.title}</h3>
                  <p className="text-sm text-muted-foreground mt-2">{s.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Scenarios */}
      <section id="scenarios" className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="flex items-end justify-between flex-wrap gap-4">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold">Real conversations. Real worlds.</h2>
            <p className="text-muted-foreground mt-2">Practice the exact moments where English matters most.</p>
          </div>
          <Link to="/dashboard" className="text-sm font-semibold text-primary inline-flex items-center gap-1 hover:underline">
            Explore all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { emoji: "☕", t: "Coffee Shop", d: "Order, chat, charm the barista" },
            { emoji: "✈️", t: "Airport Mission", d: "Check-in, security, boarding" },
            { emoji: "💼", t: "Office Challenge", d: "Stand-ups, updates, pitches" },
            { emoji: "🎯", t: "Job Interview", d: "Behavioral, technical, salary" },
          ].map((s) => (
            <div key={s.t} className="group rounded-3xl border border-border bg-card p-5 shadow-soft hover:-translate-y-1 hover:shadow-card transition">
              <div className="text-4xl">{s.emoji}</div>
              <h3 className="font-display font-bold text-lg mt-3">{s.t}</h3>
              <p className="text-xs text-muted-foreground mt-1">{s.d}</p>
              <div className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 transition">
                Start mission <ArrowRight className="h-3 w-3" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Journey */}
      <section id="journey" className="bg-secondary text-secondary-foreground py-16 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-50" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold">
                <Globe2 className="h-3.5 w-3.5" /> Your 1-year journey
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold mt-4">A speaking adventure, not a textbook.</h2>
              <p className="opacity-80 mt-4">
                Progress through worlds. Unlock new chapters. Build a streak that becomes a habit, then a skill, then a part of who you are.
              </p>
              <div className="mt-6 grid grid-cols-3 gap-3 max-w-md">
                {[
                  { v: "Lv 1-10", l: "Daily basics" },
                  { v: "Lv 11-25", l: "Real worlds" },
                  { v: "Lv 26+", l: "Fluent flow" },
                ].map((s) => (
                  <div key={s.l} className="rounded-xl bg-white/10 p-3 text-center backdrop-blur">
                    <div className="font-display font-bold">{s.v}</div>
                    <div className="text-[10px] opacity-80 uppercase tracking-wide mt-0.5">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl bg-card/10 backdrop-blur border border-white/10 p-6">
              <div className="flex items-center justify-between text-xs">
                <span className="inline-flex items-center gap-1.5 opacity-80"><Flame className="h-3.5 w-3.5 text-flame animate-flame" /> 24-day streak</span>
                <span className="inline-flex items-center gap-1.5 opacity-80"><Zap className="h-3.5 w-3.5 text-accent" /> Level 12</span>
              </div>
              <div className="mt-4">
                <div className="text-xs opacity-80">XP to next level</div>
                <div className="mt-1 h-2.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-primary rounded-full" style={{ width: "72%" }} />
                </div>
                <div className="text-xs opacity-70 mt-1">2,840 / 3,200 XP — You're 72% closer to confident speaking.</div>
              </div>
              <div className="mt-5 rounded-2xl bg-gradient-primary p-4 shadow-glow text-primary-foreground">
                <div className="text-xs font-semibold opacity-90">Next mission</div>
                <div className="font-display font-bold text-lg mt-0.5">Airport check-in ✈️</div>
                <div className="text-xs opacity-90 mt-1">8 min · Medium · +180 XP</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-20 text-center">
        <h2 className="font-display text-3xl sm:text-5xl font-extrabold leading-tight">
          Your voice is ready.
          <br />
          <span className="bg-gradient-primary bg-clip-text text-transparent">Are you?</span>
        </h2>
        <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
          Build the confidence to speak English in any room. One mission a day. One year to fluency.
        </p>
        <Link
          to="/register"
          className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-gradient-primary px-7 py-4 text-base font-bold text-primary-foreground shadow-glow hover:scale-[1.02] transition"
        >
          <Mic className="h-5 w-5" /> Start speaking today
        </Link>
      </section>

      <footer className="border-t border-border py-8 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Fluent · Built to make you a confident speaker.
      </footer>
    </div>
  );
}
