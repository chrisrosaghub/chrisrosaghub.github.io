// NOTE(ai): useSession is provided by the global AuthProvider via context.
// Re-exporting here keeps all auth imports in one place.
export { useSession } from "@/lib/auth-context";

import { supabase } from "@/lib/supabase";

/** Opens the Google OAuth popup/redirect flow. */
export async function signInWithGoogle(): Promise<void> {
    // NOTE(ai): redirectTo uses /auth-callback (single path segment) so that
    // APP_BASENAME stays "/" — multi-segment paths would break React Router.
    await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: `${window.location.origin}/auth-callback` },
    });
}

/** Signs the current user out. */
export async function signOut(): Promise<void> {
    await supabase.auth.signOut();
}
