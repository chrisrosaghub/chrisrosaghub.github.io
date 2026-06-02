import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

/**
 * Dedicated OAuth callback page (outside AuthGuard).
 * NOTE(ai): With PKCE + detectSessionInUrl:false we exchange the ?code=
 * parameter explicitly here. This avoids all event-timing races — the result
 * is a direct async return value, not an event subscription.
 */
export default function AuthCallbackPage() {
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const code = new URLSearchParams(window.location.search).get("code");

        if (!code) {
            // No code param — user landed here directly, send to login.
            navigate("/login", { replace: true });
            return;
        }

        supabase.auth.exchangeCodeForSession(code).then(({ data, error }) => {
            if (error || !data.session) {
                setError(error?.message ?? "Authentication failed.");
                setTimeout(() => navigate("/login", { replace: true }), 3000);
            } else {
                navigate("/", { replace: true });
            }
        });
    }, [navigate]);

    if (error) {
        return (
            <div className="min-h-svh flex items-center justify-center bg-gradient-to-br from-violet-50 via-fuchsia-50 to-sky-50">
                <p className="text-sm text-red-500">{error}</p>
            </div>
        );
    }

    return (
        <div className="min-h-svh flex items-center justify-center bg-gradient-to-br from-violet-50 via-fuchsia-50 to-sky-50">
            <Loader2 className="size-10 text-violet-400 animate-spin" />
        </div>
    );
}


