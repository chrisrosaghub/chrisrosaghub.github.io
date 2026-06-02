import { useCallback, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { getActiveProfileId, useActiveProfileId } from "@/lib/profiles";
import {
  ACTIVITIES,
  BADGES,
  SUBJECTS,
  DAILY_CHALLENGE_ID,
  buildActivityRound,
  buildDailyChallenge,
  dateKey,
  getActivitiesForLevel,
  getSubjectsForLevel,
  totalActivitiesForSubjectAndLevel,
  type Activity,
  type ActivityResult,
  type Badge,
  type Level,
  type ProgressState,
  type Subject,
  type SubjectId,
} from "@/lib/brainy-data";

const SIM_DELAY = 220;

// ---------------------------------------------------------------------------
// Level — stored on the profile row in Supabase.
// A localStorage cache makes getStoredLevel() available synchronously for
// non-hook helpers (e.g. totalActivitiesForSubject).
// ---------------------------------------------------------------------------
const LEVEL_LS_CACHE = "brainy:level:cache";

function getStoredLevel(): Level {
  try {
    return (localStorage.getItem(LEVEL_LS_CACHE) as Level) ?? "grade2";
  } catch {
    return "grade2";
  }
}

function cacheLevel(level: Level): void {
  try {
    localStorage.setItem(LEVEL_LS_CACHE, level);
  } catch { }
}

export function useLevel(): Level {
  const profileId = useActiveProfileId();
  const { data } = useQuery<Level>({
    queryKey: ["profile-level", profileId],
    queryFn: async () => {
      if (!profileId) return "grade2";
      const { data } = await supabase
        .from("profiles")
        .select("level")
        .eq("id", profileId)
        .maybeSingle();
      const level = (data?.level as Level) ?? "grade2";
      cacheLevel(level);
      return level;
    },
    enabled: Boolean(profileId),
    staleTime: 5 * 60 * 1000,
  });
  return data ?? getStoredLevel();
}

export function useSetLevel() {
  const qc = useQueryClient();
  const profileId = useActiveProfileId();
  return useCallback(
    async (level: Level) => {
      cacheLevel(level);
      if (profileId) {
        await supabase.from("profiles").update({ level }).eq("id", profileId);
      }
      qc.invalidateQueries({ queryKey: ["profile-level", profileId] });
      qc.invalidateQueries({ queryKey: ["activities"] });
      qc.invalidateQueries({ queryKey: ["daily-challenge"] });
    },
    [profileId, qc],
  );
}

// ---------------------------------------------------------------------------
// Progress default
// ---------------------------------------------------------------------------
function defaultProgress(): ProgressState {
  return {
    totalStars: 0,
    streakDays: 1,
    lastActivityAt: null,
    results: [],
    earnedBadgeIds: [],
    lastDailyChallengeDate: null,
    dailyChallengesCompleted: 0,
  };
}

function wait<T>(value: T, ms = SIM_DELAY): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

// ---------------------------------------------------------------------------
// Subjects & activities — static data, filtered by level.
// ---------------------------------------------------------------------------
export function useSubjects() {
  const level = useLevel();
  return useQuery<Subject[]>({
    queryKey: ["subjects", level],
    queryFn: () => wait(getSubjectsForLevel(level)),
  });
}

export function useSubject(id: SubjectId | undefined) {
  return useQuery<Subject | undefined>({
    queryKey: ["subject", id],
    queryFn: () => wait(SUBJECTS.find((s) => s.id === id)),
    enabled: Boolean(id),
  });
}

export function useActivities(subjectId?: SubjectId) {
  const level = useLevel();
  return useQuery<Activity[]>({
    queryKey: ["activities", level, subjectId ?? "all"],
    queryFn: () => {
      const pool = getActivitiesForLevel(level);
      return wait(
        subjectId
          ? pool.filter((a) => a.subjectId === subjectId)
          : pool,
      );
    },
  });
}

export function useActivity(id: string | undefined, roundKey: number = 0) {
  const level = useLevel();
  return useQuery<Activity | undefined>({
    queryKey: ["activity", id, roundKey, level],
    queryFn: () => {
      if (id === DAILY_CHALLENGE_ID) {
        return wait(buildDailyChallenge(dailyKey(level), level));
      }
      const base = ACTIVITIES.find((a) => a.id === id);
      return wait(base ? buildActivityRound(base) : undefined);
    },
    enabled: Boolean(id),
    staleTime: 0,
    gcTime: 0,
  });
}

export function useRoundKey() {
  const [roundKey, setRoundKey] = useState(() => Date.now());
  const nextRound = useCallback(() => setRoundKey(Date.now()), []);
  return { roundKey, nextRound };
}

function dailyKey(level: Level): string {
  return `${dateKey(Date.now())}|${level}`;
}

// ---------------------------------------------------------------------------
// Daily challenge — completedToday checked against Supabase
// ---------------------------------------------------------------------------
export function useDailyChallenge() {
  const level = useLevel();
  const profileId = useActiveProfileId();
  const today = dailyKey(level);
  return useQuery<{ activity: Activity; today: string; completedToday: boolean; level: Level }>({
    queryKey: ["daily-challenge", today, profileId],
    queryFn: async () => {
      let completedToday = false;
      if (profileId) {
        const { data } = await supabase
          .from("profile_progress")
          .select("last_daily_challenge_date")
          .eq("profile_id", profileId)
          .maybeSingle();
        completedToday = data?.last_daily_challenge_date === today;
      }
      const activity = buildDailyChallenge(today, level);
      return { activity, today, level, completedToday };
    },
  });
}

// ---------------------------------------------------------------------------
// Progress — fetched from Supabase (profile_progress + activity_results + earned_badges)
// ---------------------------------------------------------------------------
export function useProgress() {
  const profileId = useActiveProfileId();
  return useQuery<ProgressState>({
    queryKey: ["progress", profileId],
    queryFn: async () => {
      if (!profileId) return defaultProgress();

      const [progressRes, resultsRes, badgesRes] = await Promise.all([
        supabase.from("profile_progress").select("*").eq("profile_id", profileId).maybeSingle(),
        supabase.from("activity_results").select("*").eq("profile_id", profileId).order("completed_at", { ascending: false }).limit(100),
        supabase.from("earned_badges").select("badge_id").eq("profile_id", profileId),
      ]);

      const progressRow = progressRes.data;
      const results: ActivityResult[] = (resultsRes.data ?? []).map((r) => ({
        activityId: r.activity_id,
        subjectId: r.subject_id as SubjectId,
        correct: r.correct,
        total: r.total,
        starsEarned: r.stars_earned,
        completedAt: Number(r.completed_at),
      }));

      return {
        totalStars: progressRow?.total_stars ?? 0,
        streakDays: progressRow?.streak_days ?? 1,
        lastActivityAt: progressRow?.last_activity_at ? Number(progressRow.last_activity_at) : null,
        results,
        earnedBadgeIds: (badgesRes.data ?? []).map((b) => b.badge_id),
        lastDailyChallengeDate: progressRow?.last_daily_challenge_date ?? null,
        dailyChallengesCompleted: progressRow?.daily_challenges_completed ?? 0,
      };
    },
    enabled: Boolean(profileId),
  });
}

export function useAllBadges() {
  return useQuery<Badge[]>({
    queryKey: ["badges"],
    queryFn: () => wait(BADGES),
  });
}

// ---------------------------------------------------------------------------
// Badge evaluation (pure, client-side)
// ---------------------------------------------------------------------------
function evaluateBadges(progress: ProgressState, level: Level): string[] {
  const completedBySubject: Record<SubjectId, Set<string>> = {
    math: new Set(), science: new Set(), history: new Set(), geography: new Set(),
    reading: new Set(), states: new Set(), presidents: new Set(), language: new Set(),
  };
  let perfectExists = false;
  for (const r of progress.results) {
    if (r.activityId !== DAILY_CHALLENGE_ID) completedBySubject[r.subjectId].add(r.activityId);
    if (r.correct === r.total && r.total > 0) perfectExists = true;
  }

  const earned = new Set(progress.earnedBadgeIds);
  for (const badge of BADGES) {
    if (earned.has(badge.id)) continue;
    const r: any = badge.rule;
    let qualifies = false;
    if (r.kind === "firstActivity") qualifies = progress.results.length > 0;
    else if (r.kind === "perfectActivity") qualifies = perfectExists;
    else if (r.kind === "totalStars") qualifies = progress.totalStars >= r.amount;
    else if (r.kind === "subjectComplete") {
      const total = totalActivitiesForSubjectAndLevel(r.subjectId, level);
      qualifies = completedBySubject[r.subjectId as SubjectId].size >= total && total > 0;
    } else if (r.kind === "streakDays") qualifies = progress.streakDays >= r.days;
    else if (r.kind === "dailyChallenge") qualifies = progress.dailyChallengesCompleted > 0;
    if (qualifies) earned.add(badge.id);
  }
  return Array.from(earned);
}

// ---------------------------------------------------------------------------
// Complete activity — writes to Supabase
// ---------------------------------------------------------------------------
export interface CompleteActivityInput {
  activityId: string;
  subjectId: SubjectId;
  correct: number;
  total: number;
  isDaily?: boolean;
}

export interface CompleteActivityResult {
  starsEarned: number;
  newBadges: Badge[];
  totalStars: number;
  streakDays: number;
}

function sameDay(a: number, b: number) {
  const da = new Date(a), db = new Date(b);
  return da.getFullYear() === db.getFullYear() && da.getMonth() === db.getMonth() && da.getDate() === db.getDate();
}

function isYesterday(prev: number, now: number) {
  const d = new Date(now);
  d.setDate(d.getDate() - 1);
  return sameDay(prev, d.getTime());
}

export function useCompleteActivity() {
  const qc = useQueryClient();
  const level = useLevel();
  return useMutation<CompleteActivityResult, Error, CompleteActivityInput>({
    mutationFn: async (input) => {
      const profileId = getActiveProfileId();
      if (!profileId) throw new Error("No active profile selected.");

      const progress = qc.getQueryData<ProgressState>(["progress", profileId]) ?? defaultProgress();
      const now = Date.now();

      const isPerfect = input.correct === input.total && input.total > 0;
      const dailyBonus = input.isDaily ? 5 : 0;
      const starsEarned = 1 + input.correct + (isPerfect ? 2 : 0) + dailyBonus;

      let streakDays = progress.streakDays;
      if (progress.lastActivityAt == null) {
        streakDays = 1;
      } else if (sameDay(progress.lastActivityAt, now)) {
        // same day — keep streak unchanged
      } else if (isYesterday(progress.lastActivityAt, now)) {
        streakDays += 1;
      } else {
        streakDays = 1;
      }

      const today = dailyKey(level);
      const newTotalStars = progress.totalStars + starsEarned;

      const { error: insertErr } = await supabase.from("activity_results").insert({
        profile_id: profileId,
        activity_id: input.activityId,
        subject_id: input.subjectId,
        correct: input.correct,
        total: input.total,
        stars_earned: starsEarned,
        completed_at: now,
      });
      if (insertErr) throw insertErr;

      const { error: upsertErr } = await supabase.from("profile_progress").upsert({
        profile_id: profileId,
        total_stars: newTotalStars,
        streak_days: streakDays,
        last_activity_at: now,
        last_daily_challenge_date: input.isDaily ? today : progress.lastDailyChallengeDate,
        daily_challenges_completed: progress.dailyChallengesCompleted + (input.isDaily ? 1 : 0),
        updated_at: new Date().toISOString(),
      });
      if (upsertErr) throw upsertErr;

      const newResult: ActivityResult = {
        activityId: input.activityId,
        subjectId: input.subjectId,
        correct: input.correct,
        total: input.total,
        starsEarned,
        completedAt: now,
      };
      const nextProgress: ProgressState = {
        totalStars: newTotalStars,
        streakDays,
        lastActivityAt: now,
        results: [newResult, ...progress.results].slice(0, 100),
        earnedBadgeIds: progress.earnedBadgeIds,
        lastDailyChallengeDate: input.isDaily ? today : progress.lastDailyChallengeDate,
        dailyChallengesCompleted: progress.dailyChallengesCompleted + (input.isDaily ? 1 : 0),
      };

      const previouslyEarned = new Set(progress.earnedBadgeIds);
      const updatedBadgeIds = evaluateBadges(nextProgress, level);
      const newBadgeIds = updatedBadgeIds.filter((id) => !previouslyEarned.has(id));

      if (newBadgeIds.length > 0) {
        await supabase.from("earned_badges").upsert(
          newBadgeIds.map((badge_id) => ({ profile_id: profileId, badge_id })),
        );
      }

      const newBadges = BADGES.filter((b) => newBadgeIds.includes(b.id));
      return { starsEarned, newBadges, totalStars: newTotalStars, streakDays };
    },
    onSuccess: () => {
      const profileId = getActiveProfileId();
      qc.invalidateQueries({ queryKey: ["progress", profileId] });
      qc.invalidateQueries({ queryKey: ["activities"] });
      qc.invalidateQueries({ queryKey: ["daily-challenge"] });
    },
  });
}

export function useCompletedActivityIds() {
  const { data } = useProgress();
  const ids = new Set<string>();
  data?.results.forEach((r) => ids.add(r.activityId));
  return ids;
}

export function getSubject(id: SubjectId): Subject {
  return SUBJECTS.find((s) => s.id === id) as Subject;
}

export function totalActivitiesForSubject(id: SubjectId): number {
  return totalActivitiesForSubjectAndLevel(id, getStoredLevel());
}

export function useTotalActivitiesForSubject(id: SubjectId): number {
  const level = useLevel();
  return totalActivitiesForSubjectAndLevel(id, level);
}
