import { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { Sparkles, Home, Flame, Star, BookOpenCheck, Globe2, FlaskConical, Calculator, Landmark, Trophy, GraduationCap, BookA, UserRound, Map, Crown, Languages, ChevronDown, Heart, BarChart3 } from "lucide-react";
import { useLevel, useProgress, useSetLevel } from "@/lib/brainy-hooks";
import { LEVELS, type Level } from "@/lib/brainy-data";
import { ProfileSwitcher } from "@/components/brainy/ProfileSwitcher";
import { cn } from "@/lib/utils";

// NOTE(ai): App name lives only in the header; do not repeat in page bodies.
const APP_NAME = "Brainy Buddies";

const NAV_ITEMS = [
  { to: "/", label: "Home", icon: Home, end: true },
  { to: "/math", label: "Math", icon: Calculator },
  { to: "/science", label: "Science", icon: FlaskConical },
  { to: "/history", label: "History", icon: Landmark },
  { to: "/geography", label: "Geography", icon: Globe2 },
  { to: "/states", label: "States & Capitals", icon: Map },
  { to: "/presidents", label: "Presidents", icon: Crown },
  { to: "/language", label: "Language Arts", icon: Languages },
  { to: "/sel", label: "SEL", icon: Heart },
  { to: "/reading", label: "Sight Words", icon: BookA, levels: ["kindergarten"] as Level[] },
  { to: "/daily", label: "Daily Challenge", icon: Trophy },
  { to: "/progress", label: "My Progress", icon: BookOpenCheck },
  { to: "/report", label: "Weekly Report", icon: BarChart3 },
  { to: "/profiles", label: "Profiles", icon: UserRound },
];

function LevelSwitcher() {
  const level = useLevel();
  const setLevel = useSetLevel();
  return (
    /* Outer scroll container: horizontal-only pan so swipes here never
       bubble up and scroll the whole page on mobile. */
    <div className="overflow-x-auto overscroll-x-contain touch-pan-x [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      <div
        role="group"
        aria-label="Choose grade level"
        className="inline-flex items-center gap-1 rounded-full bg-white/85 backdrop-blur ring-1 ring-violet-200 p-1 shadow-sm min-w-max"
      >
        <GraduationCap className="size-4 ml-2 text-violet-600" aria-hidden />
        {LEVELS.map((lvl) => {
          const isActive = level === lvl.id;
          return (
            <button
              key={lvl.id}
              type="button"
              onClick={() => setLevel(lvl.id as Level)}
              aria-pressed={isActive}
              className={cn(
                "inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs md:text-sm font-bold transition-all",
                isActive
                  ? "bg-gradient-to-r from-violet-500 via-fuchsia-500 to-orange-400 text-white shadow"
                  : "text-slate-700 hover:bg-violet-50",
              )}
            >
              <span aria-hidden>{lvl.emoji}</span>
              <span>{lvl.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function Layout() {
  const { data: progress } = useProgress();
  const level = useLevel();
  const location = useLocation();
  const stars = progress?.totalStars ?? 0;
  const streak = progress?.streakDays ?? 0;

  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isHome = location.pathname === "/";
  const navCollapsed = (scrolled || !isHome) && !navOpen;

  // Collapse nav on every navigation
  useEffect(() => { setNavOpen(false); }, [location.pathname]);

  // Collapse nav when user scrolls down
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="text-foreground flex flex-col min-h-svh">
      <header className="border-b sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-background/70 bg-background/85">
        <div className="mx-auto w-full max-w-7xl px-4 md:px-8 py-3 flex items-center gap-4 flex-wrap">
          <NavLink to="/" className="flex items-center gap-2 group" aria-label={`${APP_NAME} home`}>
            <span
              className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-400 via-violet-400 to-sky-400 text-white shadow-md ring-2 ring-white/60 group-hover:animate-wiggle"
              aria-hidden
            >
              <Sparkles className="size-5" />
            </span>
            <span className="font-extrabold text-lg md:text-xl tracking-tight">
              <span className="bg-gradient-to-r from-fuchsia-600 via-violet-600 to-sky-600 bg-clip-text text-transparent">
                {APP_NAME}
              </span>
            </span>
          </NavLink>

          <div className="order-3 sm:order-2 w-full sm:w-auto sm:ml-2">
            <LevelSwitcher />
          </div>

          <div className="order-2 sm:order-3 ml-auto flex items-center gap-2">
            <ProfileSwitcher />
            <div
              className="hidden sm:flex items-center gap-1.5 rounded-full bg-amber-100 text-amber-800 px-3 py-1.5 text-sm font-bold shadow-sm ring-1 ring-amber-200"
              aria-label={`${stars} stars earned`}
              title="Stars earned"
            >
              <Star className="size-4 fill-amber-400 text-amber-500" />
              <span>{stars}</span>
            </div>
            <div
              className="flex items-center gap-1.5 rounded-full bg-orange-100 text-orange-800 px-3 py-1.5 text-sm font-bold shadow-sm ring-1 ring-orange-200"
              aria-label={`${streak} day streak`}
              title="Day streak"
            >
              <Flame className="size-4 text-orange-500" />
              <span>{streak}</span>
            </div>
            <button
              type="button"
              onClick={() => setNavOpen(v => !v)}
              aria-label="Toggle navigation"
              className="inline-flex items-center justify-center rounded-full bg-slate-100 text-slate-500 p-2 hover:bg-slate-200 hover:text-slate-700 transition-colors"
            >
              <ChevronDown className={cn("size-4 transition-transform", navOpen && "rotate-180")} />
            </button>
          </div>
        </div>

        {/* Nav — collapses on any non-home page, expands on hover/tap */}
        <div
          onMouseEnter={() => setNavOpen(true)}
          onMouseLeave={() => setNavOpen(false)}
        >
          {/* Animated nav body using grid-template-rows trick */}
          <nav
            aria-label="Primary"
            className="bg-background/60 grid overflow-hidden"
            style={{
              gridTemplateRows: navCollapsed ? "0fr" : "1fr",
              transition: "grid-template-rows 0.25s ease",
            }}
          >
            <div className="min-h-0 overflow-hidden">
              <div className="border-t">
                <div className="mx-auto w-full max-w-7xl px-2 md:px-6">
                  <ul className="flex flex-wrap gap-1 py-2 overflow-x-auto">
                    {NAV_ITEMS.filter((item) => !item.levels || item.levels.includes(level)).map((item) => {
                      const Icon = item.icon;
                      return (
                        <li key={item.to}>
                          <NavLink
                            to={item.to}
                            end={item.end}
                            className={({ isActive }) =>
                              cn(
                                "inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold transition-all",
                                "hover:bg-white/70 hover:shadow-sm",
                                isActive
                                  ? "bg-white text-primary shadow-sm ring-2 ring-primary/30"
                                  : "text-muted-foreground",
                              )
                            }
                          >
                            <Icon className="size-4" />
                            <span>{item.label}</span>
                          </NavLink>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </nav>

          {/* Collapse handle — visible only when nav is collapsed */}
          <button
            aria-label="Show navigation"
            onClick={() => setNavOpen((o) => !o)}
            className={cn(
              "w-full border-t flex items-center justify-center gap-1.5 py-1 text-[11px] text-muted-foreground/60 hover:text-muted-foreground transition-all duration-200",
              navCollapsed ? "opacity-100" : "opacity-0 pointer-events-none h-0 py-0",
            )}
          >
            <ChevronDown className="size-3" />
            <span>Subjects</span>
            <ChevronDown className="size-3" />
          </button>
        </div>
      </header>

      <main
        key={location.pathname}
        className="flex-1 w-full mx-auto max-w-7xl px-4 md:px-8 py-6 animate-float-up"
      >
        <Outlet />
      </main>

      <footer className="border-t bg-background/60 backdrop-blur">
        <div className="mx-auto w-full max-w-7xl px-4 md:px-8 py-4 text-xs text-muted-foreground flex flex-col items-center gap-2">
          <NavLink
            to="/about"
            className={({ isActive }) =>
              cn(
                "inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-semibold transition-all",
                "hover:bg-white/70 hover:shadow-sm",
                isActive
                  ? "bg-white text-primary shadow-sm ring-2 ring-primary/30"
                  : "text-muted-foreground",
              )
            }
          >
            <UserRound className="size-4" />
            About Me
          </NavLink>
          <div className="flex items-center justify-between w-full">
            <span>Made with <span aria-hidden>💜</span> for curious learners big and small.</span>
            <span>Practice a little every day!</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
