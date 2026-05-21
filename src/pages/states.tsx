import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, CheckCircle2, Star, Zap } from "lucide-react";
import {
    useActivities,
    useCompletedActivityIds,
    useProgress,
    useSubject,
    totalActivitiesForSubject,
    useLevel,
} from "@/lib/brainy-hooks";
import { DAILY_CHALLENGE_ID, QUESTIONS_PER_ROUND } from "@/lib/brainy-data";
import { LEARN_GROUPS } from "@/lib/brainy-data-states";
import { Shimmer } from "@/components/brainy/Shimmer";
import { cn } from "@/lib/utils";

export default function StatesPage() {
    useLevel(); // subscribe so view re-renders on level change
    const { data: subject } = useSubject("states");
    const { data: activities, isLoading } = useActivities("states");
    const { data: progress } = useProgress();
    const completedIds = useCompletedActivityIds();

    const total = totalActivitiesForSubject("states");
    const done = activities?.filter((a) => completedIds.has(a.id)).length ?? 0;
    const subjectStars =
        progress?.results
            .filter((r) => r.subjectId === "states" && r.activityId !== DAILY_CHALLENGE_ID)
            .reduce((s, r) => s + r.starsEarned, 0) ?? 0;

    return (
        <div className="space-y-6">
            {/* Subject header */}
            <header
                className={cn(
                    "relative overflow-hidden rounded-3xl border-2 border-white/60 shadow-md p-6 md:p-8 bg-gradient-to-br",
                    subject?.gradientClass ?? "from-slate-200 to-slate-300",
                )}
            >
                <div
                    className="absolute -right-6 -bottom-10 text-[12rem] leading-none opacity-25 select-none"
                    aria-hidden
                >
                    {subject?.emoji}
                </div>
                <div className="relative">
                    {subject ? (
                        <>
                            <div className="flex items-center gap-3">
                                <span className="text-5xl drop-shadow-sm" aria-hidden>
                                    {subject.emoji}
                                </span>
                                <div>
                                    <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight text-slate-900">
                                        {subject.name}
                                    </h1>
                                    <div className="text-sm md:text-base text-slate-900/80 font-medium">
                                        with {subject.mascot} — {subject.tagline}
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-wrap items-center gap-3 mt-4">
                                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/85 text-slate-900 px-3 py-1.5 text-sm font-bold shadow">
                                    <CheckCircle2 className="size-4 text-emerald-600" />
                                    {done} / {total} quizzes done
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

            {/* ── Learn First ─────────────────────────────────────────────────── */}
            <section>
                <div className="flex items-center gap-2 mb-1">
                    <BookOpen className="size-5 text-primary" />
                    <h2 className="text-lg md:text-xl font-extrabold">Learn First</h2>
                    <span className="rounded-full bg-primary/10 text-primary px-2 py-0.5 text-[11px] font-bold">
                        Recommended
                    </span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                    Study state &amp; capital pairs as flashcards, then jump straight to the quiz
                    when you're ready.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {LEARN_GROUPS.map((g) => (
                        <Link
                            key={g.id}
                            to={`/states/learn/${g.id}`}
                            className="group flex items-center gap-3 rounded-2xl border-2 border-primary/10 bg-primary/5 hover:bg-primary/10 p-4 transition-all hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30"
                        >
                            <span className="text-3xl select-none" aria-hidden>
                                {g.emoji}
                            </span>
                            <div className="flex-1 min-w-0">
                                <div className="font-bold text-sm truncate">{g.title}</div>
                                <div className="text-xs text-muted-foreground truncate">{g.description}</div>
                            </div>
                            <span className="shrink-0 inline-flex items-center gap-1 rounded-full border border-primary/20 bg-white px-2.5 py-1 text-xs font-semibold text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                <BookOpen className="size-3" /> Study
                            </span>
                        </Link>
                    ))}
                </div>
            </section>

            {/* ── Quiz Activities ─────────────────────────────────────────────── */}
            <section>
                <div className="flex items-center gap-2 mb-3">
                    <Zap className="size-5 text-amber-500" />
                    <h2 className="text-lg md:text-xl font-extrabold">Quiz Activities</h2>
                </div>
                {isLoading || !activities ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <Shimmer key={i} className="h-36" />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {activities.map((a) => {
                            const isDone = completedIds.has(a.id);
                            const result = progress?.results.find((r) => r.activityId === a.id);
                            // Find the matching learn group for this activity
                            const learnGroup = LEARN_GROUPS.find((g) => g.quizActivityId === a.id);
                            return (
                                <div key={a.id} className="flex flex-col gap-2">
                                    <Link
                                        to={`/activity/${a.id}`}
                                        className={cn(
                                            "group rounded-2xl border-2 bg-white p-4 md:p-5 shadow-sm transition-all flex-1",
                                            "hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30",
                                            isDone ? "border-emerald-200" : "border-white/70",
                                        )}
                                    >
                                        <div className="flex items-start gap-3">
                                            <div
                                                className={cn(
                                                    "text-3xl size-12 inline-flex items-center justify-center rounded-2xl shrink-0",
                                                    subject?.bgSoftClass ?? "bg-muted",
                                                )}
                                                aria-hidden
                                            >
                                                {a.emoji}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    <h3 className="font-bold">{a.title}</h3>
                                                    {isDone && (
                                                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 text-emerald-700 px-2 py-0.5 text-[10px] font-bold shrink-0">
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

                                    {/* Study first hint if not yet done */}
                                    {!isDone && learnGroup && (
                                        <Link
                                            to={`/states/learn/${learnGroup.id}`}
                                            className="text-center text-[11px] text-muted-foreground hover:text-primary transition-colors underline-offset-4 hover:underline py-0.5"
                                        >
                                            📚 Study {learnGroup.title} first →
                                        </Link>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </section>
        </div>
    );
}
