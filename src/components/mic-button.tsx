import { Mic, Square } from "lucide-react";
import { cn } from "@/lib/utils";

export function MicButton({
  active,
  onClick,
  size = "lg",
}: {
  active: boolean;
  onClick?: () => void;
  size?: "md" | "lg";
}) {
  const dim = size === "lg" ? "h-20 w-20" : "h-14 w-14";
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={active ? "Stop recording" : "Start recording"}
      className={cn(
        "relative rounded-full grid place-items-center transition-all",
        dim,
        active
          ? "bg-destructive text-destructive-foreground animate-mic-pulse"
          : "bg-gradient-primary text-primary-foreground shadow-glow hover:scale-105"
      )}
    >
      {active ? <Square className="h-7 w-7" fill="currentColor" /> : <Mic className="h-8 w-8" />}
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
            "h-full"
          )}
          style={{ animationDelay: `${i * 0.12}s` }}
        />
      ))}
    </div>
  );
}
