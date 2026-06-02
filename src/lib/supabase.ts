import { createClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || supabaseUrl.includes("YOUR_PROJECT_ID")) {
  console.warn(
    "[Brainy Buddies] VITE_SUPABASE_URL is not configured. " +
    "Copy .env.local and fill in your Supabase project URL and anon key.",
  );
}

// Fall back to placeholder values so createClient doesn't throw on missing env vars.
// The app will show the login page; all DB calls will fail gracefully until real values are set.
export const supabase = createClient<Database>(
  supabaseUrl || "https://placeholder.supabase.co",
  supabaseAnonKey || "placeholder-anon-key",
);
