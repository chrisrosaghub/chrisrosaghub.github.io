import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Plus, Pencil, Trash2, Check, X, Star, Flame, Loader2, AlertCircle, CloudOff } from "lucide-react";
import { useSession } from "@/lib/auth-context";
import {
    useProfiles,
    useActiveProfileId,
    useSetActiveProfile,
    useCreateProfile,
    useUpdateProfile,
    useDeleteProfile,
    pickNextColor,
    PROFILE_COLORS,
    AVATAR_OPTIONS,
    type UserProfile,
    type ProfileColor,
} from "@/lib/profiles";
import { useProgress, useLevel } from "@/lib/brainy-hooks";
import { LEVELS } from "@/lib/brainy-data";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Profile form (create or edit)
// ---------------------------------------------------------------------------
function ProfileForm({
    initial,
    existingProfiles,
    onSave,
    onCancel,
    isSaving,
    error,
}: {
    initial?: Partial<UserProfile>;
    existingProfiles: UserProfile[];
    onSave: (data: Pick<UserProfile, "name" | "avatar" | "color" | "level">) => void;
    onCancel: () => void;
    isSaving: boolean;
    error?: string;
}) {
    const [name, setName] = useState(initial?.name ?? "");
    const [avatar, setAvatar] = useState(initial?.avatar ?? AVATAR_OPTIONS[0]);
    const [color, setColor] = useState<ProfileColor>(initial?.color ?? pickNextColor(existingProfiles));
    const [level, setLevel] = useState(initial?.level ?? "grade2");

    const colorDef = PROFILE_COLORS.find((c) => c.id === color) ?? PROFILE_COLORS[0];

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const trimmed = name.trim();
        if (!trimmed) return;
        onSave({ name: trimmed, avatar, color, level });
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 rounded-2xl border border-violet-200 bg-violet-50/60 p-5">
            {/* Name */}
            <div className="flex flex-col gap-1.5">
                <label htmlFor="profile-name" className="text-sm font-bold text-slate-700">Name</label>
                <input
                    id="profile-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Alex"
                    maxLength={24}
                    required
                    className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-800 shadow-sm outline-none focus:ring-2 focus:ring-violet-400 transition"
                />
            </div>

            {/* Avatar */}
            <div className="flex flex-col gap-1.5">
                <span className="text-sm font-bold text-slate-700">Avatar</span>
                <div className="flex flex-wrap gap-2">
                    {AVATAR_OPTIONS.map((em) => (
                        <button key={em} type="button" aria-label={`Avatar ${em}`} aria-pressed={avatar === em}
                            onClick={() => setAvatar(em)}
                            className={cn("h-10 w-10 rounded-xl text-xl flex items-center justify-center transition-all",
                                avatar === em ? "bg-gradient-to-br " + colorDef.gradient + " shadow ring-2 ring-white/70 scale-110" : "bg-white border border-slate-200 hover:scale-105")}
                        >{em}</button>
                    ))}
                </div>
            </div>

            {/* Color */}
            <div className="flex flex-col gap-1.5">
                <span className="text-sm font-bold text-slate-700">Color</span>
                <div className="flex gap-2 flex-wrap">
                    {PROFILE_COLORS.map((c) => (
                        <button key={c.id} type="button" aria-label={`Color ${c.id}`} aria-pressed={color === c.id}
                            onClick={() => setColor(c.id)}
                            className={cn("h-8 w-8 rounded-full bg-gradient-to-br transition-all", c.gradient,
                                color === c.id ? "ring-2 ring-offset-2 ring-slate-400 scale-110" : "opacity-70 hover:opacity-100 hover:scale-105")}
                        />
                    ))}
                </div>
            </div>

            {/* Grade level */}
            <div className="flex flex-col gap-1.5">
                <span className="text-sm font-bold text-slate-700">Grade Level</span>
                <div className="flex flex-wrap gap-2">
                    {LEVELS.map((lvl) => (
                        <button key={lvl.id} type="button" aria-pressed={level === lvl.id}
                            onClick={() => setLevel(lvl.id)}
                            className={cn("inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition-all",
                                level === lvl.id ? "bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white shadow" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50")}
                        >
                            <span>{lvl.emoji}</span><span>{lvl.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Preview */}
            <div className="flex items-center gap-3 rounded-xl bg-white border border-slate-100 px-4 py-3">
                <span className={cn("inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br text-white text-lg shadow ring-2 ring-white/70", colorDef.gradient)}>
                    {avatar}
                </span>
                <span className="font-bold text-slate-800 text-sm">{name || "Your name"}</span>
            </div>

            {error && (
                <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 rounded-xl px-3 py-2">
                    <AlertCircle className="size-4 flex-shrink-0" />{error}
                </div>
            )}

            <div className="flex gap-2 justify-end">
                <button type="button" onClick={onCancel} disabled={isSaving}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors disabled:opacity-50">
                    <X className="size-4" />Cancel
                </button>
                <button type="submit" disabled={isSaving}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 px-4 py-2 text-sm font-bold text-white shadow hover:opacity-90 transition-opacity disabled:opacity-60">
                    {isSaving ? <Loader2 className="size-4 animate-spin" /> : <Check className="size-4" />}
                    {initial?.id ? "Save Changes" : "Create Profile"}
                </button>
            </div>
        </form>
    );
}

// ---------------------------------------------------------------------------
// Profile card (active profile shows live stats)
// ---------------------------------------------------------------------------
function ProfileCard({ profile, isActive, onSwitch, onEdit, onDelete }: {
    profile: UserProfile;
    isActive: boolean;
    onSwitch: () => void;
    onEdit: () => void;
    onDelete: () => void;
}) {
    const colorDef = PROFILE_COLORS.find((c) => c.id === profile.color) ?? PROFILE_COLORS[0];
    const { data: progress } = useProgress();
    const level = useLevel();
    const levelDef = LEVELS.find((l) => l.id === level);

    return (
        <div className={cn("relative rounded-2xl border-2 p-5 transition-all",
            isActive ? "border-violet-400 bg-gradient-to-br from-violet-50 to-fuchsia-50 shadow-lg" : "border-slate-200 bg-white hover:border-violet-200 hover:shadow")}>
            {isActive && <span className="absolute top-3 right-3 rounded-full bg-violet-500 px-2 py-0.5 text-[10px] font-bold text-white uppercase tracking-wide shadow">Active</span>}

            <div className="flex items-start gap-4">
                <span className={cn("inline-flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br text-2xl text-white shadow-md ring-2 ring-white/70", colorDef.gradient)}>
                    {profile.avatar}
                </span>
                <div className="flex-1 min-w-0">
                    <p className="font-extrabold text-slate-800 text-base truncate">{profile.name}</p>
                    {isActive && levelDef && (
                        <p className="text-xs font-semibold text-violet-600 mt-0.5">{levelDef.emoji} {levelDef.label}</p>
                    )}
                    {!isActive && (
                        <p className="text-xs text-slate-400 mt-1">Click to switch</p>
                    )}
                    {isActive && (
                        <div className="flex gap-3 mt-2">
                            <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-700">
                                <Star className="size-3.5 fill-amber-400 text-amber-500" />{progress?.totalStars ?? 0} stars
                            </span>
                            <span className="inline-flex items-center gap-1 text-xs font-bold text-orange-700">
                                <Flame className="size-3.5 text-orange-500" />{progress?.streakDays ?? 0} day streak
                            </span>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex gap-2 mt-4">
                {!isActive && (
                    <button type="button" onClick={onSwitch}
                        className={cn("flex-1 rounded-xl py-2 text-sm font-bold text-white shadow transition-opacity hover:opacity-90 bg-gradient-to-r", colorDef.gradient)}>
                        Switch to {profile.name}
                    </button>
                )}
                <button type="button" onClick={onEdit} aria-label={`Edit ${profile.name}`}
                    className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white p-2 text-slate-500 hover:bg-slate-50 transition-colors">
                    <Pencil className="size-4" />
                </button>
                <button type="button" onClick={onDelete} aria-label={`Delete ${profile.name}`}
                    className="inline-flex items-center justify-center rounded-xl border border-red-100 bg-red-50 p-2 text-red-400 hover:bg-red-100 hover:text-red-600 transition-colors">
                    <Trash2 className="size-4" />
                </button>
            </div>
        </div>
    );
}

function DeleteConfirm({ profile, onConfirm, onCancel, isDeleting }: {
    profile: UserProfile; onConfirm: () => void; onCancel: () => void; isDeleting: boolean;
}) {
    return (
        <div className="rounded-2xl border-2 border-red-200 bg-red-50 p-5 flex flex-col gap-3">
            <p className="text-sm font-bold text-red-700">
                Delete <span className="font-extrabold">{profile.name}</span>? This will permanently erase all their progress.
            </p>
            <div className="flex gap-2 justify-end">
                <button type="button" onClick={onCancel} disabled={isDeleting}
                    className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors disabled:opacity-50">
                    Cancel
                </button>
                <button type="button" onClick={onConfirm} disabled={isDeleting}
                    className="inline-flex items-center gap-2 rounded-xl bg-red-500 px-4 py-2 text-sm font-bold text-white hover:bg-red-600 transition-colors disabled:opacity-60">
                    {isDeleting && <Loader2 className="size-4 animate-spin" />}Yes, Delete
                </button>
            </div>
        </div>
    );
}

// ---------------------------------------------------------------------------
// Main page
// ---------------------------------------------------------------------------
export default function ProfilesPage() {
    const [searchParams] = useSearchParams();
    const { data: profiles = [], isLoading } = useProfiles();
    const activeId = useActiveProfileId();
    const setActive = useSetActiveProfile();
    const createProfile = useCreateProfile();
    const updateProfile = useUpdateProfile();
    const deleteProfile = useDeleteProfile();

    const { session } = useSession();
    const [showCreate, setShowCreate] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    useEffect(() => {
        if (searchParams.get("new") === "1") setShowCreate(true);
    }, [searchParams]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-20">
                <Loader2 className="size-8 text-violet-400 animate-spin" />
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto py-2 flex flex-col gap-8">
            <div className="flex items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-extrabold text-slate-800">Profiles</h1>
                    <p className="text-sm text-slate-500 mt-0.5">
                        {session
                            ? "Each profile keeps its own progress, grade level, and stars — saved to the cloud."
                            : "Each profile keeps its own progress, grade level, and stars — saved on this device."}
                    </p>
                </div>
                {!showCreate && (
                    <button type="button" onClick={() => setShowCreate(true)}
                        className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 px-4 py-2.5 text-sm font-bold text-white shadow hover:opacity-90 transition-opacity">
                        <Plus className="size-4" /><span>Add Profile</span>
                    </button>
                )}
            </div>

            {/* Guest mode banner */}
            {!session && (
                <div className="flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm">
                    <CloudOff className="size-4 text-amber-500 mt-0.5 shrink-0" />
                    <div className="flex-1">
                        <p className="font-semibold text-amber-800">Progress saves on this device only</p>
                        <p className="text-amber-700 mt-0.5">Profiles and stars are stored in your browser. To back them up and access across devices,{" "}
                            <Link to="/login" className="underline font-semibold hover:text-amber-900">sign in with Google</Link>.
                        </p>
                    </div>
                </div>
            )}

            {showCreate && (
                <ProfileForm
                    existingProfiles={profiles}
                    onSave={(data) => {
                        createProfile.mutate(data, { onSuccess: () => setShowCreate(false) });
                    }}
                    onCancel={() => setShowCreate(false)}
                    isSaving={createProfile.isPending}
                    error={createProfile.error?.message}
                />
            )}

            {profiles.length === 0 && !showCreate && (
                <div className="flex flex-col items-center gap-4 rounded-2xl border-2 border-dashed border-violet-200 bg-violet-50/40 px-6 py-12 text-center">
                    <span className="text-5xl">👨‍👩‍👧‍👦</span>
                    <p className="font-bold text-slate-700">No profiles yet</p>
                    <p className="text-sm text-slate-500 max-w-xs">Create a profile for each family member so everyone tracks their own stars and progress.</p>
                    <button type="button" onClick={() => setShowCreate(true)}
                        className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 px-5 py-2.5 text-sm font-bold text-white shadow hover:opacity-90 transition-opacity">
                        <Plus className="size-4" />Create First Profile
                    </button>
                </div>
            )}

            {profiles.length > 0 && (
                <div className="flex flex-col gap-4">
                    {profiles.map((profile) => {
                        if (deletingId === profile.id) {
                            return (
                                <DeleteConfirm key={profile.id} profile={profile} isDeleting={deleteProfile.isPending}
                                    onConfirm={() => { deleteProfile.mutate(profile.id, { onSuccess: () => setDeletingId(null) }); }}
                                    onCancel={() => setDeletingId(null)}
                                />
                            );
                        }
                        if (editingId === profile.id) {
                            return (
                                <ProfileForm key={profile.id} initial={profile} existingProfiles={profiles}
                                    onSave={(data) => { updateProfile.mutate({ id: profile.id, updates: data }, { onSuccess: () => setEditingId(null) }); }}
                                    onCancel={() => setEditingId(null)}
                                    isSaving={updateProfile.isPending}
                                    error={updateProfile.error?.message}
                                />
                            );
                        }
                        return (
                            <ProfileCard
                                key={profile.id}
                                profile={profile}
                                isActive={profile.id === activeId}
                                onSwitch={() => setActive(profile.id)}
                                onEdit={() => setEditingId(profile.id)}
                                onDelete={() => setDeletingId(profile.id)}
                            />
                        );
                    })}
                </div>
            )}
        </div>
    );
}
