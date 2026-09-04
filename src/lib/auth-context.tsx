import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

interface AuthContextValue {
    session: Session | null;
    loading: boolean;
}

const AuthContext = createContext<AuthContextValue>({ session: null, loading: true });

/**
 * NOTE(ai): AuthProvider lives above Router so session state persists across
 * all route changes. With detectSessionInUrl:false, INITIAL_SESSION fires with
 * whatever is in localStorage — no URL-parsing races.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
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

    return (
        <AuthContext.Provider value={{ session, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useSession() {
    return useContext(AuthContext);
}
