import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

/**
 * Dedicated OAuth callback landing page.
 * NOTE(ai): Must be outside AuthGuard. Supabase fires INITIAL_SESSION with
 * null before the hash tokens are parsed. We only navigate to /login on
 * SIGNED_OUT or timeout — never on INITIAL_SESSION null — so the hash
 * stays intact while Supabase processes it and fires SIGNED_IN.
 */
export default function AuthCallbackPage() {
    const navigate = useNavigate();

    useEffect(() => {
        let done = false;
        const go = (path: string) => {
            if (done) return;
            done = true;
            navigate(path, { replace: true });
        };

        // Subscribe before any async call so we don't miss early events.
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (event, session) => {
                if (session) {
                    // Any event carrying a session = signed in, go home.
                    go("/");
                } else if (event === "SIGNED_OUT") {
                    go("/login");
                }
                // INITIAL_SESSION null = tokens still being parsed from hash.
                // Do nothing — wait for the follow-up SIGNED_IN event.
            },
        );

        // If a session already exists (e.g. accidental page refresh), go straight home.
        supabase.auth.getSession().then(({ data }) => {
            if (data.session) go("/");
        });

        // Fallback: if auth never resolves after 10 s, bail to login.
        const timer = setTimeout(() => go("/login"), 10000);

        return () => {
            done = true;
            subscription.unsubscribe();
            clearTimeout(timer);
        };
    }, [navigate]);

    return (
        <div className="min-h-svh flex items-center justify-center bg-gradient-to-br from-violet-50 via-fuchsia-50 to-sky-50">
            <Loader2 className="size-10 text-violet-400 animate-spin" />
        </div>
    );
}

