import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

/** Reactive session — re-renders on sign-in/sign-out. */
export function useSession(): { session: Session | null; loading: boolean } {
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        supabase.auth.getSession().then(({ data }) => {
            setSession(data.session);
            setLoading(false);
        });

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
