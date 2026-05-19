import { useCallback, useState, useSyncExternalStore } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { memory } from "@/lib/memory-store";
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

const PROGRESS_KEY = "brainy:progress";
const LEVEL_KEY = "brainy:level";
const SIM_DELAY = 220; // ms — small delay so shimmers show up briefly

// ---------------------------------------------------------------------------
// Level (Kindergarten / 2nd Grade) — kept in the in-memory store with a
// tiny pub/sub so components re-render when the selected level changes.
// ---------------------------------------------------------------------------

const levelListeners = new Set<() => void>();
function emitLevelChange() {
  levelListeners.forEach((l) => l());
}
function subscribeLevel(listener: () => void) {
  levelListeners.add(listener);
  return () => {
    levelListeners.delete(listener);
  };
}
function getStoredLevel(): Level {
  const v = memory.get<Level>(LEVEL_KEY);
  return v ?? "grade2";
}

export function useLevel(): Level {
  return useSyncExternalStore(subscribeLevel, getStoredLevel, getStoredLevel);
}

export function useSetLevel() {
  const qc = useQueryClient();
  return useCallback(
    (level: Level) => {
      memory.put(LEVEL_KEY, level);
      emitLevelChange();
      // Invalidate level-dependent queries so they refetch with the new pool.
      qc.invalidateQueries({ queryKey: ["activities"] });
      qc.invalidateQueries({ queryKey: ["daily-challenge"] });
    },
    [qc],
  );
}

// ---------------------------------------------------------------------------
// Progress storage
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

function getProgress(): ProgressState {
  const p = memory.ensure<ProgressState>(PROGRESS_KEY, defaultProgress);
  if (p.lastDailyChallengeDate === undefined) p.lastDailyChallengeDate = null;
  if (p.dailyChallengesCompleted === undefined) p.dailyChallengesCompleted = 0;
  return p;
}

function setProgress(next: ProgressState) {
  memory.put(PROGRESS_KEY, next);
}

function wait<T>(value: T, ms = SIM_DELAY): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

// ---------------------------------------------------------------------------
// Subjects & activities — all reads filter by the currently selected level.
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

/**
 * Fetches an activity. The `roundKey` parameter forces React Query to treat
 * each "round" as a unique fetch so re-doing an activity (or navigating back
 * to it) will randomly sample a fresh set of questions from the pool.
 */
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

/**
 * Daily-challenge state key — namespaced per level so each grade level
 * gets its own "once per day" challenge.
 */
function dailyKey(level: Level): string {
  return `${dateKey(Date.now())}|${level}`;
}

/** Today's daily challenge — random sample of 3 questions per subject. */
export function useDailyChallenge() {
  const level = useLevel();
  const today = dailyKey(level);
  return useQuery<{ activity: Activity; today: string; completedToday: boolean; level: Level }>({
    queryKey: ["daily-challenge", today],
    queryFn: async () => {
      const progress = getProgress();
      const activity = buildDailyChallenge(today, level);
      return wait({
        activity,
        today,
        level,
        completedToday: progress.lastDailyChallengeDate === today,
      });
    },
  });
}

export function useProgress() {
  return useQuery<ProgressState>({
    queryKey: ["progress"],
    queryFn: () => wait(getProgress()),
  });
}

export function useAllBadges() {
  return useQuery<Badge[]>({
    queryKey: ["badges"],
    queryFn: () => wait(BADGES),
  });
}

function evaluateBadges(progress: ProgressState, level: Level): string[] {
  const completedBySubject: Record<SubjectId, Set<string>> = {
    math: new Set(),
    science: new Set(),
    history: new Set(),
    geography: new Set(),
    reading: new Set(),
    states: new Set(),
  };
  let perfectExists = false;
  for (const r of progress.results) {
    if (r.activityId !== DAILY_CHALLENGE_ID) {
      completedBySubject[r.subjectId].add(r.activityId);
    }
    if (r.correct === r.total && r.total > 0) perfectExists = true;
  }

  const earned = new Set(progress.earnedBadgeIds);
  for (const badge of BADGES) {
    if (earned.has(badge.id)) continue;
    const r: any = badge.rule;
    let qualifies = false;
    if (r.kind === "firstActivity") {
      qualifies = progress.results.length > 0;
    } else if (r.kind === "perfectActivity") {
      qualifies = perfectExists;
    } else if (r.kind === "totalStars") {
      qualifies = progress.totalStars >= r.amount;
    } else if (r.kind === "subjectComplete") {
      // "complete" is judged for the currently-active level.
      const total = totalActivitiesForSubjectAndLevel(r.subjectId, level);
      qualifies = completedBySubject[r.subjectId as SubjectId].size >= total && total > 0;
    } else if (r.kind === "streakDays") {
      qualifies = progress.streakDays >= r.days;
    } else if (r.kind === "dailyChallenge") {
      qualifies = progress.dailyChallengesCompleted > 0;
    }
    if (qualifies) earned.add(badge.id);
  }
  return Array.from(earned);
}

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
  const da = new Date(a);
  const db = new Date(b);
  return (
    da.getFullYear() === db.getFullYear() &&
    da.getMonth() === db.getMonth() &&
    da.getDate() === db.getDate()
  );
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
      const progress = getProgress();
      const now = Date.now();

      const isPerfect = input.correct === input.total && input.total > 0;
      const dailyBonus = input.isDaily ? 5 : 0;
      const starsEarned = 1 + input.correct + (isPerfect ? 2 : 0) + dailyBonus;

      let streakDays = progress.streakDays;
      if (progress.lastActivityAt == null) {
        streakDays = 1;
      } else if (sameDay(progress.lastActivityAt, now)) {
        // same day: keep streak
      } else if (isYesterday(progress.lastActivityAt, now)) {
        streakDays = streakDays + 1;
      } else {
        streakDays = 1;
      }

      const result: ActivityResult = {
        activityId: input.activityId,
        subjectId: input.subjectId,
        correct: input.correct,
        total: input.total,
        starsEarned,
        completedAt: now,
      };

      const today = dailyKey(level);
      const nextProgress: ProgressState = {
        totalStars: progress.totalStars + starsEarned,
        streakDays,
        lastActivityAt: now,
        results: [result, ...progress.results].slice(0, 100),
        earnedBadgeIds: progress.earnedBadgeIds,
        lastDailyChallengeDate: input.isDaily ? today : progress.lastDailyChallengeDate,
        dailyChallengesCompleted:
          progress.dailyChallengesCompleted + (input.isDaily ? 1 : 0),
      };

      const previouslyEarned = new Set(progress.earnedBadgeIds);
      const updatedBadgeIds = evaluateBadges(nextProgress, level);
      nextProgress.earnedBadgeIds = updatedBadgeIds;
      const newBadges = BADGES.filter(
        (b) => updatedBadgeIds.includes(b.id) && !previouslyEarned.has(b.id),
      );

      setProgress(nextProgress);
      await wait(null, 280);

      return {
        starsEarned,
        newBadges,
        totalStars: nextProgress.totalStars,
        streakDays: nextProgress.streakDays,
      };
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["progress"] });
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

/**
 * Count of activities for a subject in the currently selected level.
 * (Replaces the old level-agnostic helper; callers still pass a SubjectId.)
 */
export function totalActivitiesForSubject(id: SubjectId): number {
  // Note: this is now a hook-free helper that defaults to the stored level.
  // Components inside the React tree should prefer the level-aware version
  // below; this remains for compatibility with non-hook callers.
  return totalActivitiesForSubjectAndLevel(id, getStoredLevel());
}

/** Hook variant that re-renders when the level changes. */
export function useTotalActivitiesForSubject(id: SubjectId): number {
  const level = useLevel();
  return totalActivitiesForSubjectAndLevel(id, level);
}
