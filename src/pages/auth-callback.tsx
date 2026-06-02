import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useSession } from "@/lib/auth-context";

/**
 * Dedicated OAuth callback landing page (outside AuthGuard).
 * NOTE(ai): AuthProvider (mounted above Router) handles all Supabase session
 * events globally. This page simply waits for loading to finish and then
 * navigates to "/" (session present) or "/login" (no session / error).
 */
export default function AuthCallbackPage() {
    const navigate = useNavigate();
    const { session, loading } = useSession();

    useEffect(() => {
        if (loading) return;
        navigate(session ? "/" : "/login", { replace: true });
    }, [session, loading, navigate]);

    return (
        <div className="min-h-svh flex items-center justify-center bg-gradient-to-br from-violet-50 via-fuchsia-50 to-sky-50">
            <Loader2 className="size-10 text-violet-400 animate-spin" />
        </div>
    );
}


