import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserRound, Plus, Settings, Loader2 } from "lucide-react";
import {
    useProfiles,
    useActiveProfileId,
    useSetActiveProfile,
    PROFILE_COLORS,
} from "@/lib/profiles";
import { cn } from "@/lib/utils";

export function ProfileSwitcher() {
    const { data: profiles = [], isLoading } = useProfiles();
    const activeId = useActiveProfileId();
    const setActive = useSetActiveProfile();
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const activeProfile = profiles.find((p) => p.id === activeId);

    // Close on outside click
    useEffect(() => {
        if (!open) return;
        function handleClick(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
        }
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, [open]);

    if (isLoading) {
        return (
            <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 bg-white/80 ring-1 ring-violet-200 shadow-sm">
                <Loader2 className="size-4 text-violet-400 animate-spin" />
            </div>
        );
    }

    if (profiles.length === 0) {
        return (
            <Link
                to="/profiles"
                className="inline-flex items-center gap-1.5 rounded-full bg-violet-100 text-violet-700 px-3 py-1.5 text-sm font-bold shadow-sm ring-1 ring-violet-200 hover:bg-violet-200 transition-colors"
                aria-label="Set up profiles"
            >
                <UserRound className="size-4" />
                <span className="hidden sm:inline">Add Profiles</span>
            </Link>
        );
    }

    return (
        <div ref={ref} className="relative">
            <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                aria-label={`Active profile: ${activeProfile?.name ?? "Select profile"}. Switch profile.`}
                aria-expanded={open}
                className="inline-flex items-center gap-2 rounded-full pl-1 pr-3 py-1 ring-1 ring-violet-200 bg-white/80 hover:bg-white shadow-sm transition-colors"
            >
                {activeProfile ? (
                    <span
                        className={cn(
                            "inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br text-white shadow ring-2 ring-white/70 text-base select-none",
                            PROFILE_COLORS.find((c) => c.id === activeProfile.color)?.gradient ?? "from-violet-400 to-purple-500",
                        )}
                        aria-hidden
                    >
                        {activeProfile.avatar}
                    </span>
                ) : (
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-100">
                        <UserRound className="size-4 text-slate-500" />
                    </span>
                )}
                <span className="text-sm font-bold text-slate-700 max-w-[80px] truncate">
                    {activeProfile?.name ?? "Select"}
                </span>
            </button>

            {open && (
                <div
                    role="menu"
                    aria-label="Profile switcher"
                    className="absolute right-0 top-full mt-2 z-50 min-w-[180px] rounded-2xl bg-white shadow-xl ring-1 ring-slate-200 p-2 flex flex-col gap-1"
                >
                    {profiles.map((profile) => {
                        const colorDef = PROFILE_COLORS.find((c) => c.id === profile.color) ?? PROFILE_COLORS[0];
                        const isActive = profile.id === activeId;
                        return (
                            <button
                                key={profile.id}
                                type="button"
                                role="menuitem"
                                aria-current={isActive}
                                onClick={() => { setActive(profile.id); setOpen(false); }}
                                className={cn(
                                    "flex items-center gap-3 w-full rounded-xl px-3 py-2 text-sm font-semibold transition-all text-left",
                                    isActive
                                        ? cn("text-white bg-gradient-to-r", colorDef.gradient)
                                        : "text-slate-700 hover:bg-slate-50",
                                )}
                            >
                                <span className="text-lg leading-none">{profile.avatar}</span>
                                <span className="flex-1 truncate">{profile.name}</span>
                                {isActive && (
                                    <span className="text-[10px] font-bold uppercase tracking-wider opacity-80">Active</span>
                                )}
                            </button>
                        );
                    })}

                    <div className="border-t border-slate-100 mt-1 pt-1 flex flex-col gap-1">
                        <Link
                            to="/profiles"
                            role="menuitem"
                            onClick={() => setOpen(false)}
                            className="flex items-center gap-3 w-full rounded-xl px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
                        >
                            <Settings className="size-4" />
                            <span>Manage Profiles</span>
                        </Link>
                        <Link
                            to="/profiles?new=1"
                            role="menuitem"
                            onClick={() => setOpen(false)}
                            className="flex items-center gap-3 w-full rounded-xl px-3 py-2 text-sm font-semibold text-violet-600 hover:bg-violet-50 transition-colors"
                        >
                            <Plus className="size-4" />
                            <span>Add Profile</span>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}
