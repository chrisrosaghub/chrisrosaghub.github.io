import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

/**
 * Dedicated OAuth callback landing page.
 * NOTE(ai): This page must be outside AuthGuard. Supabase clears the URL hash
 * synchronously on client init — before React mounts — so no other component
 * can reliably detect the callback. This page listens for SIGNED_IN directly
 * and navigates to "/" once the session is confirmed.
 */
export default function AuthCallbackPage() {
    const navigate = useNavigate();

    useEffect(() => {
        // If a session already exists (e.g. page refreshed) go straight home.
        supabase.auth.getSession().then(({ data }) => {
            if (data.session) {
                navigate("/", { replace: true });
                return;
            }

            // Otherwise wait for Supabase to exchange the token from the URL.
            const { data: { subscription } } = supabase.auth.onAuthStateChange(
                (event, session) => {
                    if ((event === "SIGNED_IN" || event === "INITIAL_SESSION") && session) {
                        navigate("/", { replace: true });
                    } else if (event === "SIGNED_OUT" || (event === "INITIAL_SESSION" && !session)) {
                        // No session after processing — send to login.
                        navigate("/login", { replace: true });
                    }
                },
            );

            // Safety timeout: if nothing resolves in 8 seconds, go to login.
            const timer = setTimeout(() => {
                navigate("/login", { replace: true });
            }, 8000);

            return () => {
                subscription.unsubscribe();
                clearTimeout(timer);
            };
        });
    }, [navigate]);

    return (
        <div className="min-h-svh flex items-center justify-center bg-gradient-to-br from-violet-50 via-fuchsia-50 to-sky-50">
            <Loader2 className="size-10 text-violet-400 animate-spin" />
        </div>
    );
}
