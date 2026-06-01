import { createFileRoute, Link, notFound, Outlet, useLocation, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { getScenario, type Scenario } from "@/data/mock";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Languages,
  Lightbulb,
  RotateCcw,
  Volume2,
  X,
  Target,
  Sparkles,
  Gauge,
  Check,
  Circle,
} from "lucide-react";
import { MicButton, VoiceWaveform } from "@/components/mic-button";

export const Route = createFileRoute("/_app/conversations/$scenarioId")({
  head: ({ params }) => ({
    meta: [{ title: `Speaking — ${params.scenarioId} — Fluent` }],
  }),
  loader: ({ params }) => {
    const s = getScenario(params.scenarioId);
    if (!s) throw notFound();
    return s;
  },
  component: RouteComponent,
});

function RouteComponent() {
  const location = useLocation();
  if (location.pathname.replace(/\/$/, "").endsWith("/result")) {
    return <Outlet />;
  }
  return <Room />;
}

type Turn = { role: "ai" | "user"; text: string; translated?: string };

const seed: Turn[] = [
  {
    role: "ai",
    text: "Hi there! Welcome in. What can I get started for you today?",
    translated: "สวัสดี! ยินดีต้อนรับ คุณต้องการสั่งอะไรดี?",
  },
  { role: "user", text: "Hi! Could I get a large oat-milk latte to-go, please?" },
  {
    role: "ai",
    text: "Sure thing! Hot or iced? And any flavor — vanilla, caramel?",
    translated: "ได้เลย! ร้อนหรือเย็น? เพิ่มไซรัปไหม?",
  },
];

const encouragements = [
  "Nice — your rhythm is improving 🌱",
  "That sounded natural. Keep going!",
  "Confidence boost +1 ⚡",
  "Great pace — don't stop now",
  "You're doing better than you think 💚",
  "Smooth delivery. One more turn!",
];

function Room() {
  const s = Route.useLoaderData() as Scenario;
  const navigate = useNavigate();
  const [turns, setTurns] = useState<Turn[]>(seed);
  const [listening, setListening] = useState(false);
  const [aiSpeaking, setAiSpeaking] = useState(false);
  const [aiThinking, setAiThinking] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [translate, setTranslate] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [encouragement, setEncouragement] = useState<string | null>(null);
  const [slowReplay, setSlowReplay] = useState(false);
  const transcriptEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [turns, listening, transcript]);

  const celebrate = () => {
    const msg = encouragements[Math.floor(Math.random() * encouragements.length)];
    setEncouragement(msg);
    setTimeout(() => setEncouragement(null), 2200);
  };

  const toggleMic = () => {
    if (aiSpeaking) return;
    if (!listening) {
      setListening(true);
      setTranscript("");
      const sample = "Iced with vanilla, please.";
      let i = 0;
      const id = setInterval(() => {
        i++;
        setTranscript(sample.slice(0, i));
        if (i >= sample.length) clearInterval(id);
      }, 55);
    } else {
      setListening(false);
      if (transcript) {
        setTurns((t) => [...t, { role: "user", text: transcript }]);
        setTranscript("");
        celebrate();
        setAiThinking(true);
        setTimeout(() => {
          setAiThinking(false);
          setAiSpeaking(true);
          setTimeout(() => {
            setTurns((t) => [
              ...t,
              { role: "ai", text: "Perfect choice — that'll be $5.40. Have a great day!" },
            ]);
            setAiSpeaking(false);
          }, 1400);
        }, 750);
      }
    }
  };

  const useHint = (phrase: string) => {
    if (listening || aiSpeaking || aiThinking) return;
    setListening(true);
    setTranscript(phrase);
    setTimeout(() => {
      setListening(false);
      setTurns((t) => [...t, { role: "user", text: phrase }]);
      setTranscript("");
      celebrate();
      setAiThinking(true);
      setTimeout(() => {
        setAiThinking(false);
        setAiSpeaking(true);
        setTimeout(() => {
          setTurns((t) => [...t, { role: "ai", text: "Great — got it. Anything else with that?" }]);
          setAiSpeaking(false);
        }, 1400);
      }, 750);
    }, 900);
  };

  const totalTurns = Math.max(5, s.hints.length);
  const userTurns = turns.filter((t) => t.role === "user").length;
  const stepNum = Math.min(totalTurns, userTurns + 1);
  const progress = Math.min(100, (userTurns / totalTurns) * 100);
  const status: "idle" | "listening" | "speaking" | "thinking" =
    aiThinking ? "thinking" : aiSpeaking ? "speaking" : listening ? "listening" : "idle";
  // Derive sub-objectives from hints (each hint = one mini goal)
  const subObjectives = s.hints.slice(0, totalTurns);

  return (
    <div className="h-[100dvh] flex flex-col bg-gradient-immersive text-white relative overflow-hidden">
      {/* Decorative auras */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-[500px] rounded-full bg-primary/20 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-30" />

      {/* Top bar */}
      <div className="relative flex items-center justify-between px-4 sm:px-6 py-3 border-b border-white/10 backdrop-blur-md bg-black/10 pt-[max(env(safe-area-inset-top),0.75rem)]">
        <Link
          to="/conversations"
          className="inline-flex items-center gap-1 text-sm text-white/70 hover:text-white px-2 py-1 -ml-2 rounded-lg active:bg-white/10"
        >
          <ArrowLeft className="h-4 w-4" /> Exit
        </Link>
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <div className="text-2xl">{s.tutor.emoji}</div>
            <span
              className={`absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-background ${
                aiSpeaking ? "bg-accent animate-pulse" : "bg-success"
              }`}
            />
          </div>
          <div className="text-sm leading-tight hidden sm:block">
            <div className="font-semibold">{s.tutor.name}</div>
            <div className="text-xs text-white/60">
              {s.tutor.accent} · {s.title}
            </div>
          </div>
        </div>
        <button
          onClick={() => setTranslate((t) => !t)}
          className={`text-xs font-semibold inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full transition ${
            translate
              ? "bg-accent text-accent-foreground shadow-accent-glow"
              : "bg-white/10 text-white/80 hover:bg-white/20 border border-white/10"
          }`}
        >
          <Languages className="h-3.5 w-3.5" /> TH
        </button>
      </div>

      {/* Progress strip with step indicator */}
      <div className="relative px-4 sm:px-6 py-2.5 bg-black/10 backdrop-blur-md border-b border-white/5">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-3">
            <span className="text-[10px] uppercase tracking-[0.18em] font-bold text-accent shrink-0">
              Step {stepNum} / {totalTurns}
            </span>
            <div className="flex-1 flex items-center gap-1">
              {Array.from({ length: totalTurns }).map((_, i) => {
                const done = i < userTurns;
                const current = i === userTurns;
                return (
                  <span
                    key={i}
                    className={`flex-1 h-1.5 rounded-full transition-all duration-500 relative overflow-hidden ${
                      done
                        ? "bg-gradient-to-r from-accent to-primary-glow"
                        : current
                          ? "bg-white/25"
                          : "bg-white/10"
                    }`}
                  >
                    {current && <span className="absolute inset-0 animate-shimmer" />}
                  </span>
                );
              })}
            </div>
            <Gauge className="h-3.5 w-3.5 text-white/50 shrink-0" />
          </div>
          <p className="mt-1.5 text-[11px] text-white/70 truncate flex items-center gap-1.5">
            <Target className="h-3 w-3 text-accent shrink-0" />
            <span className="text-white/50">Mission:</span> {s.objective}
          </p>
        </div>
      </div>

      <div className="relative flex-1 grid lg:grid-cols-[300px_1fr] min-h-0">
        {/* Sidebar (desktop) */}
        <aside className="hidden lg:flex flex-col gap-4 p-5 border-r border-white/10 overflow-y-auto bg-black/10">
          <div className="rounded-2xl bg-white/5 border border-white/10 p-4 backdrop-blur">
            <div className="text-[11px] uppercase tracking-wider text-white/60 flex items-center gap-1.5">
              <Target className="h-3 w-3" /> Mission objective
            </div>
            <p className="text-sm mt-2 leading-relaxed">{s.objective}</p>
          </div>
          <div className="rounded-2xl bg-white/5 border border-white/10 p-4 backdrop-blur">
            <div className="text-[11px] uppercase tracking-wider text-white/60 flex items-center gap-1.5">
              <Lightbulb className="h-3 w-3" /> Tap a phrase to try
            </div>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {s.hints.map((h) => (
                <button
                  key={h}
                  onClick={() => useHint(h)}
                  disabled={listening || aiSpeaking}
                  className="text-xs px-2.5 py-1.5 rounded-full bg-primary/20 text-primary-glow font-medium border border-primary/30 hover:bg-primary/30 active:scale-95 transition disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {h}
                </button>
              ))}
            </div>
          </div>
          <div className="rounded-2xl bg-gradient-primary p-4 shadow-glow text-primary-foreground">
            <div className="text-[11px] uppercase tracking-wider opacity-90 flex items-center gap-1.5">
              <Sparkles className="h-3 w-3" /> Confidence boost
            </div>
            <p className="text-sm mt-2 font-medium">
              You don't need perfect grammar. Just keep speaking — that's how fluency builds.
            </p>
          </div>
        </aside>

        {/* Main column */}
        <div className="flex flex-col min-h-0 relative">
          {/* AI Orb stage */}
          <div className="relative pt-6 pb-2 grid place-items-center">
            <div className="relative h-28 w-28 sm:h-36 sm:w-36">
              {/* Listening pulse rings */}
              {listening && (
                <>
                  <span className="absolute inset-0 rounded-full border-2 border-accent/60 animate-listen-ring" />
                  <span
                    className="absolute inset-0 rounded-full border-2 border-accent/40 animate-listen-ring"
                    style={{ animationDelay: "0.6s" }}
                  />
                </>
              )}
              <div
                className={`absolute inset-0 rounded-full bg-gradient-hero shadow-orb ${
                  aiSpeaking ? "animate-orb" : listening ? "" : "animate-bob"
                }`}
              />
              <div className="absolute inset-0 rounded-full border border-white/20 animate-orb-spin" />
              <div className="absolute inset-0 grid place-items-center text-4xl sm:text-5xl">
                {s.tutor.emoji}
              </div>
            </div>
            <div className="mt-3 text-center min-h-[2.25rem]">
              <div
                className={`text-[11px] uppercase tracking-[0.22em] font-semibold transition-colors ${
                  status === "speaking"
                    ? "text-accent"
                    : status === "listening"
                      ? "text-primary-glow"
                      : "text-white/55"
                }`}
              >
                {status === "speaking"
                  ? "Tutor speaking"
                  : status === "listening"
                    ? "Listening… speak naturally"
                    : "Tap the mic to reply"}
              </div>
              {(aiSpeaking || listening) && (
                <div className="mt-1.5 flex justify-center">
                  <VoiceWaveform active />
                </div>
              )}
            </div>
          </div>

          {/* Encouragement toast */}
          {encouragement && (
            <div className="absolute top-44 sm:top-52 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
              <div className="animate-encourage rounded-full bg-success/90 text-success-foreground text-xs font-bold px-3.5 py-1.5 shadow-glow inline-flex items-center gap-1.5 backdrop-blur">
                <Check className="h-3.5 w-3.5" /> {encouragement}
              </div>
            </div>
          )}

          {/* Transcript */}
          <div className="flex-1 overflow-y-auto px-4 sm:px-6 pb-4">
            <div className="max-w-2xl mx-auto space-y-3">
              {turns.map((t, idx) => (
                <Bubble key={idx} turn={t} translate={translate} tutorEmoji={s.tutor.emoji} />
              ))}
              {listening && (
                <div className="flex justify-end animate-fade-in-up">
                  <div className="max-w-[85%] rounded-2xl rounded-br-md bg-primary/30 px-4 py-3 text-sm border border-primary/50 backdrop-blur shadow-glow">
                    <span className="text-white">
                      {transcript || <em className="opacity-70">listening…</em>}
                      <span className="inline-block w-0.5 h-3.5 bg-white align-middle ml-0.5 animate-caret" />
                    </span>
                  </div>
                </div>
              )}
              <div ref={transcriptEndRef} />
            </div>
          </div>

          {/* Hint sheet (toggle, mobile) */}
          {showHints && (
            <div className="px-4 sm:px-6 pb-3 animate-fade-in-up lg:hidden">
              <div className="max-w-2xl mx-auto rounded-2xl bg-white/10 border border-white/15 backdrop-blur p-3">
                <div className="text-[11px] uppercase tracking-wider text-white/70 flex items-center gap-1.5 mb-2">
                  <Lightbulb className="h-3 w-3" /> Tap to try saying
                </div>
                <div className="flex flex-wrap gap-2">
                  {s.hints.map((h) => (
                    <button
                      key={h}
                      onClick={() => {
                        useHint(h);
                        setShowHints(false);
                      }}
                      disabled={listening || aiSpeaking}
                      className="text-xs px-3 py-2 rounded-full bg-primary/25 text-white font-medium border border-primary/40 hover:bg-primary/35 active:scale-95 transition disabled:opacity-40"
                    >
                      {h}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Bottom control bar */}
          <div className="border-t border-white/10 backdrop-blur-md bg-black/30 px-4 sm:px-6 pt-3 pb-[max(env(safe-area-inset-bottom),0.75rem)]">
            <div className="max-w-2xl mx-auto">
              <div className="flex items-center justify-between gap-3 sm:gap-5">
                <IconBtn
                  label="Replay slower"
                  hint={slowReplay ? "0.75×" : undefined}
                  active={slowReplay}
                  onClick={() => setSlowReplay((v) => !v)}
                >
                  <Volume2 className="h-5 w-5" />
                </IconBtn>
                <IconBtn label="Show hints" active={showHints} onClick={() => setShowHints((v) => !v)}>
                  <Lightbulb className="h-5 w-5" />
                </IconBtn>

                <div className="relative">
                  <MicButton active={listening} onClick={toggleMic} />
                </div>

                <IconBtn label="Translate" active={translate} onClick={() => setTranslate((v) => !v)}>
                  <Languages className="h-5 w-5" />
                </IconBtn>
                <IconBtn label="Retry" onClick={() => setTurns(seed)}>
                  <RotateCcw className="h-5 w-5" />
                </IconBtn>
              </div>

              <p className="text-center text-[11px] text-white/65 mt-2.5 min-h-[1rem]">
                {listening
                  ? "Speak naturally — tap to stop"
                  : aiSpeaking
                    ? "Listen carefully…"
                    : "Take your time. Tap the mic when you're ready."}
              </p>

              <div className="mt-1 flex justify-center">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    navigate({
                      to: "/conversations/$scenarioId/result",
                      params: { scenarioId: s.id },
                    })
                  }
                  className="text-[11px] text-white/55 hover:text-white hover:bg-white/10 h-7"
                >
                  End & see results <X className="h-3 w-3 ml-1" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Bubble({
  turn,
  translate,
  tutorEmoji,
}: {
  turn: Turn;
  translate: boolean;
  tutorEmoji: string;
}) {
  const isAI = turn.role === "ai";
  return (
    <div className={`flex gap-2 animate-fade-in-up ${isAI ? "" : "flex-row-reverse"}`}>
      {isAI && <div className="text-xl shrink-0 mt-1">{tutorEmoji}</div>}
      <div
        className={`max-w-[82%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
          isAI
            ? "bg-white/10 border border-white/15 text-white backdrop-blur rounded-bl-md"
            : "bg-gradient-primary text-primary-foreground rounded-br-md shadow-glow"
        }`}
      >
        <p>{turn.text}</p>
        {translate && turn.translated && (
          <p
            className={`text-xs mt-1.5 pt-1.5 border-t ${
              isAI ? "border-white/15 text-white/70" : "border-white/30 opacity-90"
            }`}
          >
            {turn.translated}
          </p>
        )}
      </div>
    </div>
  );
}

function IconBtn({
  children,
  label,
  onClick,
  active,
  hint,
}: {
  children: React.ReactNode;
  label: string;
  onClick?: () => void;
  active?: boolean;
  hint?: string;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      title={label}
      className={`relative h-12 w-12 sm:h-13 sm:w-13 rounded-2xl grid place-items-center transition shadow-soft active:scale-95 ${
        active
          ? "bg-accent text-accent-foreground shadow-accent-glow"
          : "bg-white/10 border border-white/15 text-white/85 hover:bg-white/20 hover:text-white backdrop-blur"
      }`}
    >
      {children}
      {hint && (
        <span className="absolute -bottom-1 -right-1 text-[9px] font-bold bg-secondary text-secondary-foreground rounded-full px-1 py-0.5 leading-none">
          {hint}
        </span>
      )}
    </button>
  );
}
