import { useState } from "react";
import {
    Star,
    Gift,
    Plus,
    Pencil,
    Trash2,
    Check,
    X,
    Lock,
    Unlock,
    ShoppingBag,
    Clock,
    PartyPopper,
    AlertCircle,
} from "lucide-react";
import { useProgress } from "@/lib/brainy-hooks";
import { useRewards, type Reward } from "@/lib/rewards-store";
import { Confetti } from "@/components/brainy/Confetti";
import { cn } from "@/lib/utils";

const EMOJI_CHOICES = [
    "🎁", "📺", "🍦", "🍕", "🎮", "🧸", "🌙", "🍿", "🎬", "🍪",
    "⚽", "🚲", "🎨", "📚", "🐶", "🎢", "💰", "🍫", "🧁", "🏖️",
];

// ---------------------------------------------------------------------------
// Reward add / edit form (parent only)
// ---------------------------------------------------------------------------
function RewardForm({
    initial,
    onSave,
    onCancel,
}: {
    initial?: Reward;
    onSave: (data: { emoji: string; title: string; cost: number }) => void;
    onCancel: () => void;
}) {
    const [emoji, setEmoji] = useState(initial?.emoji ?? EMOJI_CHOICES[0]);
    const [title, setTitle] = useState(initial?.title ?? "");
    const [cost, setCost] = useState(String(initial?.cost ?? 25));
    const [error, setError] = useState("");

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const trimmed = title.trim();
        const costNum = Number(cost);
        if (!trimmed) return setError("Give the reward a name.");
        if (!Number.isFinite(costNum) || costNum < 1) return setError("Cost must be at least 1 star.");
        onSave({ emoji, title: trimmed, cost: Math.round(costNum) });
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 rounded-2xl border border-amber-200 bg-amber-50/70 p-4">
            <div className="flex flex-col gap-1.5">
                <span className="text-xs font-bold text-slate-700">Icon</span>
                <div className="flex flex-wrap gap-1.5">
                    {EMOJI_CHOICES.map((em) => (
                        <button
                            key={em}
                            type="button"
                            aria-label={`Icon ${em}`}
                            aria-pressed={emoji === em}
                            onClick={() => setEmoji(em)}
                            className={cn(
                                "h-9 w-9 rounded-lg text-lg flex items-center justify-center transition-all",
                                emoji === em
                                    ? "bg-gradient-to-br from-amber-400 to-orange-400 shadow ring-2 ring-white/70 scale-110"
                                    : "bg-white border border-slate-200 hover:scale-105",
                            )}
                        >
                            {em}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex flex-col gap-1.5">
                <label htmlFor="reward-title" className="text-xs font-bold text-slate-700">Reward name</label>
                <input
                    id="reward-title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Movie night pick"
                    maxLength={40}
                    className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-800 shadow-sm outline-none focus:ring-2 focus:ring-amber-400 transition"
                />
            </div>

            <div className="flex flex-col gap-1.5">
                <label htmlFor="reward-cost" className="text-xs font-bold text-slate-700">Cost in stars</label>
                <div className="relative w-32">
                    <Star className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 size-4 fill-amber-400 text-amber-500" />
                    <input
                        id="reward-cost"
                        type="number"
                        min={1}
                        value={cost}
                        onChange={(e) => setCost(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-white pl-9 pr-3 py-2 text-sm font-bold text-slate-800 shadow-sm outline-none focus:ring-2 focus:ring-amber-400 transition"
                    />
                </div>
            </div>

            {error && (
                <div className="flex items-center gap-2 text-xs text-red-600 bg-red-50 rounded-lg px-3 py-2">
                    <AlertCircle className="size-3.5 flex-shrink-0" />{error}
                </div>
            )}

            <div className="flex gap-2 justify-end">
                <button type="button" onClick={onCancel}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors">
                    <X className="size-3.5" />Cancel
                </button>
                <button type="submit"
                    className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-3 py-1.5 text-xs font-bold text-white shadow hover:opacity-90 transition-opacity">
                    <Check className="size-3.5" />{initial ? "Save" : "Add Reward"}
                </button>
            </div>
        </form>
    );
}

// ---------------------------------------------------------------------------
// Parent PIN gate
// ---------------------------------------------------------------------------
function ParentGate({
    pin,
    onUnlock,
    onCancel,
    onSetPin,
}: {
    pin: string | null;
    onUnlock: () => void;
    onCancel: () => void;
    onSetPin: (pin: string) => void;
}) {
    const [entered, setEntered] = useState("");
    const [confirm, setConfirm] = useState("");
    const [error, setError] = useState("");
    const isSettingUp = pin === null;

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (isSettingUp) {
            if (!/^\d{4}$/.test(entered)) return setError("PIN must be 4 digits.");
            if (entered !== confirm) return setError("PINs don't match.");
            onSetPin(entered);
            onUnlock();
        } else {
            if (entered === pin) {
                onUnlock();
            } else {
                setError("Incorrect PIN.");
                setEntered("");
            }
        }
    }

    return (
        <div className="rounded-2xl border-2 border-violet-200 bg-violet-50 p-5">
            <div className="flex items-center gap-2 mb-3">
                <Lock className="size-4 text-violet-600" />
                <h4 className="font-bold text-slate-800 text-sm">
                    {isSettingUp ? "Set a Parent PIN" : "Enter Parent PIN"}
                </h4>
            </div>
            <p className="text-xs text-slate-500 mb-4">
                {isSettingUp
                    ? "Create a 4-digit PIN so only grown-ups can manage rewards and approve them."
                    : "Enter your 4-digit PIN to manage rewards and approve redemptions."}
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input
                    type="password"
                    inputMode="numeric"
                    autoComplete="off"
                    maxLength={4}
                    value={entered}
                    onChange={(e) => setEntered(e.target.value.replace(/\D/g, ""))}
                    placeholder="• • • •"
                    aria-label="Parent PIN"
                    className="w-40 rounded-xl border border-slate-200 bg-white px-3 py-2 text-center text-lg font-bold tracking-[0.4em] text-slate-800 shadow-sm outline-none focus:ring-2 focus:ring-violet-400 transition"
                />
                {isSettingUp && (
                    <input
                        type="password"
                        inputMode="numeric"
                        autoComplete="off"
                        maxLength={4}
                        value={confirm}
                        onChange={(e) => setConfirm(e.target.value.replace(/\D/g, ""))}
                        placeholder="Confirm PIN"
                        aria-label="Confirm parent PIN"
                        className="w-40 rounded-xl border border-slate-200 bg-white px-3 py-2 text-center text-lg font-bold tracking-[0.4em] text-slate-800 shadow-sm outline-none focus:ring-2 focus:ring-violet-400 transition"
                    />
                )}
                {error && (
                    <div className="flex items-center gap-2 text-xs text-red-600">
                        <AlertCircle className="size-3.5 flex-shrink-0" />{error}
                    </div>
                )}
                <div className="flex gap-2">
                    <button type="submit"
                        className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 px-4 py-2 text-sm font-bold text-white shadow hover:opacity-90 transition-opacity">
                        <Unlock className="size-4" />{isSettingUp ? "Set PIN & Unlock" : "Unlock"}
                    </button>
                    <button type="button" onClick={onCancel}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors">
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

// ---------------------------------------------------------------------------
// Main rewards store
// ---------------------------------------------------------------------------
export function RewardsStore({ profileId, profileName }: { profileId: string; profileName: string }) {
    const { data: progress } = useProgress();
    const {
        rewards,
        redemptions,
        parentPin,
        spent,
        addReward,
        updateReward,
        deleteReward,
        redeem,
        fulfillRedemption,
        refundRedemption,
        setParentPin,
    } = useRewards(profileId);

    const totalStars = progress?.totalStars ?? 0;
    const available = Math.max(0, totalStars - spent);

    const [parentMode, setParentMode] = useState(false);
    const [showGate, setShowGate] = useState(false);
    const [showAdd, setShowAdd] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [celebrate, setCelebrate] = useState<string | null>(null);

    const pending = redemptions.filter((r) => r.status === "pending");
    const sortedRewards = [...rewards].sort((a, b) => a.cost - b.cost);

    function handleRedeem(reward: Reward) {
        if (available < reward.cost) return;
        redeem(reward.id);
        setCelebrate(reward.title);
        setTimeout(() => setCelebrate((c) => (c === reward.title ? null : c)), 2600);
    }

    function exitParentMode() {
        setParentMode(false);
        setShowAdd(false);
        setEditingId(null);
    }

    return (
        <section className="relative rounded-3xl border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50/60 p-5 sm:p-6 overflow-hidden">
            {celebrate && <Confetti />}

            {/* Header */}
            <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-2xl text-white shadow ring-2 ring-white/70">
                        🎁
                    </span>
                    <div>
                        <h2 className="text-lg font-extrabold text-slate-800 leading-tight">Rewards Store</h2>
                        <p className="text-xs text-slate-500">Trade {profileName}'s stars for real treats!</p>
                    </div>
                </div>
                {parentMode ? (
                    <button type="button" onClick={exitParentMode}
                        className="inline-flex items-center gap-1.5 rounded-full bg-violet-500 px-3 py-1.5 text-xs font-bold text-white shadow hover:bg-violet-600 transition-colors">
                        <Unlock className="size-3.5" />Done
                    </button>
                ) : (
                    <button type="button" onClick={() => setShowGate(true)}
                        className="inline-flex items-center gap-1.5 rounded-full border border-violet-200 bg-white px-3 py-1.5 text-xs font-bold text-violet-700 hover:bg-violet-50 transition-colors">
                        <Lock className="size-3.5" />Parent Controls
                    </button>
                )}
            </div>

            {/* Available balance */}
            <div className="mt-4 flex flex-wrap items-center gap-3 rounded-2xl bg-white/80 border border-amber-100 px-4 py-3">
                <div className="flex items-center gap-2">
                    <Star className="size-7 fill-amber-400 text-amber-500" />
                    <div>
                        <p className="text-2xl font-extrabold text-amber-700 leading-none">{available}</p>
                        <p className="text-[11px] font-semibold text-slate-500 mt-0.5">stars to spend</p>
                    </div>
                </div>
                <div className="ml-auto text-right">
                    <p className="text-xs font-semibold text-slate-500">{totalStars} earned all-time</p>
                    {spent > 0 && <p className="text-xs text-slate-400">{spent} spent on rewards</p>}
                </div>
            </div>

            {/* Parent gate */}
            {showGate && !parentMode && (
                <div className="mt-4">
                    <ParentGate
                        pin={parentPin}
                        onUnlock={() => { setParentMode(true); setShowGate(false); }}
                        onCancel={() => setShowGate(false)}
                        onSetPin={(p) => setParentPin(p)}
                    />
                </div>
            )}

            {/* Pending approvals (parent mode) */}
            {parentMode && pending.length > 0 && (
                <div className="mt-4 rounded-2xl border border-violet-200 bg-violet-50/70 p-4">
                    <h3 className="flex items-center gap-1.5 text-sm font-bold text-slate-800 mb-3">
                        <Clock className="size-4 text-violet-500" />Waiting for you ({pending.length})
                    </h3>
                    <ul className="flex flex-col gap-2">
                        {pending.map((r) => (
                            <li key={r.id} className="flex items-center gap-3 rounded-xl bg-white border border-slate-100 px-3 py-2">
                                <span className="text-xl">{r.emoji}</span>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-bold text-slate-800 truncate">{r.title}</p>
                                    <p className="text-[11px] text-slate-400">{r.cost} ⭐ · {new Date(r.redeemedAt).toLocaleDateString()}</p>
                                </div>
                                <button type="button" onClick={() => fulfillRedemption(r.id)}
                                    className="inline-flex items-center gap-1 rounded-lg bg-emerald-500 px-2.5 py-1.5 text-xs font-bold text-white hover:bg-emerald-600 transition-colors">
                                    <Check className="size-3.5" />Given
                                </button>
                                <button type="button" onClick={() => refundRedemption(r.id)} aria-label="Decline and refund stars"
                                    className="inline-flex items-center justify-center rounded-lg border border-red-100 bg-red-50 p-1.5 text-red-400 hover:bg-red-100 hover:text-red-600 transition-colors">
                                    <X className="size-3.5" />
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Reward catalog */}
            <div className="mt-4">
                <div className="flex items-center justify-between mb-2.5">
                    <h3 className="flex items-center gap-1.5 text-sm font-bold text-slate-700">
                        <ShoppingBag className="size-4 text-amber-500" />Rewards
                    </h3>
                    {parentMode && !showAdd && (
                        <button type="button" onClick={() => setShowAdd(true)}
                            className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-3 py-1 text-xs font-bold text-white shadow hover:opacity-90 transition-opacity">
                            <Plus className="size-3.5" />New
                        </button>
                    )}
                </div>

                {parentMode && showAdd && (
                    <div className="mb-3">
                        <RewardForm
                            onSave={(data) => { addReward(data); setShowAdd(false); }}
                            onCancel={() => setShowAdd(false)}
                        />
                    </div>
                )}

                {sortedRewards.length === 0 && !showAdd && (
                    <div className="flex flex-col items-center gap-2 rounded-2xl border-2 border-dashed border-amber-200 bg-white/50 px-6 py-8 text-center">
                        <Gift className="size-7 text-amber-300" />
                        <p className="text-sm font-bold text-slate-600">No rewards yet</p>
                        <p className="text-xs text-slate-400 max-w-xs">
                            {parentMode ? "Tap “New” to create a reward kids can trade their stars for." : "Ask a grown-up to set up some rewards in Parent Controls!"}
                        </p>
                    </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {sortedRewards.map((reward) => {
                        if (parentMode && editingId === reward.id) {
                            return (
                                <div key={reward.id} className="sm:col-span-2">
                                    <RewardForm
                                        initial={reward}
                                        onSave={(data) => { updateReward(reward.id, data); setEditingId(null); }}
                                        onCancel={() => setEditingId(null)}
                                    />
                                </div>
                            );
                        }
                        const affordable = available >= reward.cost;
                        return (
                            <div key={reward.id}
                                className={cn(
                                    "flex items-center gap-3 rounded-2xl border bg-white p-3 transition-all",
                                    affordable ? "border-amber-200 shadow-sm" : "border-slate-100 opacity-80",
                                )}>
                                <span className="inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-amber-50 text-2xl">
                                    {reward.emoji}
                                </span>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-bold text-slate-800 leading-tight truncate">{reward.title}</p>
                                    <p className="inline-flex items-center gap-1 text-xs font-bold text-amber-600 mt-0.5">
                                        <Star className="size-3.5 fill-amber-400 text-amber-500" />{reward.cost} stars
                                    </p>
                                </div>
                                {parentMode ? (
                                    <div className="flex gap-1">
                                        <button type="button" onClick={() => setEditingId(reward.id)} aria-label={`Edit ${reward.title}`}
                                            className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white p-1.5 text-slate-500 hover:bg-slate-50 transition-colors">
                                            <Pencil className="size-3.5" />
                                        </button>
                                        <button type="button" onClick={() => deleteReward(reward.id)} aria-label={`Delete ${reward.title}`}
                                            className="inline-flex items-center justify-center rounded-lg border border-red-100 bg-red-50 p-1.5 text-red-400 hover:bg-red-100 hover:text-red-600 transition-colors">
                                            <Trash2 className="size-3.5" />
                                        </button>
                                    </div>
                                ) : (
                                    <button type="button" onClick={() => handleRedeem(reward)} disabled={!affordable}
                                        className={cn(
                                            "inline-flex items-center gap-1 rounded-xl px-3 py-2 text-xs font-bold shadow transition-all",
                                            affordable
                                                ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:opacity-90"
                                                : "bg-slate-100 text-slate-400 cursor-not-allowed",
                                        )}>
                                        {affordable ? <><Gift className="size-3.5" />Redeem</> : `Need ${reward.cost - available} more`}
                                    </button>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Redemption history */}
            {redemptions.length > 0 && (
                <div className="mt-5">
                    <h3 className="flex items-center gap-1.5 text-sm font-bold text-slate-700 mb-2.5">
                        <PartyPopper className="size-4 text-amber-500" />My Redemptions
                    </h3>
                    <ul className="flex flex-col gap-1.5">
                        {redemptions.map((r) => (
                            <li key={r.id} className="flex items-center gap-3 rounded-xl bg-white/70 border border-slate-100 px-3 py-2">
                                <span className="text-lg">{r.emoji}</span>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold text-slate-700 truncate">{r.title}</p>
                                    <p className="text-[11px] text-slate-400">{r.cost} ⭐ · {new Date(r.redeemedAt).toLocaleDateString()}</p>
                                </div>
                                {r.status === "fulfilled" ? (
                                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-1 text-[11px] font-bold text-emerald-700">
                                        <Check className="size-3" />Given
                                    </span>
                                ) : (
                                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-1 text-[11px] font-bold text-amber-700">
                                        <Clock className="size-3" />Pending
                                    </span>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Celebration toast */}
            {celebrate && (
                <div className="pointer-events-none absolute inset-x-0 top-1/3 flex justify-center z-10">
                    <div className="rounded-2xl bg-white px-5 py-3 shadow-xl border border-amber-200 text-center animate-bounce">
                        <p className="text-2xl">🎉</p>
                        <p className="text-sm font-extrabold text-slate-800">Redeemed!</p>
                        <p className="text-xs text-slate-500">Ask a grown-up for your {celebrate}.</p>
                    </div>
                </div>
            )}
        </section>
    );
}
