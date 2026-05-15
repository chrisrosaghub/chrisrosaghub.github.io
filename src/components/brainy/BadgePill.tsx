import type { Badge } from "@/lib/brainy-data";
import { cn } from "@/lib/utils";

interface BadgePillProps {
  badge: Badge;
  earned: boolean;
}

export function BadgePill({ badge, earned }: BadgePillProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-1 rounded-2xl border-2 p-3 text-center shadow-sm transition-all",
        earned
          ? "bg-gradient-to-br from-amber-100 via-yellow-100 to-orange-100 border-amber-200"
          : "bg-muted/50 border-dashed border-muted-foreground/30 grayscale opacity-60",
      )}
      title={earned ? `${badge.name} — Earned!` : `${badge.name} — Locked`}
    >
      <div className="text-3xl" aria-hidden>{badge.emoji}</div>
      <div className="text-xs font-bold leading-tight">{badge.name}</div>
      <div className="text-[10px] text-muted-foreground leading-tight">{badge.description}</div>
    </div>
  );
}
