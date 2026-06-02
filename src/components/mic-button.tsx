import { Mic, Square } from "lucide-react";
import { cn } from "@/lib/utils";

export function MicButton({
  active,
  processing = false,
  onClick,
  size = "lg",
}: {
  active: boolean;
  processing?: boolean;
  onClick?: () => void;
  size?: "md" | "lg";
}) {
  const dim = size === "lg" ? "h-20 w-20" : "h-14 w-14";
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={processing}
      aria-label={active ? "Stop recording" : "Start recording"}
      className={cn(
        "relative rounded-full grid place-items-center transition-all",
        dim,
        active
          ? "bg-destructive text-destructive-foreground animate-mic-pulse"
          : processing
            ? "bg-primary/70 text-primary-foreground shadow-glow"
            : "bg-gradient-primary text-primary-foreground shadow-glow hover:scale-105 animate-bob",
      )}
    >
      {/* Idle subtle glow */}
      {!active && !processing && (
        <span className="absolute -inset-1 rounded-full bg-primary/30 blur-xl -z-10" />
      )}
      {/* Listening expanding rings */}
      {active && (
        <>
          <span className="absolute inset-0 rounded-full border-2 border-destructive/60 animate-listen-ring" />
          <span
            className="absolute inset-0 rounded-full border-2 border-destructive/35 animate-listen-ring"
            style={{ animationDelay: "0.5s" }}
          />
        </>
      )}
      {/* Processing rotating ring */}
      {processing && (
        <span className="absolute -inset-1 rounded-full border-2 border-primary-glow/50 border-t-primary-glow animate-orb-spin" />
      )}
      {active ? (
        <Square className="h-7 w-7 relative" fill="currentColor" />
      ) : (
        <Mic className="h-8 w-8 relative" />
      )}
    </button>
  );
}

export function VoiceWaveform({ active = true }: { active?: boolean }) {
  return (
    <div className="flex items-center gap-1 h-6">
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <span
          key={i}
          className={cn(
            "w-1 rounded-full bg-primary",
            active ? "animate-wave" : "",
            "h-full",
          )}
          style={{ animationDelay: `${i * 0.12}s` }}
        />
      ))}
    </div>
  );
}
