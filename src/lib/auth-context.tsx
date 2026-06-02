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
        // Subscribe first so we never miss an event.
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (_event, newSession) => {
                setSession(newSession);
                setLoading(false);
            },
        );

        // Also read the current session in case INITIAL_SESSION already fired.
        supabase.auth.getSession().then(({ data }) => {
            setSession(prev => prev ?? data.session);
            setLoading(false);
        });

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
