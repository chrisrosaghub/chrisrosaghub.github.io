import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Sparkles, Star, Trophy } from "lucide-react";
import { useDailyChallenge, useProgress, useSubjects } from "@/lib/brainy-hooks";
import { Shimmer } from "@/components/brainy/Shimmer";
import { DAILY_CHALLENGE_ID, DAILY_QUESTIONS_PER_SUBJECT } from "@/lib/brainy-data";

export default function DailyChallengePage() {
  const { data: daily, isLoading } = useDailyChallenge();
  const { data: subjects } = useSubjects();
  const { data: progress } = useProgress();

  const completedToday = daily?.completedToday ?? false;
  const totalQuestions = daily?.activity.questions.length ?? 0;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-400 via-orange-400 to-fuchsia-500 text-white shadow-lg p-6 md:p-10">
        <div className="absolute -right-10 -top-10 text-[10rem] opacity-25 select-none" aria-hidden>
          🏆
        </div>
        <div className="relative max-w-2xl space-y-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-bold uppercase tracking-wide ring-1 ring-white/30">
            <Sparkles className="size-3.5" /> Today’s Daily Challenge
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight drop-shadow">
            One challenge. Four subjects. Big stars!
          </h1>
          <p className="text-base md:text-lg text-white/90 max-w-xl">
            Answer <strong>{DAILY_QUESTIONS_PER_SUBJECT} questions</strong> from each subject —
            {" "}{totalQuestions || DAILY_QUESTIONS_PER_SUBJECT * 4} fun questions in all. Finish to
            earn a big bonus and keep your streak going!
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-2">
            {completedToday ? (
              <span className="inline-flex items-center gap-2 rounded-full bg-white text-emerald-700 px-4 py-2 text-sm font-bold shadow">
                <CheckCircle2 className="size-4" /> You finished today’s challenge!
              </span>
            ) : isLoading || !daily ? (
              <Shimmer className="h-10 w-44 bg-white/40" />
            ) : (
              <Link
                to={`/activity/${DAILY_CHALLENGE_ID}`}
                className="inline-flex items-center gap-2 rounded-full bg-slate-900 hover:bg-slate-800 px-5 py-2.5 text-sm md:text-base font-bold shadow transition-colors"
              >
                Start the Daily Challenge <ArrowRight className="size-4" />
              </Link>
            )}
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white text-amber-700 px-3 py-1.5 text-sm font-bold shadow">
              <Star className="size-4 fill-amber-400 text-amber-500" />
              +5 bonus stars
            </span>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {!subjects
          ? Array.from({ length: 4 }).map((_, i) => <Shimmer key={i} className="h-28 rounded-2xl" />)
          : subjects.map((s) => (
              <div
                key={s.id}
                className={`rounded-2xl border-2 border-white/60 bg-gradient-to-br ${s.gradientClass} shadow-sm p-4`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-3xl" aria-hidden>{s.emoji}</span>
                  <div>
                    <div className="font-extrabold text-slate-900">{s.name}</div>
                    <div className="text-xs font-semibold text-slate-900/80">
                      {DAILY_QUESTIONS_PER_SUBJECT} questions today
                    </div>
                  </div>
                </div>
              </div>
            ))}
      </section>

      <section className="rounded-3xl border-2 border-white/60 bg-white/80 backdrop-blur shadow-md p-5 md:p-6">
        <div className="flex items-center gap-2 mb-3">
          <Trophy className="size-5 text-amber-500" />
          <h2 className="text-lg font-extrabold">How it works</h2>
        </div>
        <ul className="text-sm md:text-base text-muted-foreground space-y-2 list-disc pl-5">
          <li>You’ll see {DAILY_QUESTIONS_PER_SUBJECT} questions from each subject — mixed up for extra fun.</li>
          <li>Earn 1 base star, +1 for each correct answer, and +5 for finishing the daily challenge.</li>
          <li>A new challenge unlocks every day. Come back tomorrow for fresh questions!</li>
          <li>Completed so far: <strong>{progress?.dailyChallengesCompleted ?? 0}</strong> daily challenges.</li>
        </ul>
      </section>
    </div>
  );
}
