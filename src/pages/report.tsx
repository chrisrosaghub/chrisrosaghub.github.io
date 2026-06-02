import { useMemo } from "react";
import { Link } from "react-router-dom";
import { Star, Flame, Trophy, TrendingUp, Sparkles, ChevronRight, CalendarDays, CheckCircle2 } from "lucide-react";
import { useProgress, useAllBadges, useLevel } from "@/lib/brainy-hooks";
import { useActiveProfile } from "@/lib/profiles";
import { SUBJECTS, ACTIVITIES, DAILY_CHALLENGE_ID, type SubjectId } from "@/lib/brainy-data";
import { Shimmer } from "@/components/brainy/Shimmer";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface SubjectStat {
  subjectId: SubjectId;
  name: string;
  emoji: string;
  bgSoftClass: string;
  textClass: string;
  gradientClass: string;
  activitiesDone: number;
  starsEarned: number;
  totalCorrect: number;
  totalAnswered: number;
  accuracy: number; // 0–100
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
const ONE_WEEK_MS = 7 * 24 * 60 * 60 * 1000;

function weekRange(): { start: Date; end: Date } {
  const end = new Date();
  const start = new Date(Date.now() - ONE_WEEK_MS);
  return { start, end };
}

function formatDate(d: Date) {
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function accuracyLabel(pct: number): string {
  if (pct >= 90) return "Excellent!";
  if (pct >= 75) return "Great job!";
  if (pct >= 60) return "Good work";
  return "Keep going!";
}

function accuracyColor(pct: number): string {
  if (pct >= 90) return "text-emerald-600";
  if (pct >= 75) return "text-sky-600";
  if (pct >= 60) return "text-amber-600";
  return "text-rose-600";
}

function accuracyBarColor(pct: number): string {
  if (pct >= 90) return "bg-emerald-400";
  if (pct >= 75) return "bg-sky-400";
  if (pct >= 60) return "bg-amber-400";
  return "bg-rose-400";
}

function activityTitle(activityId: string): string {
  return ACTIVITIES.find((a) => a.id === activityId)?.title ?? activityId;
}

function activityEmoji(activityId: string): string {
  return ACTIVITIES.find((a) => a.id === activityId)?.emoji ?? "📚";
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default function WeeklyReportPage() {
  const { data: progress, isLoading } = useProgress();
  const { data: allBadges } = useAllBadges();
  const profile = useActiveProfile();
  const level = useLevel();
  const { start, end } = weekRange();

  // Compute per-subject stats for the past 7 days
  const subjectStats = useMemo<SubjectStat[]>(() => {
    if (!progress) return [];

    const cutoff = Date.now() - ONE_WEEK_MS;
    const weekResults = progress.results.filter(
      (r) => r.completedAt >= cutoff && r.activityId !== DAILY_CHALLENGE_ID,
    );

    const statsMap = new Map<SubjectId, Omit<SubjectStat, "subjectId" | "name" | "emoji" | "bgSoftClass" | "textClass" | "gradientClass" | "accuracy">>();

    for (const r of weekResults) {
      const existing = statsMap.get(r.subjectId) ?? { activitiesDone: 0, starsEarned: 0, totalCorrect: 0, totalAnswered: 0 };
      statsMap.set(r.subjectId, {
        activitiesDone: existing.activitiesDone + 1,
        starsEarned: existing.starsEarned + r.starsEarned,
        totalCorrect: existing.totalCorrect + r.correct,
        totalAnswered: existing.totalAnswered + r.total,
      });
    }

    return SUBJECTS.map((s) => {
      const raw = statsMap.get(s.id) ?? { activitiesDone: 0, starsEarned: 0, totalCorrect: 0, totalAnswered: 0 };
      const accuracy = raw.totalAnswered > 0 ? Math.round((raw.totalCorrect / raw.totalAnswered) * 100) : 0;
      return { subjectId: s.id, name: s.name, emoji: s.emoji, bgSoftClass: s.bgSoftClass, textClass: s.textClass, gradientClass: s.gradientClass, ...raw, accuracy };
    });
  }, [progress]);

  // Weekly totals
  const weeklyStars = useMemo(() => subjectStats.reduce((a, s) => a + s.starsEarned, 0), [subjectStats]);
  const weeklyActivities = useMemo(() => subjectStats.reduce((a, s) => a + s.activitiesDone, 0), [subjectStats]);

  // Daily challenge this week
  const dailyChallengeCount = useMemo(() => {
    if (!progress) return 0;
    const cutoff = Date.now() - ONE_WEEK_MS;
    return progress.results.filter((r) => r.activityId === DAILY_CHALLENGE_ID && r.completedAt >= cutoff).length;
  }, [progress]);

  // Strengths: tried subjects sorted by accuracy desc, take top 3
  const strengths = useMemo(
    () => subjectStats.filter((s) => s.activitiesDone > 0).sort((a, b) => b.accuracy - a.accuracy || b.starsEarned - a.starsEarned).slice(0, 3),
    [subjectStats],
  );

  // Growth areas: subjects not tried this week OR with lowest accuracy (tried but low)
  const growthAreas = useMemo(() => {
    const tried = subjectStats.filter((s) => s.activitiesDone > 0);
    const untried = subjectStats.filter((s) => s.activitiesDone === 0);
    // Lowest accuracy among tried (exclude top strengths)
    const weakTried = tried.filter((s) => !strengths.slice(0, 2).find((x) => x.subjectId === s.subjectId));
    const candidates = [...weakTried.sort((a, b) => a.accuracy - b.accuracy), ...untried];
    return candidates.slice(0, 3);
  }, [subjectStats, strengths]);

  // Recent activity log this week
  const recentLog = useMemo(() => {
    if (!progress) return [];
    const cutoff = Date.now() - ONE_WEEK_MS;
    return [...progress.results]
      .filter((r) => r.completedAt >= cutoff)
      .sort((a, b) => b.completedAt - a.completedAt)
      .slice(0, 10);
  }, [progress]);

  // Earned badges (all time — displayed as achievements panel)
  const earnedBadges = useMemo(() => {
    if (!allBadges || !progress) return [];
    return allBadges.filter((b) => progress.earnedBadgeIds.includes(b.id));
  }, [allBadges, progress]);

  const profileName = profile?.name ?? "Explorer";

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto py-6 flex flex-col gap-4">
        <Shimmer className="h-10 w-48 rounded-xl" />
        <Shimmer className="h-32 rounded-2xl" />
        <Shimmer className="h-48 rounded-2xl" />
      </div>
    );
  }

  if (weeklyActivities === 0) {
    return (
      <div className="max-w-2xl mx-auto py-6">
        <h1 className="text-2xl font-extrabold text-slate-800 mb-1">Weekly Report</h1>
        <p className="text-sm text-slate-500 mb-8">{formatDate(start)} – {formatDate(end)}</p>
        <div className="flex flex-col items-center gap-4 rounded-2xl border-2 border-dashed border-violet-200 bg-violet-50/40 px-6 py-14 text-center">
          <span className="text-5xl">📋</span>
          <p className="font-bold text-slate-700 text-lg">No activities this week yet!</p>
          <p className="text-sm text-slate-500 max-w-xs">Complete some activities and come back to see {profileName}'s weekly report.</p>
          <Link to="/" className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 px-5 py-2.5 text-sm font-bold text-white shadow hover:opacity-90 transition-opacity">
            <Sparkles className="size-4" /> Start Learning
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-2 flex flex-col gap-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-800">
          {profileName}'s Weekly Report
        </h1>
        <p className="text-sm text-slate-500 mt-0.5 flex items-center gap-1.5">
          <CalendarDays className="size-3.5" />
          {formatDate(start)} – {formatDate(end)}
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <SummaryCard icon={<Star className="size-5 text-amber-400" />} label="Stars Earned" value={weeklyStars} color="bg-amber-50 border-amber-100" />
        <SummaryCard icon={<CheckCircle2 className="size-5 text-violet-500" />} label="Activities" value={weeklyActivities} color="bg-violet-50 border-violet-100" />
        <SummaryCard icon={<Flame className="size-5 text-orange-400" />} label="Day Streak" value={progress?.streakDays ?? 0} color="bg-orange-50 border-orange-100" />
        <SummaryCard icon={<Trophy className="size-5 text-sky-400" />} label="Challenges" value={dailyChallengeCount} color="bg-sky-50 border-sky-100" />
      </div>

      {/* Strengths */}
      {strengths.length > 0 && (
        <section className="flex flex-col gap-3">
          <SectionHeader emoji="🌟" title="Areas of Strength" />
          <div className="flex flex-col gap-2">
            {strengths.map((s) => (
              <SubjectStatRow key={s.subjectId} stat={s} />
            ))}
          </div>
        </section>
      )}

      {/* Growth areas */}
      {growthAreas.length > 0 && (
        <section className="flex flex-col gap-3">
          <SectionHeader emoji="📈" title="Recommended for Growth" />
          <div className="flex flex-col gap-2">
            {growthAreas.map((s) => (
              <GrowthRow key={s.subjectId} stat={s} />
            ))}
          </div>
        </section>
      )}

      {/* All subjects overview */}
      <section className="flex flex-col gap-3">
        <SectionHeader emoji="📊" title="All Subjects This Week" />
        <div className="rounded-2xl border border-slate-100 bg-white shadow-sm overflow-hidden">
          {subjectStats.filter((s) => s.activitiesDone > 0).map((s, i, arr) => (
            <div key={s.subjectId} className={cn("flex items-center gap-3 px-4 py-3", i < arr.length - 1 && "border-b border-slate-50")}>
              <span className="text-xl w-8 text-center">{s.emoji}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-700 truncate">{s.name}</p>
                <div className="mt-1.5 h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div className={cn("h-full rounded-full transition-all", accuracyBarColor(s.accuracy))} style={{ width: `${s.accuracy}%` }} />
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className={cn("text-sm font-bold", accuracyColor(s.accuracy))}>{s.accuracy}%</p>
                <p className="text-xs text-slate-400">{s.activitiesDone} done</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recent activity log */}
      <section className="flex flex-col gap-3">
        <SectionHeader emoji="📝" title="Activity Log" />
        <div className="rounded-2xl border border-slate-100 bg-white shadow-sm overflow-hidden">
          {recentLog.map((r, i) => {
            const subject = SUBJECTS.find((s) => s.id === r.subjectId);
            const accuracy = r.total > 0 ? Math.round((r.correct / r.total) * 100) : 0;
            const isDaily = r.activityId === DAILY_CHALLENGE_ID;
            return (
              <div key={`${r.activityId}-${r.completedAt}`} className={cn("flex items-center gap-3 px-4 py-3", i < recentLog.length - 1 && "border-b border-slate-50")}>
                <span className="text-xl w-8 text-center shrink-0">{isDaily ? "🏆" : activityEmoji(r.activityId)}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-700 truncate">
                    {isDaily ? "Daily Challenge" : activityTitle(r.activityId)}
                  </p>
                  <p className="text-xs text-slate-400">
                    {subject?.name ?? r.subjectId} · {new Date(r.completedAt).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className={cn("text-sm font-bold", accuracyColor(accuracy))}>{r.correct}/{r.total}</p>
                  <p className="text-xs text-amber-500 font-medium flex items-center justify-end gap-0.5">
                    <Star className="size-3" />{r.starsEarned}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Badges earned */}
      {earnedBadges.length > 0 && (
        <section className="flex flex-col gap-3">
          <SectionHeader emoji="🏅" title="Badges Earned" />
          <div className="flex flex-wrap gap-3">
            {earnedBadges.map((b) => (
              <div key={b.id} className="flex flex-col items-center gap-1 rounded-2xl border border-violet-100 bg-violet-50 px-4 py-3 text-center min-w-[90px]">
                <span className="text-2xl">{b.emoji}</span>
                <p className="text-xs font-bold text-violet-700 leading-tight">{b.name}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Motivational footer */}
      <div className="rounded-2xl bg-gradient-to-r from-violet-500 to-fuchsia-500 px-5 py-4 text-white text-center">
        <p className="font-extrabold text-base">Keep up the great work, {profileName}! 🎉</p>
        <p className="text-sm opacity-90 mt-0.5">Every activity makes your brain stronger.</p>
        <Link to="/" className="mt-3 inline-flex items-center gap-1.5 rounded-xl bg-white/20 hover:bg-white/30 px-4 py-2 text-sm font-bold transition-colors">
          <Sparkles className="size-4" /> Continue Learning <ChevronRight className="size-4" />
        </Link>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------
function SummaryCard({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: number; color: string }) {
  return (
    <div className={cn("flex flex-col items-center gap-1 rounded-2xl border px-3 py-3 text-center", color)}>
      {icon}
      <p className="text-2xl font-extrabold text-slate-800">{value}</p>
      <p className="text-xs font-medium text-slate-500">{label}</p>
    </div>
  );
}

function SectionHeader({ emoji, title }: { emoji: string; title: string }) {
  return (
    <h2 className="flex items-center gap-2 text-base font-extrabold text-slate-700">
      <span>{emoji}</span>
      {title}
    </h2>
  );
}

function SubjectStatRow({ stat }: { stat: SubjectStat }) {
  return (
    <div className={cn("flex items-center gap-3 rounded-2xl border px-4 py-3", stat.bgSoftClass, "border-transparent")}>
      <span className="text-2xl w-9 text-center">{stat.emoji}</span>
      <div className="flex-1 min-w-0">
        <p className={cn("text-sm font-bold", stat.textClass)}>{stat.name}</p>
        <p className="text-xs text-slate-500 mt-0.5">{accuracyLabel(stat.accuracy)} · {stat.activitiesDone} {stat.activitiesDone === 1 ? "activity" : "activities"}</p>
      </div>
      <div className="text-right shrink-0">
        <p className={cn("text-lg font-extrabold", accuracyColor(stat.accuracy))}>{stat.accuracy}%</p>
        <p className="text-xs text-amber-500 flex items-center justify-end gap-0.5 font-medium">
          <Star className="size-3" />{stat.starsEarned}
        </p>
      </div>
    </div>
  );
}

function GrowthRow({ stat }: { stat: SubjectStat }) {
  const subjectPath = `/${stat.subjectId === "states" ? "states" : stat.subjectId}`;
  return (
    <Link
      to={subjectPath}
      className="flex items-center gap-3 rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-3 hover:border-violet-300 hover:bg-violet-50/50 transition-colors"
    >
      <span className="text-2xl w-9 text-center">{stat.emoji}</span>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-slate-700">{stat.name}</p>
        <p className="text-xs text-slate-400 mt-0.5">
          {stat.activitiesDone === 0
            ? "Not tried this week — give it a go!"
            : `${stat.accuracy}% accuracy — room to improve!`}
        </p>
      </div>
      <div className="flex items-center gap-1 text-violet-500 shrink-0">
        <TrendingUp className="size-4" />
        <ChevronRight className="size-4" />
      </div>
    </Link>
  );
}
