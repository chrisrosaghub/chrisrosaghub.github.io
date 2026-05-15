---
appName: Brainy Buddies
appDescription: A colorful, gamified homework helper for Kindergarten and 2nd grade across math, science, history, and geography.
isPlanMode: false
---

# Brainy Buddies

A vibrant, kid-friendly learning app that turns learning into an adventure. Kids earn stars and badges by completing fun, level-appropriate quizzes across **Math, Science, History, and Geography**. Now supports **Kindergarten** and **2nd Grade** levels with their own content.

## Tasks

### Task 1 — App scaffolding, routing & navigation
- Routes in `src/App.tsx`: Home, Math, Science, History, Geography, Daily Challenge, Progress.
- Friendly top nav bar with the app name “Brainy Buddies”, a star counter, a streak counter, and a **Level selector (Kindergarten / 2nd Grade)**.
- Icons from `lucide-react` and label every nav item.
- Active route is visually highlighted.

### Task 2 — In-memory data layer with levels
- Types and seeded data for subjects, activities (multiple-choice questions), per-subject progress, and badges.
- Activities are tagged with a `level` (`kindergarten` or `grade2`).
- Hooks: `useSubjects`, `useActivities` (level-aware), `useProgress`, `useBadges`, `useCompleteActivity`, `useDailyChallenge` (level-aware), `useLevel`/`useSetLevel`.
- Level preference is persisted in the in-memory store and applied across the app.

### Task 3 — Kindergarten content
- Each of the four subjects has age-appropriate Kindergarten activities (counting, shapes, colors, basic plants/animals, community helpers, weather, simple US symbols, continents at a basic level, etc.).
- Each activity has at least 8 questions in its pool; quizzes show 5 random per round.
- Daily Challenge for Kindergarten pulls 3 questions per subject from the Kindergarten pool.

### Task 4 — Home page
- Greeting, today’s streak, total stars.
- Four big colorful subject cards that link to each subject page (counts reflect the selected level).
- “Daily Challenge” feature card linking to the dedicated daily challenge route.
- Recent badges strip.
- Clear indicator of the current level.

### Task 5 — Subject pages with interactive quizzes
- Activity cards (available / completed states) filtered by the selected level.
- Quiz view: one question at a time, big multiple-choice buttons, instant feedback, progress bar, celebration screen with stars earned at the end.

### Task 6 — Daily Challenge
- Dedicated `/daily` route with its own page.
- Pulls 3 questions from each of the four subjects (12 total) using the selected level’s question pools.
- Same quiz UX as activity quizzes; awards bonus stars on completion; only one daily challenge per day **per level** with a friendly “come back tomorrow” state.

### Task 7 — Progress page & badges
- Per-subject progress bars and star totals.
- D3 bar chart of activities completed per subject.
- Badge gallery (earned vs locked).

### Task 8 — Theme & polish
- Bright, kid-friendly palette and large rounded shapes.
- Loading shimmers; smooth transitions; celebration animation when a quiz is completed.
