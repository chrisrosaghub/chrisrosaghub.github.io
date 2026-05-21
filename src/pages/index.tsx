import { Link } from "react-router-dom";
import { Star, Flame, Sparkles, ArrowRight, Trophy, CheckCircle2 } from "lucide-react";
import {
  useAllBadges,
  useDailyChallenge,
  useProgress,
  useSubjects,
  totalActivitiesForSubject,
  useLevel,
  useTotalActivitiesForSubject,
} from "@/lib/brainy-hooks";
import { SubjectCard, SubjectCardSkeleton } from "@/components/brainy/SubjectCard";
import { Shimmer } from "@/components/brainy/Shimmer";
import { BadgePill } from "@/components/brainy/BadgePill";
import { DAILY_CHALLENGE_ID, DAILY_QUESTIONS_PER_SUBJECT } from "@/lib/brainy-data";
import type { SubjectId } from "@/lib/brainy-data";

function useStarsBySubject() {
  const { data: progress } = useProgress();
  const map: Record<SubjectId, number> = { math: 0, science: 0, history: 0, geography: 0, reading: 0, states: 0, presidents: 0 };
  progress?.results.forEach((r) => {
    if (r.activityId === DAILY_CHALLENGE_ID) return;
    map[r.subjectId] += r.starsEarned;
  });
  return map;
}

function useCompletedBySubject() {
  const { data: progress } = useProgress();
  const map: Record<SubjectId, Set<string>> = {
    math: new Set(),
    science: new Set(),
    history: new Set(),
    geography: new Set(),
    reading: new Set(),
    states: new Set(),
    presidents: new Set(),
  };
  progress?.results.forEach((r) => {
    if (r.activityId === DAILY_CHALLENGE_ID) return;
    map[r.subjectId].add(r.activityId);
  });
  return map;
}

export default function HomePage() {
  useLevel(); // subscribe to level changes so this view re-renders
  const { data: subjects, isLoading: subjectsLoading } = useSubjects();
  const { data: progress } = useProgress();
  const { data: daily, isLoading: dailyLoading } = useDailyChallenge();
  const { data: badges } = useAllBadges();
  const starsBySubject = useStarsBySubject();
  const completedBySubject = useCompletedBySubject();

  const totalStars = progress?.totalStars ?? 0;
  const streak = progress?.streakDays ?? 0;
  const dailyDone = daily?.completedToday ?? false;
  const dailyTotal = daily?.activity.questions.length ?? DAILY_QUESTIONS_PER_SUBJECT * 4;

  const earnedBadges = (badges ?? []).filter((b) => progress?.earnedBadgeIds.includes(b.id));

  return (
    <div className="space-y-8">
      {/* Hero */}
      <section
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-orange-400 text-white shadow-lg p-6 md:p-10"
      >
        <div className="absolute -right-10 -top-10 text-[10rem] opacity-20 select-none" aria-hidden>
          🌟
        </div>
        <div className="relative max-w-2xl space-y-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-bold uppercase tracking-wide ring-1 ring-white/30">
            <Sparkles className="size-3.5" /> Hi there, super learner!
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight drop-shadow">
            Ready for today’s adventure?
          </h1>
          <p className="text-base md:text-lg text-white/90 max-w-xl">
            Pick a subject below, answer fun questions, and collect stars. The more you practice, the bigger your streak grows!
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white text-amber-700 px-3 py-1.5 text-sm font-bold shadow">
              <Star className="size-4 fill-amber-400 text-amber-500" />
              {totalStars} stars
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white text-orange-700 px-3 py-1.5 text-sm font-bold shadow">
              <Flame className="size-4 text-orange-500" />
              {streak}-day streak
            </span>
            {!dailyDone && (
              <Link
                to="/daily"
                className="inline-flex items-center gap-2 rounded-full bg-slate-900 hover:bg-slate-800 px-4 py-2 text-sm font-bold shadow transition-colors"
              >
                Start Daily Challenge <ArrowRight className="size-4" />
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Subjects */}
      <section>
        <div className="flex items-end justify-between mb-3">
          <h2 className="text-xl md:text-2xl font-extrabold tracking-tight">Pick a Subject</h2>
          <Link to="/progress" className="text-sm font-semibold text-primary hover:underline inline-flex items-center gap-1">
            See my progress <ArrowRight className="size-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {subjectsLoading || !subjects
            ? Array.from({ length: 4 }).map((_, i) => <SubjectCardSkeleton key={i} />)
            : subjects.map((s) => (
              <SubjectCard
                key={s.id}
                subject={s}
                completed={completedBySubject[s.id].size}
                total={totalActivitiesForSubject(s.id)}
                stars={starsBySubject[s.id]}
              />
            ))}
        </div>
      </section>

      {/* Daily challenge + Recent badges */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 relative overflow-hidden rounded-3xl border-2 border-white/60 shadow-md p-5 md:p-6 bg-gradient-to-br from-amber-300 via-orange-300 to-fuchsia-300">
          <div className="absolute -right-4 -bottom-6 text-[8rem] leading-none opacity-25 select-none" aria-hidden>
            🏆
          </div>
          <div className="relative">
            <div className="flex items-center gap-2 mb-2">
              <Trophy className="size-5 text-amber-700" />
              <h3 className="text-lg font-extrabold text-slate-900">Today’s Daily Challenge</h3>
            </div>
            {dailyLoading || !daily ? (
              <div className="space-y-2">
                <Shimmer className="h-6 w-1/2 bg-white/60" />
                <Shimmer className="h-4 w-3/4 bg-white/60" />
                <Shimmer className="h-10 w-40 bg-white/60" />
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-sm md:text-base text-slate-900/85 font-medium max-w-xl">
                  {DAILY_QUESTIONS_PER_SUBJECT} questions from each subject — {dailyTotal} questions in all.
                  Earn a +5 star bonus for completing it!
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  {dailyDone ? (
                    <span className="inline-flex items-center gap-2 rounded-full bg-white text-emerald-700 px-3 py-1.5 text-sm font-bold shadow">
                      <CheckCircle2 className="size-4" /> Done for today — nice work!
                    </span>
                  ) : (
                    <Link
                      to={`/activity/${DAILY_CHALLENGE_ID}`}
                      className="inline-flex items-center gap-2 rounded-full bg-slate-900 text-white hover:bg-slate-800 px-4 py-2 text-sm font-bold shadow transition-colors"
                    >
                      Let’s go! <ArrowRight className="size-4" />
                    </Link>
                  )}
                  <Link
                    to="/daily"
                    className="inline-flex items-center gap-2 rounded-full bg-white/85 text-slate-900 hover:bg-white px-4 py-2 text-sm font-bold shadow transition-colors"
                  >
                    Learn more
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="rounded-3xl border-2 border-white/60 bg-white/80 backdrop-blur shadow-md p-5 md:p-6">
          <div className="flex items-center gap-2 mb-3">
            <Trophy className="size-5 text-amber-500" />
            <h3 className="text-lg font-extrabold">Recent Badges</h3>
          </div>
          {!badges ? (
            <div className="grid grid-cols-3 gap-2">
              {Array.from({ length: 3 }).map((_, i) => <Shimmer key={i} className="h-20" />)}
            </div>
          ) : earnedBadges.length === 0 ? (
            <div className="text-sm text-muted-foreground">
              Complete activities to earn your first badge! 🎉
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {earnedBadges.slice(0, 6).map((b) => <BadgePill key={b.id} badge={b} earned />)}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
