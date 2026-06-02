/**
 * Guest-mode localStorage store for profiles and progress.
 * Used when no Supabase auth session is present.
 * All data is namespaced under "brainy:guest:" to avoid collisions.
 */
import type { UserProfile } from "@/lib/profiles";
import type { ProgressState } from "@/lib/brainy-data";

export const GUEST_ID_PREFIX = "guest_";

const LS_GUEST_PROFILES = "brainy:guest:profiles";
const guestProgressKey = (id: string) => `brainy:guest:progress:${id}`;
const guestLevelKey = (id: string) => `brainy:guest:level:${id}`;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
export function isGuestId(id: string | null | undefined): boolean {
    return Boolean(id?.startsWith(GUEST_ID_PREFIX));
}

// ---------------------------------------------------------------------------
// Profiles
// ---------------------------------------------------------------------------
export function getLocalProfiles(): UserProfile[] {
    try {
        return JSON.parse(localStorage.getItem(LS_GUEST_PROFILES) ?? "[]") as UserProfile[];
    } catch {
        return [];
    }
}

function saveLocalProfiles(profiles: UserProfile[]): void {
    try {
        localStorage.setItem(LS_GUEST_PROFILES, JSON.stringify(profiles));
    } catch { }
}

export function createLocalProfile(
    data: Pick<UserProfile, "name" | "avatar" | "color" | "level">,
): UserProfile {
    const profiles = getLocalProfiles();
    const profile: UserProfile = {
        id: `${GUEST_ID_PREFIX}${crypto.randomUUID()}`,
        household_id: "guest",
        ...data,
    };
    saveLocalProfiles([...profiles, profile]);
    return profile;
}

export function updateLocalProfile(
    id: string,
    updates: Partial<Pick<UserProfile, "name" | "avatar" | "color" | "level">>,
): void {
    const profiles = getLocalProfiles();
    const idx = profiles.findIndex((p) => p.id === id);
    if (idx === -1) return;
    profiles[idx] = { ...profiles[idx], ...updates };
    saveLocalProfiles(profiles);
}

export function deleteLocalProfile(id: string): void {
    saveLocalProfiles(getLocalProfiles().filter((p) => p.id !== id));
    try { localStorage.removeItem(guestProgressKey(id)); } catch { }
    try { localStorage.removeItem(guestLevelKey(id)); } catch { }
}

// ---------------------------------------------------------------------------
// Progress
// ---------------------------------------------------------------------------
export function defaultLocalProgress(): ProgressState {
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

export function getLocalProgress(profileId: string): ProgressState {
    try {
        const raw = localStorage.getItem(guestProgressKey(profileId));
        return raw ? (JSON.parse(raw) as ProgressState) : defaultLocalProgress();
    } catch {
        return defaultLocalProgress();
    }
}

export function saveLocalProgress(profileId: string, progress: ProgressState): void {
    try {
        localStorage.setItem(guestProgressKey(profileId), JSON.stringify(progress));
    } catch { }
}

// ---------------------------------------------------------------------------
// Level (per-profile, for guests)
// ---------------------------------------------------------------------------
export function getLocalLevel(profileId: string): string {
    try {
        return localStorage.getItem(guestLevelKey(profileId)) ?? "grade2";
    } catch {
        return "grade2";
    }
}

export function saveLocalLevel(profileId: string, level: string): void {
    try {
        localStorage.setItem(guestLevelKey(profileId), level);
    } catch { }
}

// ---------------------------------------------------------------------------
// Clear all guest data (called after successful sync to cloud)
// ---------------------------------------------------------------------------
export function clearAllGuestData(): void {
    try {
        const profiles = getLocalProfiles();
        for (const p of profiles) {
            localStorage.removeItem(guestProgressKey(p.id));
            localStorage.removeItem(guestLevelKey(p.id));
        }
        localStorage.removeItem(LS_GUEST_PROFILES);
    } catch { }
}
