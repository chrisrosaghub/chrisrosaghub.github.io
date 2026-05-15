import { Link } from "react-router-dom";
import { ArrowRight, Star } from "lucide-react";
import type { Subject } from "@/lib/brainy-data";
import { cn } from "@/lib/utils";

interface SubjectCardProps {
  subject: Subject;
  completed: number;
  total: number;
  stars: number;
}

export function SubjectCard({ subject, completed, total, stars }: SubjectCardProps) {
  const pct = total === 0 ? 0 : Math.round((completed / total) * 100);
  return (
    <Link
      to={`/${subject.id}`}
      className={cn(
        "group relative block overflow-hidden rounded-3xl border-2 border-white/60 shadow-md transition-all",
        "hover:-translate-y-1 hover:shadow-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30",
        "bg-gradient-to-br",
        subject.gradientClass,
      )}
      aria-label={`Open ${subject.name} activities`}
    >
      <div className="absolute -right-6 -bottom-6 text-[8rem] leading-none opacity-25 transition-transform group-hover:scale-110 group-hover:rotate-6 select-none" aria-hidden>
        {subject.emoji}
      </div>
      <div className="relative p-5 md:p-6 flex flex-col gap-4 min-h-[180px]">
        <div className="flex items-center gap-3">
          <span className="text-4xl drop-shadow-sm" aria-hidden>{subject.emoji}</span>
          <div>
            <div className="text-xl md:text-2xl font-extrabold text-slate-900">{subject.name}</div>
            <div className="text-sm font-medium text-slate-800/80">with {subject.mascot}</div>
          </div>
        </div>
        <p className="text-sm md:text-base text-slate-900/80 font-medium">{subject.tagline}</p>
        <div className="mt-auto flex items-center justify-between gap-3">
          <div className="flex-1">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-900/80 mb-1">
              <span>{completed} / {total} done</span>
              <span>{pct}%</span>
            </div>
            <div className="h-2 rounded-full bg-white/60 overflow-hidden">
              <div
                className="h-full rounded-full bg-white shadow-inner transition-[width] duration-500"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full bg-white/80 px-2.5 py-1 text-xs font-bold text-amber-700 shadow-sm">
            <Star className="size-3.5 fill-amber-400 text-amber-500" />
            {stars}
          </span>
          <span className="inline-flex items-center justify-center rounded-full bg-white text-slate-900 size-9 shadow group-hover:translate-x-1 transition-transform">
            <ArrowRight className="size-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}

export function SubjectCardSkeleton() {
  return (
    <div className="rounded-3xl border-2 border-white/60 bg-white/60 shadow-md p-5 md:p-6 min-h-[180px] flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <div className="size-12 rounded-full bg-muted animate-pulse" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-1/3 rounded bg-muted animate-pulse" />
          <div className="h-3 w-1/2 rounded bg-muted animate-pulse" />
        </div>
      </div>
      <div className="h-3 w-2/3 rounded bg-muted animate-pulse" />
      <div className="mt-auto h-2 w-full rounded-full bg-muted animate-pulse" />
    </div>
  );
}
