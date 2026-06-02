// NOTE(ai): useSession is provided by the global AuthProvider via context.
// Re-exporting here keeps all auth imports in one place.
export { useSession } from "@/lib/auth-context";

import { supabase } from "@/lib/supabase";

/** Opens the Google OAuth popup/redirect flow. */
export async function signInWithGoogle(): Promise<void> {
    // NOTE(ai): redirectTo root origin so GitHub Pages serves index.html directly.
    // Any sub-path (e.g. /auth-callback) triggers 404.html which corrupts ?code= params.
    await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: window.location.origin + "/" },
    });
}

/** Signs the current user out. */
export async function signOut(): Promise<void> {
    await supabase.auth.signOut();
}
