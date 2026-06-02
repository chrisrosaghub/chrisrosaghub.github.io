import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

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
        // NOTE(ai): Do NOT call getSession() here. It resolves immediately with
        // null before Supabase finishes parsing the OAuth hash, which sets
        // loading=false too early and causes auth-callback to redirect to /login.
        // onAuthStateChange fires INITIAL_SESSION only after the hash is fully
        // processed — it is the single source of truth for initial session state.
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (_event, newSession) => {
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
