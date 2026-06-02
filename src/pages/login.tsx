import { Sparkles } from "lucide-react";
import { signInWithGoogle } from "@/lib/auth-hooks";

export default function LoginPage() {
    return (
        <div className="min-h-svh flex flex-col items-center justify-center bg-gradient-to-br from-violet-50 via-fuchsia-50 to-sky-50 px-4">
            <div className="w-full max-w-sm flex flex-col items-center gap-8">
                {/* Logo */}
                <div className="flex flex-col items-center gap-3">
                    <span className="inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-fuchsia-400 via-violet-400 to-sky-400 text-white shadow-xl ring-4 ring-white/60">
                        <Sparkles className="size-8" />
                    </span>
                    <h1 className="text-3xl font-extrabold tracking-tight">
                        <span className="bg-gradient-to-r from-fuchsia-600 via-violet-600 to-sky-600 bg-clip-text text-transparent">
                            Brainy Buddies
                        </span>
                    </h1>
                    <p className="text-center text-slate-500 text-sm max-w-xs">
                        Sign in to save your family's progress and access it on any device.
                    </p>
                </div>

                {/* Sign-in card */}
                <div className="w-full rounded-3xl bg-white shadow-xl ring-1 ring-slate-100 p-8 flex flex-col gap-5">
                    <p className="text-center text-sm font-semibold text-slate-600">
                        Sign in with your Google account to get started.
                    </p>

                    <button
                        type="button"
                        onClick={signInWithGoogle}
                        className="flex items-center justify-center gap-3 w-full rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 shadow-sm hover:bg-slate-50 hover:shadow transition-all"
                    >
                        {/* Google G logo SVG */}
                        <svg width="20" height="20" viewBox="0 0 48 48" aria-hidden>
                            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                            <path fill="none" d="M0 0h48v48H0z" />
                        </svg>
                        Continue with Google
                    </button>

                    <p className="text-center text-xs text-slate-400 leading-relaxed">
                        Your progress is tied to your Google account. Each family member gets their own profile after sign-in.
                    </p>
                </div>

                <p className="text-xs text-slate-400 text-center">
                    No password needed · Free forever · Data resets are per-session for guests
                </p>
            </div>
        </div>
    );
}
