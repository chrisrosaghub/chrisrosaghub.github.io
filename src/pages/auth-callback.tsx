import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useSession } from "@/lib/auth-context";

/**
 * Fallback OAuth callback page (outside AuthGuard).
 * NOTE(ai): Primary auth flow redirects to origin root (not here).
 * This page handles edge cases where /auth-callback is the redirect target.
 */
export default function AuthCallbackPage() {
    const navigate = useNavigate();
    const { session, loading } = useSession();

    useEffect(() => {
        if (!loading) navigate(session ? "/" : "/login", { replace: true });
    }, [session, loading, navigate]);

    return (
        <div className="min-h-svh flex items-center justify-center bg-gradient-to-br from-violet-50 via-fuchsia-50 to-sky-50">
            <Loader2 className="size-10 text-violet-400 animate-spin" />
        </div>
    );
}


