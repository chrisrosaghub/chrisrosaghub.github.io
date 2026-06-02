import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

/** Reactive session — re-renders on sign-in/sign-out.
 * NOTE(ai): INITIAL_SESSION fires before Supabase finishes parsing the OAuth
 * hash, so it returns null even mid-callback. We detect the callback URL and
 * keep loading=true until SIGNED_IN fires, preventing AuthGuard from
 * redirecting to /login and stripping the hash (infinite loop). */
export function useSession(): { session: Session | null; loading: boolean } {
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const hash = window.location.hash;
        const isOAuthCallback = hash.includes("access_token") || hash.includes("error_description");

        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (event, newSession) => {
                setSession(newSession);
                // If INITIAL_SESSION fires null during an OAuth callback, keep
                // loading — the SIGNED_IN event will follow once hash is parsed.
                if (event === "INITIAL_SESSION" && !newSession && isOAuthCallback) {
                    return;
                }
                setLoading(false);
            },
        );

        return () => subscription.unsubscribe();
    }, []);

    return { session, loading };
}

/** Opens the Google OAuth popup/redirect flow. */
export async function signInWithGoogle(): Promise<void> {
    await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: window.location.origin },
    });
}

/** Signs the current user out. */
export async function signOut(): Promise<void> {
    await supabase.auth.signOut();
}
