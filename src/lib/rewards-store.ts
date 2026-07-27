/**
 * Rewards Store — lets kids trade earned stars for real-world rewards their
 * parents set up (extra screen time, a treat, a small toy, etc.).
 *
 * NOTE(ai): Persisted in localStorage per profile (for BOTH guest and signed-in
 * users). This keeps the feature working immediately without a Supabase schema
 * migration. Lifetime "totalStars" (which drives badges/achievements) is never
 * mutated — the spendable balance is derived as: totalStars − stars spent here.
 */
import { useCallback, useSyncExternalStore } from "react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export interface Reward {
    id: string;
    emoji: string;
    title: string;
    /** Cost in stars. */
    cost: number;
    createdAt: number;
}

export type RedemptionStatus = "pending" | "fulfilled";

export interface Redemption {
    id: string;
    rewardId: string;
    /** Snapshot of reward details at redemption time (reward may later change/delete). */
    title: string;
    emoji: string;
    cost: number;
    redeemedAt: number;
    status: RedemptionStatus;
}

export interface RewardsState {
    rewards: Reward[];
    redemptions: Redemption[];
    /** Optional 4-digit parent gate for managing rewards & approvals. */
    parentPin: string | null;
}

// ---------------------------------------------------------------------------
// Starter rewards (suggestions parents can keep, edit, or delete)
// ---------------------------------------------------------------------------
function starterRewards(): Reward[] {
    const now = Date.now();
    const seed: Omit<Reward, "id" | "createdAt">[] = [
        { emoji: "📺", title: "30 min screen time", cost: 20 },
        { emoji: "🍦", title: "Ice cream treat", cost: 25 },
        { emoji: "🌙", title: "Stay up 15 min late", cost: 30 },
        { emoji: "🍕", title: "Pick dinner tonight", cost: 40 },
        { emoji: "🎮", title: "1 hour game time", cost: 60 },
        { emoji: "🧸", title: "A small toy", cost: 100 },
    ];
    return seed.map((r, i) => ({
        ...r,
        id: `seed-${i}-${now}`,
        createdAt: now + i,
    }));
}

function defaultState(): RewardsState {
    return { rewards: starterRewards(), redemptions: [], parentPin: null };
}

// ---------------------------------------------------------------------------
// Storage + reactive cache
// ---------------------------------------------------------------------------
const lsKey = (profileId: string) => `brainy:rewards:${profileId}`;
const listeners = new Set<() => void>();
const cache = new Map<string, RewardsState>();

function emit() {
    listeners.forEach((l) => l());
}

function loadFromLS(profileId: string): RewardsState {
    try {
        const raw = localStorage.getItem(lsKey(profileId));
        if (!raw) return defaultState();
        const parsed = JSON.parse(raw) as Partial<RewardsState>;
        return {
            rewards: Array.isArray(parsed.rewards) ? parsed.rewards : [],
            redemptions: Array.isArray(parsed.redemptions) ? parsed.redemptions : [],
            parentPin: typeof parsed.parentPin === "string" ? parsed.parentPin : null,
        };
    } catch {
        return defaultState();
    }
}

function getState(profileId: string): RewardsState {
    let state = cache.get(profileId);
    if (!state) {
        state = loadFromLS(profileId);
        cache.set(profileId, state);
    }
    return state;
}

function setState(profileId: string, next: RewardsState): void {
    cache.set(profileId, next);
    try {
        localStorage.setItem(lsKey(profileId), JSON.stringify(next));
    } catch { }
    emit();
}

function subscribe(listener: () => void): () => void {
    listeners.add(listener);
    return () => listeners.delete(listener);
}

const EMPTY: RewardsState = { rewards: [], redemptions: [], parentPin: null };

// ---------------------------------------------------------------------------
// Derived helpers
// ---------------------------------------------------------------------------
/** Total stars committed to redemptions (pending + fulfilled). */
export function spentStars(state: RewardsState): number {
    return state.redemptions.reduce((sum, r) => sum + r.cost, 0);
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------
export interface UseRewardsResult {
    rewards: Reward[];
    redemptions: Redemption[];
    parentPin: string | null;
    spent: number;
    /** Add a new reward to the catalog. */
    addReward: (data: Pick<Reward, "emoji" | "title" | "cost">) => void;
    updateReward: (id: string, updates: Partial<Pick<Reward, "emoji" | "title" | "cost">>) => void;
    deleteReward: (id: string) => void;
    /** Redeem a reward, committing `cost` stars. Returns false if reward is gone. */
    redeem: (rewardId: string) => boolean;
    /** Mark a redemption fulfilled (parent gave the reward). */
    fulfillRedemption: (id: string) => void;
    /** Remove a redemption and refund its stars (e.g. parent declines / undo). */
    refundRedemption: (id: string) => void;
    setParentPin: (pin: string | null) => void;
}

export function useRewards(profileId: string | null): UseRewardsResult {
    const state = useSyncExternalStore(
        subscribe,
        () => (profileId ? getState(profileId) : EMPTY),
        () => EMPTY,
    );

    const addReward = useCallback<UseRewardsResult["addReward"]>(
        (data) => {
            if (!profileId) return;
            const cur = getState(profileId);
            const reward: Reward = {
                id: crypto.randomUUID(),
                emoji: data.emoji || "🎁",
                title: data.title.trim(),
                cost: Math.max(1, Math.round(data.cost)),
                createdAt: Date.now(),
            };
            setState(profileId, { ...cur, rewards: [...cur.rewards, reward] });
        },
        [profileId],
    );

    const updateReward = useCallback<UseRewardsResult["updateReward"]>(
        (id, updates) => {
            if (!profileId) return;
            const cur = getState(profileId);
            setState(profileId, {
                ...cur,
                rewards: cur.rewards.map((r) =>
                    r.id === id
                        ? {
                            ...r,
                            ...updates,
                            title: updates.title !== undefined ? updates.title.trim() : r.title,
                            cost: updates.cost !== undefined ? Math.max(1, Math.round(updates.cost)) : r.cost,
                        }
                        : r,
                ),
            });
        },
        [profileId],
    );

    const deleteReward = useCallback<UseRewardsResult["deleteReward"]>(
        (id) => {
            if (!profileId) return;
            const cur = getState(profileId);
            setState(profileId, { ...cur, rewards: cur.rewards.filter((r) => r.id !== id) });
        },
        [profileId],
    );

    const redeem = useCallback<UseRewardsResult["redeem"]>(
        (rewardId) => {
            if (!profileId) return false;
            const cur = getState(profileId);
            const reward = cur.rewards.find((r) => r.id === rewardId);
            if (!reward) return false;
            const redemption: Redemption = {
                id: crypto.randomUUID(),
                rewardId: reward.id,
                title: reward.title,
                emoji: reward.emoji,
                cost: reward.cost,
                redeemedAt: Date.now(),
                status: "pending",
            };
            setState(profileId, { ...cur, redemptions: [redemption, ...cur.redemptions] });
            return true;
        },
        [profileId],
    );

    const fulfillRedemption = useCallback<UseRewardsResult["fulfillRedemption"]>(
        (id) => {
            if (!profileId) return;
            const cur = getState(profileId);
            setState(profileId, {
                ...cur,
                redemptions: cur.redemptions.map((r) =>
                    r.id === id ? { ...r, status: "fulfilled" } : r,
                ),
            });
        },
        [profileId],
    );

    const refundRedemption = useCallback<UseRewardsResult["refundRedemption"]>(
        (id) => {
            if (!profileId) return;
            const cur = getState(profileId);
            setState(profileId, {
                ...cur,
                redemptions: cur.redemptions.filter((r) => r.id !== id),
            });
        },
        [profileId],
    );

    const setParentPin = useCallback<UseRewardsResult["setParentPin"]>(
        (pin) => {
            if (!profileId) return;
            const cur = getState(profileId);
            setState(profileId, { ...cur, parentPin: pin });
        },
        [profileId],
    );

    return {
        rewards: state.rewards,
        redemptions: state.redemptions,
        parentPin: state.parentPin,
        spent: spentStars(state),
        addReward,
        updateReward,
        deleteReward,
        redeem,
        fulfillRedemption,
        refundRedemption,
        setParentPin,
    };
}
