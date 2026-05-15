import { cn } from "@/lib/utils";

export function Shimmer({ className }: { className?: string }) {
  return <div className={cn("rounded-md bg-muted animate-pulse", className)} />;
}
