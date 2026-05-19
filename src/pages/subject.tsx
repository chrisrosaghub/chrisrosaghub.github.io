import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Star } from "lucide-react";
import {
  useActivities,
  useCompletedActivityIds,
  useProgress,
  useSubject,
  totalActivitiesForSubject,
  useLevel,
  useTotalActivitiesForSubject,
} from "@/lib/brainy-hooks";
import { DAILY_CHALLENGE_ID, QUESTIONS_PER_ROUND, type SubjectId } from "@/lib/brainy-data";
import { Shimmer } from "@/components/brainy/Shimmer";
import { cn } from "@/lib/utils";

interface SubjectPageProps {
  subjectId: SubjectId;
}

export default function SubjectPage({ subjectId }: SubjectPageProps) {
  useLevel(); // subscribe to level changes
  const { data: subject } = useSubject(subjectId);
  const { data: activities, isLoading } = useActivities(subjectId);
  const { data: progress } = useProgress();
  const completedIds = useCompletedActivityIds();

  const total = totalActivitiesForSubject(subjectId);
  const done = activities?.filter((a) => completedIds.has(a.id)).length ?? 0;
  const subjectStars =
    progress?.results
      .filter((r) => r.subjectId === subjectId && r.activityId !== DAILY_CHALLENGE_ID)
      .reduce((s, r) => s + r.starsEarned, 0) ?? 0;

  return (
    <div className="space-y-6">
      <header
        className={cn(
          "relative overflow-hidden rounded-3xl border-2 border-white/60 shadow-md p-6 md:p-8 bg-gradient-to-br",
          subject?.gradientClass ?? "from-slate-200 to-slate-300",
        )}
      >
        <div className="absolute -right-6 -bottom-10 text-[12rem] leading-none opacity-25 select-none" aria-hidden>
          {subject?.emoji}
        </div>
        <div className="relative">
          {subject ? (
            <>
              <div className="flex items-center gap-3">
                <span className="text-5xl drop-shadow-sm" aria-hidden>{subject.emoji}</span>
                <div>
                  <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight text-slate-900">{subject.name}</h1>
                  <div className="text-sm md:text-base text-slate-900/80 font-medium">with {subject.mascot} — {subject.tagline}</div>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-3 mt-4">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/85 text-slate-900 px-3 py-1.5 text-sm font-bold shadow">
                  <CheckCircle2 className="size-4 text-emerald-600" />
                  {done} / {total} activities
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/85 text-amber-700 px-3 py-1.5 text-sm font-bold shadow">
                  <Star className="size-4 fill-amber-400 text-amber-500" />
                  {subjectStars} stars
                </span>
              </div>
            </>
          ) : (
            <div className="space-y-2">
              <Shimmer className="h-8 w-1/3 bg-white/60" />
              <Shimmer className="h-4 w-1/2 bg-white/60" />
            </div>
          )}
        </div>
      </header>

      <section>
        <h2 className="text-lg md:text-xl font-extrabold mb-3">Choose an activity</h2>
        {isLoading || !activities ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <Shimmer key={i} className="h-36" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {activities.map((a) => {
              const isDone = completedIds.has(a.id);
              const result = progress?.results.find((r) => r.activityId === a.id);
              return (
                <Link
                  key={a.id}
                  to={`/activity/${a.id}`}
                  className={cn(
                    "group rounded-2xl border-2 bg-white p-4 md:p-5 shadow-sm transition-all",
                    "hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30",
                    isDone ? "border-emerald-200" : "border-white/70",
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={cn(
                        "text-3xl size-12 inline-flex items-center justify-center rounded-2xl",
                        subject?.bgSoftClass ?? "bg-muted",
                      )}
                      aria-hidden
                    >
                      {a.emoji}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold">{a.title}</h3>
                        {isDone && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 text-emerald-700 px-2 py-0.5 text-[10px] font-bold">
                            <CheckCircle2 className="size-3" /> Done
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{a.description}</p>
                      <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                        <span>{a.questionsPerRound ?? QUESTIONS_PER_ROUND} questions per round</span>
                        {result ? (
                          <span className="inline-flex items-center gap-1 text-amber-700 font-bold">
                            <Star className="size-3.5 fill-amber-400 text-amber-500" />
                            {result.starsEarned}
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-primary font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                            Start <ArrowRight className="size-3.5" />
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
