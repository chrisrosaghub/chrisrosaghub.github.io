-- ============================================================
-- Brainy Buddies — Initial Supabase schema
-- Run this in: Supabase Dashboard > SQL Editor
-- ============================================================

-- Households (one per authenticated Google account)
create table if not exists public.households (
  id          uuid primary key default gen_random_uuid(),
  owner_id    uuid references auth.users(id) on delete cascade not null unique,
  email       text not null,
  created_at  timestamptz default now()
);

-- Profiles (children / learners under a household)
create table if not exists public.profiles (
  id           uuid primary key default gen_random_uuid(),
  household_id uuid references public.households(id) on delete cascade not null,
  name         text not null check (char_length(name) between 1 and 24),
  avatar       text not null default '🦊',
  color        text not null default 'violet',
  level        text not null default 'grade2',
  created_at   timestamptz default now()
);

-- Progress summary per profile (totalStars, streak, etc.)
create table if not exists public.profile_progress (
  profile_id                 uuid references public.profiles(id) on delete cascade not null primary key,
  total_stars                integer not null default 0,
  streak_days                integer not null default 1,
  last_activity_at           bigint,           -- unix ms timestamp
  last_daily_challenge_date  text,
  daily_challenges_completed integer not null default 0,
  updated_at                 timestamptz default now()
);

-- Individual activity completions
create table if not exists public.activity_results (
  id           uuid primary key default gen_random_uuid(),
  profile_id   uuid references public.profiles(id) on delete cascade not null,
  activity_id  text not null,
  subject_id   text not null,
  correct      integer not null,
  total        integer not null,
  stars_earned integer not null,
  completed_at bigint not null   -- unix ms timestamp
);

-- Badges earned per profile
create table if not exists public.earned_badges (
  profile_id uuid references public.profiles(id) on delete cascade not null,
  badge_id   text not null,
  earned_at  timestamptz default now(),
  primary key (profile_id, badge_id)
);

-- ============================================================
-- Indexes for common query patterns
-- ============================================================
create index if not exists idx_profiles_household on public.profiles(household_id);
create index if not exists idx_activity_results_profile on public.activity_results(profile_id, completed_at desc);
create index if not exists idx_earned_badges_profile on public.earned_badges(profile_id);

-- ============================================================
-- Row-Level Security — users can only see/modify their own data
-- ============================================================
alter table public.households       enable row level security;
alter table public.profiles         enable row level security;
alter table public.profile_progress enable row level security;
alter table public.activity_results enable row level security;
alter table public.earned_badges    enable row level security;

-- Households
drop policy if exists "own household" on public.households;
create policy "own household" on public.households
  for all using (owner_id = auth.uid()) with check (owner_id = auth.uid());

-- Profiles
drop policy if exists "own profiles" on public.profiles;
create policy "own profiles" on public.profiles
  for all
  using (
    household_id in (select id from public.households where owner_id = auth.uid())
  )
  with check (
    household_id in (select id from public.households where owner_id = auth.uid())
  );

-- Profile progress
drop policy if exists "own progress" on public.profile_progress;
create policy "own progress" on public.profile_progress
  for all
  using (
    profile_id in (
      select p.id from public.profiles p
      join public.households h on h.id = p.household_id
      where h.owner_id = auth.uid()
    )
  )
  with check (
    profile_id in (
      select p.id from public.profiles p
      join public.households h on h.id = p.household_id
      where h.owner_id = auth.uid()
    )
  );

-- Activity results
drop policy if exists "own activity results" on public.activity_results;
create policy "own activity results" on public.activity_results
  for all
  using (
    profile_id in (
      select p.id from public.profiles p
      join public.households h on h.id = p.household_id
      where h.owner_id = auth.uid()
    )
  )
  with check (
    profile_id in (
      select p.id from public.profiles p
      join public.households h on h.id = p.household_id
      where h.owner_id = auth.uid()
    )
  );

-- Earned badges
drop policy if exists "own earned badges" on public.earned_badges;
create policy "own earned badges" on public.earned_badges
  for all
  using (
    profile_id in (
      select p.id from public.profiles p
      join public.households h on h.id = p.household_id
      where h.owner_id = auth.uid()
    )
  )
  with check (
    profile_id in (
      select p.id from public.profiles p
      join public.households h on h.id = p.household_id
      where h.owner_id = auth.uid()
    )
  );

-- ============================================================
-- Trigger: auto-create household row when a new user signs up
-- ============================================================
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.households (owner_id, email)
  values (new.id, new.email)
  on conflict (owner_id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
