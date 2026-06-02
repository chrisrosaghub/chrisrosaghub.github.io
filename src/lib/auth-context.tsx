import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase, IS_OAUTH_CALLBACK } from "@/lib/supabase";

interface AuthContextValue {
    session: Session | null;
    loading: boolean;
}

const AuthContext = createContext<AuthContextValue>({ session: null, loading: true });

/**
 * NOTE(ai): AuthProvider lives at the TOP of the component tree (above Router).
 * This guarantees session state persists across route changes — critical for OAuth
 * callbacks where AuthGuard would otherwise re-mount with session=null before
 * SIGNED_IN fires, causing an infinite redirect loop.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // NOTE(ai): INITIAL_SESSION fires with null BEFORE Supabase finishes parsing
        // the OAuth hash. IS_OAUTH_CALLBACK is captured at module load time (before
        // createClient clears the hash). When we're mid-callback and get null, keep
        // loading:true so auth-callback page doesn't prematurely redirect to /login.
        // SIGNED_IN will fire with the real session moments later.
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (event, newSession) => {
                if (event === "INITIAL_SESSION" && !newSession && IS_OAUTH_CALLBACK) {
                    // Stay loading — SIGNED_IN is coming.
                    return;
                }
                setSession(newSession);
                setLoading(false);
            },
        );

        return () => subscription.unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ session, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useSession() {
    return useContext(AuthContext);
}
