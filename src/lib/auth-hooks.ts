import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

/** Reactive session — re-renders on sign-in/sign-out.
 * NOTE(ai): Do NOT call getSession() before onAuthStateChange — it resolves
 * with null before the URL hash tokens are parsed, causing AuthGuard to
 * redirect to /login and strip the hash (infinite loop). onAuthStateChange
 * fires INITIAL_SESSION after hash processing, so it's the correct source. */
export function useSession(): { session: Session | null; loading: boolean } {
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (_event, newSession) => {
                setSession(newSession);
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
