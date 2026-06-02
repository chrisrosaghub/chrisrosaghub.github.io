import { Loader2 } from "lucide-react";
import { Navigate, Outlet } from "react-router-dom";
import { useSession } from "@/lib/auth-hooks";

/**
 * Wraps all authenticated routes. Redirects to /login when no session exists.
 */
export function AuthGuard() {
    const { session, loading } = useSession();

    if (loading) {
        return (
            <div className="min-h-svh flex items-center justify-center bg-gradient-to-br from-violet-50 via-fuchsia-50 to-sky-50">
                <Loader2 className="size-10 text-violet-400 animate-spin" />
            </div>
        );
    }

    if (!session) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}
