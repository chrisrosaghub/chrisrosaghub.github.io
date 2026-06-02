/**
 * Minimal Supabase database types matching our schema.
 * NOTE(ai): These are hand-authored. If the schema changes, update here too.
 */
export interface Database {
    public: {
        Tables: {
            households: {
                Row: {
                    id: string;
                    owner_id: string;
                    email: string;
                    created_at: string;
                };
                Insert: {
                    id?: string;
                    owner_id: string;
                    email: string;
                    created_at?: string;
                };
                Update: Partial<{ email: string }>;
            };
            profiles: {
                Row: {
                    id: string;
                    household_id: string;
                    name: string;
                    avatar: string;
                    color: string;
                    level: string;
                    created_at: string;
                };
                Insert: {
                    id?: string;
                    household_id: string;
                    name: string;
                    avatar: string;
                    color: string;
                    level: string;
                    created_at?: string;
                };
                Update: Partial<{
                    name: string;
                    avatar: string;
                    color: string;
                    level: string;
                }>;
            };
            profile_progress: {
                Row: {
                    profile_id: string;
                    total_stars: number;
                    streak_days: number;
                    last_activity_at: number | null;
                    last_daily_challenge_date: string | null;
                    daily_challenges_completed: number;
                    updated_at: string;
                };
                Insert: {
                    profile_id: string;
                    total_stars?: number;
                    streak_days?: number;
                    last_activity_at?: number | null;
                    last_daily_challenge_date?: string | null;
                    daily_challenges_completed?: number;
                    updated_at?: string;
                };
                Update: Partial<{
                    total_stars: number;
                    streak_days: number;
                    last_activity_at: number | null;
                    last_daily_challenge_date: string | null;
                    daily_challenges_completed: number;
                    updated_at: string;
                }>;
            };
            activity_results: {
                Row: {
                    id: string;
                    profile_id: string;
                    activity_id: string;
                    subject_id: string;
                    correct: number;
                    total: number;
                    stars_earned: number;
                    completed_at: number;
                };
                Insert: {
                    id?: string;
                    profile_id: string;
                    activity_id: string;
                    subject_id: string;
                    correct: number;
                    total: number;
                    stars_earned: number;
                    completed_at: number;
                };
                Update: never;
            };
            earned_badges: {
                Row: {
                    profile_id: string;
                    badge_id: string;
                    earned_at: string;
                };
                Insert: {
                    profile_id: string;
                    badge_id: string;
                    earned_at?: string;
                };
                Update: never;
            };
        };
    };
}
