import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { getScenario } from "@/data/mock";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Languages, Lightbulb, RotateCcw, Volume2, X } from "lucide-react";
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
  component: Room,
});

type Turn = { role: "ai" | "user"; text: string; translated?: string };

const seed: Turn[] = [
  { role: "ai", text: "Hi there! Welcome in. What can I get started for you today?", translated: "สวัสดี! ยินดีต้อนรับ คุณต้องการสั่งอะไรดี?" },
  { role: "user", text: "Hi! Could I get a large oat-milk latte to-go, please?" },
  { role: "ai", text: "Sure thing! Hot or iced? And any flavor — vanilla, caramel?", translated: "ได้เลย! ร้อนหรือเย็น? เพิ่มไซรัปไหม?" },
];

function Room() {
  const s = Route.useLoaderData();
  const navigate = useNavigate();
  const [turns, setTurns] = useState<Turn[]>(seed);
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [translate, setTranslate] = useState(false);

  const toggleMic = () => {
    if (!listening) {
      setListening(true);
      setTranscript("");
      // simulate streaming transcript
      const sample = "Iced with vanilla, please.";
      let i = 0;
      const id = setInterval(() => {
        i++;
        setTranscript(sample.slice(0, i));
        if (i >= sample.length) clearInterval(id);
      }, 60);
    } else {
      setListening(false);
      if (transcript) {
        setTurns((t) => [...t, { role: "user", text: transcript }]);
        setTranscript("");
        setTimeout(() => {
          setTurns((t) => [...t, { role: "ai", text: "Perfect choice — that'll be $5.40. Have a great day!" }]);
        }, 800);
      }
    }
  };

  const progress = Math.min(100, (turns.filter((t) => t.role === "user").length / 5) * 100);

  return (
    <div className="h-[calc(100vh-3.5rem)] md:h-screen flex flex-col bg-gradient-to-b from-background to-muted/30">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-border bg-background/80 backdrop-blur">
        <Link to="/conversations" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Exit
        </Link>
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-2">
            <div className="text-2xl">{s.tutor.emoji}</div>
            <div className="text-sm leading-tight">
              <div className="font-semibold">{s.tutor.name}</div>
              <div className="text-xs text-muted-foreground">{s.tutor.accent} · {s.title}</div>
            </div>
          </div>
        </div>
        <button
          onClick={() => setTranslate((t) => !t)}
          className={`text-xs font-semibold inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full ${translate ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
        >
          <Languages className="h-3.5 w-3.5" /> TH
        </button>
      </div>

      {/* Progress strip */}
      <div className="h-1 bg-muted">
        <div className="h-full bg-gradient-primary transition-all duration-500" style={{ width: `${progress}%` }} />
      </div>

      <div className="flex-1 grid lg:grid-cols-[280px_1fr] min-h-0">
        {/* Left sidebar */}
        <aside className="hidden lg:flex flex-col gap-4 p-5 border-r border-border bg-card/40 overflow-y-auto">
          <div className="rounded-2xl bg-card border border-border p-4 shadow-soft">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Objective</div>
            <p className="text-sm mt-2">{s.objective}</p>
          </div>
          <div className="rounded-2xl bg-card border border-border p-4 shadow-soft">
            <div className="text-xs uppercase tracking-wider text-muted-foreground flex items-center gap-1">
              <Lightbulb className="h-3 w-3" /> Useful phrases
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {s.hints.map((h) => (
                <span key={h} className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary font-medium">
                  {h}
                </span>
              ))}
            </div>
          </div>
          <div className="rounded-2xl bg-card border border-border p-4 shadow-soft">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Progress</div>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="font-display text-2xl font-bold">{turns.filter((t) => t.role === "user").length}</span>
              <span className="text-sm text-muted-foreground">/ 5 turns</span>
            </div>
            <div className="mt-2 h-1.5 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-gradient-primary" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </aside>

        {/* Main conversation */}
        <div className="flex flex-col min-h-0">
          <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 space-y-4">
            <div className="max-w-2xl mx-auto space-y-4">
              {turns.map((t, idx) => (
                <Bubble key={idx} turn={t} translate={translate} tutorEmoji={s.tutor.emoji} />
              ))}
              {listening && (
                <div className="flex justify-end">
                  <div className="max-w-[80%] rounded-2xl rounded-br-md bg-primary/20 px-4 py-3 text-sm border border-primary/30">
                    <span className="text-muted-foreground italic">{transcript || "listening..."}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Bottom control bar */}
          <div className="border-t border-border bg-background/95 backdrop-blur px-4 sm:px-6 py-4 sm:py-5">
            <div className="max-w-2xl mx-auto">
              {listening && (
                <div className="flex items-center gap-3 mb-3 justify-center">
                  <VoiceWaveform />
                  <span className="text-sm text-muted-foreground">Listening...</span>
                </div>
              )}
              <div className="flex items-center justify-center gap-4 sm:gap-6">
                <IconBtn label="Replay AI">
                  <Volume2 className="h-5 w-5" />
                </IconBtn>
                <MicButton active={listening} onClick={toggleMic} />
                <IconBtn label="Retry" onClick={() => setTurns(seed)}>
                  <RotateCcw className="h-5 w-5" />
                </IconBtn>
              </div>
              <p className="text-center text-xs text-muted-foreground mt-3">
                {listening ? "Speak naturally — tap to stop" : "Tap the mic to speak"}
              </p>
              <div className="mt-3 flex justify-center">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate({ to: "/conversations/$scenarioId/result", params: { scenarioId: s.id } })}
                  className="text-xs text-muted-foreground"
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

function Bubble({ turn, translate, tutorEmoji }: { turn: Turn; translate: boolean; tutorEmoji: string }) {
  const isAI = turn.role === "ai";
  return (
    <div className={`flex gap-2 ${isAI ? "" : "flex-row-reverse"}`}>
      {isAI && <div className="text-2xl shrink-0 mt-1">{tutorEmoji}</div>}
      <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${isAI ? "bg-card border border-border shadow-soft rounded-bl-md" : "bg-gradient-primary text-primary-foreground rounded-br-md shadow-soft"}`}>
        <p>{turn.text}</p>
        {translate && turn.translated && (
          <p className={`text-xs mt-1.5 pt-1.5 border-t ${isAI ? "border-border text-muted-foreground" : "border-white/20 opacity-80"}`}>
            {turn.translated}
          </p>
        )}
      </div>
    </div>
  );
}

function IconBtn({ children, label, onClick }: { children: React.ReactNode; label: string; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className="h-12 w-12 rounded-full bg-card border border-border grid place-items-center text-muted-foreground hover:text-foreground hover:border-primary/40 transition shadow-soft"
    >
      {children}
    </button>
  );
}
