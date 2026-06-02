/**
 * Syncs guest (localStorage) profiles and progress to Supabase immediately
 * after the user signs in. Called once per login from auth-context.tsx.
 * No-ops if there are no guest profiles to migrate.
 */
import { supabase } from "@/lib/supabase";
import {
    getLocalProfiles,
    getLocalProgress,
    getLocalLevel,
    clearAllGuestData,
} from "@/lib/local-store";
import { getActiveProfileId, setActiveProfileId } from "@/lib/profiles";

export async function syncLocalProgressToCloud(): Promise<void> {
    const guestProfiles = getLocalProfiles();
    if (guestProfiles.length === 0) return;

    // Household is auto-created by Supabase trigger on first sign-in
    const { data: household, error: hErr } = await supabase
        .from("households")
        .select("id")
        .maybeSingle();

    if (hErr || !household) {
        console.error("syncLocalProgressToCloud: household not found, skipping sync");
        return;
    }

    const activeGuestId = getActiveProfileId();
    let newActiveProfileId: string | null = null;

    for (const guestProfile of guestProfiles) {
        // Create a real Supabase profile for this guest profile
        const { data: newProfile, error: profileErr } = await supabase
            .from("profiles")
            .insert({
                name: guestProfile.name,
                avatar: guestProfile.avatar,
                color: guestProfile.color,
                level: getLocalLevel(guestProfile.id),
                household_id: household.id,
            })
            .select()
            .single();

        if (profileErr || !newProfile) {
            console.error("syncLocalProgressToCloud: failed to create profile", profileErr);
            continue;
        }

        const newId = newProfile.id as string;
        const progress = getLocalProgress(guestProfile.id);

        // Track which profile should be active after sync
        if (guestProfile.id === activeGuestId) {
            newActiveProfileId = newId;
        }

        // Upload activity results
        if (progress.results.length > 0) {
            await supabase.from("activity_results").insert(
                progress.results.map((r) => ({
                    profile_id: newId,
                    activity_id: r.activityId,
                    subject_id: r.subjectId,
                    correct: r.correct,
                    total: r.total,
                    stars_earned: r.starsEarned,
                    completed_at: r.completedAt,
                })),
            );
        }

        // Upsert progress summary
        if (progress.totalStars > 0 || progress.results.length > 0) {
            await supabase.from("profile_progress").upsert({
                profile_id: newId,
                total_stars: progress.totalStars,
                streak_days: progress.streakDays,
                last_activity_at: progress.lastActivityAt,
                last_daily_challenge_date: progress.lastDailyChallengeDate,
                daily_challenges_completed: progress.dailyChallengesCompleted,
                updated_at: new Date().toISOString(),
            });
        }

        // Upload earned badges
        if (progress.earnedBadgeIds.length > 0) {
            await supabase.from("earned_badges").upsert(
                progress.earnedBadgeIds.map((badge_id) => ({
                    profile_id: newId,
                    badge_id,
                })),
            );
        }
    }

    // Switch active profile to the newly-synced Supabase profile
    if (newActiveProfileId) {
        setActiveProfileId(newActiveProfileId);
    }

    // Remove all guest data from localStorage now that it's in Supabase
    clearAllGuestData();
}
