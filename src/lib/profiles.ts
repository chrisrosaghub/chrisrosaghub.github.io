/**
 * User profile system — Supabase-backed.
 * Profiles belong to a household (one per Google account).
 * The active profile ID is kept in localStorage so it survives page refreshes
 * and can be switched per device independently.
 */
import { useCallback, useSyncExternalStore } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useSession } from "@/lib/auth-context";
import {
    getLocalProfiles,
    createLocalProfile,
    updateLocalProfile,
    deleteLocalProfile,
    isGuestId,
} from "@/lib/local-store";

// ---------------------------------------------------------------------------
// Constants & types
// ---------------------------------------------------------------------------
export type ProfileColor =
    | "violet"
    | "fuchsia"
    | "sky"
    | "emerald"
    | "amber"
    | "rose";

export interface ProfileColorDef {
    id: ProfileColor;
    gradient: string;
    bg: string;
    ring: string;
    text: string;
}

export const PROFILE_COLORS: ProfileColorDef[] = [
    { id: "violet", gradient: "from-violet-400 to-purple-500", bg: "bg-violet-100", ring: "ring-violet-300", text: "text-violet-700" },
    { id: "fuchsia", gradient: "from-fuchsia-400 to-pink-500", bg: "bg-fuchsia-100", ring: "ring-fuchsia-300", text: "text-fuchsia-700" },
    { id: "sky", gradient: "from-sky-400 to-blue-500", bg: "bg-sky-100", ring: "ring-sky-300", text: "text-sky-700" },
    { id: "emerald", gradient: "from-emerald-400 to-teal-500", bg: "bg-emerald-100", ring: "ring-emerald-300", text: "text-emerald-700" },
    { id: "amber", gradient: "from-amber-400 to-orange-500", bg: "bg-amber-100", ring: "ring-amber-300", text: "text-amber-700" },
    { id: "rose", gradient: "from-rose-400 to-red-500", bg: "bg-rose-100", ring: "ring-rose-300", text: "text-rose-700" },
];

export const AVATAR_OPTIONS = [
    "🦊", "🐼", "🐸", "🦁", "🐧", "🦄", "🐙", "🦋",
    "🐉", "🦖", "🐺", "🦝", "🐨", "🦦", "🐮", "🦔",
];

export interface UserProfile {
    id: string;
    household_id: string;
    name: string;
    avatar: string;
    color: ProfileColor;
    level: string;
}

// ---------------------------------------------------------------------------
// Active profile — localStorage (device preference, sync)
// ---------------------------------------------------------------------------
const LS_KEY = "brainy:activeProfileId";
const profileIdListeners = new Set<() => void>();

export function getActiveProfileId(): string | null {
    try {
        return localStorage.getItem(LS_KEY);
    } catch {
        return null;
    }
}

function setActiveProfileIdLS(id: string | null): void {
    try {
        if (id) localStorage.setItem(LS_KEY, id);
        else localStorage.removeItem(LS_KEY);
    } catch { }
    profileIdListeners.forEach((l) => l());
}

/** Public setter — used by the sync-on-login function. */
export function setActiveProfileId(id: string | null): void {
    setActiveProfileIdLS(id);
}

function subscribeProfileId(listener: () => void): () => void {
    profileIdListeners.add(listener);
    return () => profileIdListeners.delete(listener);
}

export function useActiveProfileId(): string | null {
    return useSyncExternalStore(
        subscribeProfileId,
        getActiveProfileId,
        getActiveProfileId,
    );
}

// ---------------------------------------------------------------------------
// Profiles — React Query + Supabase (with guest localStorage fallback)
// ---------------------------------------------------------------------------
export function useProfiles() {
    const { session } = useSession();
    return useQuery<UserProfile[]>({
        queryKey: ["profiles", session?.user.id ?? "guest"],
        queryFn: async () => {
            if (!session) return getLocalProfiles();
            const { data, error } = await supabase
                .from("profiles")
                .select("*")
                .order("created_at", { ascending: true });
            if (error) throw error;
            return (data ?? []) as UserProfile[];
        },
    });
}

export function useActiveProfile() {
    const id = useActiveProfileId();
    const { session } = useSession();
    return useQuery<UserProfile | null>({
        queryKey: ["active-profile", id],
        queryFn: async () => {
            if (!id) return null;
            if (!session || isGuestId(id)) {
                return getLocalProfiles().find((p) => p.id === id) ?? null;
            }
            const { data } = await supabase
                .from("profiles")
                .select("*")
                .eq("id", id)
                .maybeSingle();
            return (data ?? null) as UserProfile | null;
        },
        enabled: Boolean(id),
    });
}

// ---------------------------------------------------------------------------
// Mutations
// ---------------------------------------------------------------------------
export function useSetActiveProfile() {
    const qc = useQueryClient();
    return useCallback(
        (id: string) => {
            setActiveProfileIdLS(id);
            qc.invalidateQueries();
        },
        [qc],
    );
}

export function useCreateProfile() {
    const qc = useQueryClient();
    const { session } = useSession();
    return useMutation({
        mutationFn: async (
            profile: Pick<UserProfile, "name" | "avatar" | "color" | "level">,
        ) => {
            if (!session) {
                return createLocalProfile(profile);
            }
            const { data: household, error: hErr } = await supabase
                .from("households")
                .select("id")
                .maybeSingle();
            if (hErr || !household) throw new Error("Household not found. Please sign in again.");

            const { data, error } = await supabase
                .from("profiles")
                .insert({ ...profile, household_id: household.id })
                .select()
                .single();
            if (error) throw error;
            return data as UserProfile;
        },
        onSuccess: (newProfile) => {
            if (!getActiveProfileId()) {
                setActiveProfileIdLS(newProfile.id);
            }
            qc.invalidateQueries({ queryKey: ["profiles"] });
        },
    });
}

export function useUpdateProfile() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: async ({
            id,
            updates,
        }: {
            id: string;
            updates: Partial<Pick<UserProfile, "name" | "avatar" | "color" | "level">>;
        }) => {
            if (isGuestId(id)) {
                updateLocalProfile(id, updates);
                return;
            }
            const { error } = await supabase
                .from("profiles")
                .update(updates)
                .eq("id", id);
            if (error) throw error;
        },
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["profiles"] });
            qc.invalidateQueries({ queryKey: ["active-profile"] });
            qc.invalidateQueries({ queryKey: ["profile-level"] });
        },
    });
}

export function useDeleteProfile() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: async (id: string) => {
            if (isGuestId(id)) {
                deleteLocalProfile(id);
                return;
            }
            const { error } = await supabase.from("profiles").delete().eq("id", id);
            if (error) throw error;
        },
        onSuccess: (_data, deletedId) => {
            if (getActiveProfileId() === deletedId) {
                setActiveProfileIdLS(null);
            }
            qc.invalidateQueries({ queryKey: ["profiles"] });
        },
    });
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
/** Pick the first color not already used by existing profiles. */
export function pickNextColor(existingProfiles: UserProfile[]): ProfileColor {
    const used = new Set(existingProfiles.map((p) => p.color));
    return PROFILE_COLORS.find((c) => !used.has(c.id))?.id ?? "violet";
}
