export function ScoreRing({
  score,
  label,
  color = "primary",
  size = 110,
}: {
  score: number;
  label: string;
  color?: "primary" | "accent" | "success" | "destructive";
  size?: number;
}) {
  const r = size / 2 - 8;
  const c = 2 * Math.PI * r;
  const offset = c - (score / 100) * c;
  const colorVar =
    color === "accent"
      ? "var(--color-accent)"
      : color === "success"
        ? "var(--color-success)"
        : color === "destructive"
          ? "var(--color-destructive)"
          : "var(--color-primary)";

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            stroke="var(--color-muted)"
            strokeWidth="8"
            fill="none"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            stroke={colorVar}
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 1.1s cubic-bezier(0.2,0.9,0.3,1)" }}
          />
        </svg>
        <div className="absolute inset-0 grid place-items-center">
          <div className="text-center">
            <div className="font-display text-2xl font-bold">{score}</div>
            <div className="text-[10px] text-muted-foreground uppercase tracking-wide">/ 100</div>
          </div>
        </div>
      </div>
      <div className="text-sm font-medium text-muted-foreground">{label}</div>
    </div>
  );
}
