import { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import Layout from "./pages/_layout";
import { queryClient } from "./lib/query-client";
import { AppProviders } from "@/components/system/AppProviders";
import HomePage from "./pages/index";
import NotFoundPage from "./pages/not-found";
import SubjectPage from "./pages/subject";
import StatesPage from "./pages/states";
import StatesLearnPage from "./pages/states-learn";
import LearnPage from "./pages/learn";
import ActivityPage from "./pages/activity";
import ProgressPage from "./pages/progress";
import DailyChallengePage from "./pages/daily";
import AboutPage from "./pages/about";
import { AppErrorBoundary } from "./components/system/AppErrorBoundary";

// NOTE(ai): DO NOT REMOVE — (ROUTER BASE) keep this or deep links for playback under /<id>/ in bizchat break.
function getBase(pathname: string): string {
  const parts = pathname.split("/").filter(Boolean);
  // Only treat first segment as base when: trailing slash (subdirectory load) or multiple segments (deep link in subdir).
  // Single segment without trailing slash means it's a route on root deployment (e.g. /presidents after SPA redirect).
  if (parts.length <= 1 && !pathname.endsWith('/')) return '/';
  return parts.length ? `/${parts[0]}/` : "/";
}
// NOTE(ai): DO NOT REMOVE - used by Router
const APP_BASENAME = getBase(window.location.pathname);

function App() {
  return (
    <AppProviders>
      <QueryClientProvider client={queryClient}>
        {/* NOTE(ai): DO NOT REMOVE - Single router lives here. Do not wrap App elsewhere. Do not modify basename */}
        <Router basename={APP_BASENAME}>
          {/* NOTE(ai): DO NOT REMOVE — React error boundary */}
          <AppErrorBoundary>
            <Suspense fallback={<div className="p-4 text-sm text-muted-foreground">Loading…</div>}>
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route index element={<HomePage />} />
                  <Route path="math" element={<SubjectPage subjectId="math" />} />
                  <Route path="science" element={<SubjectPage subjectId="science" />} />
                  <Route path="history" element={<SubjectPage subjectId="history" />} />
                  <Route path="geography" element={<SubjectPage subjectId="geography" />} />
                  <Route path="reading" element={<SubjectPage subjectId="reading" />} />
                  <Route path="presidents" element={<SubjectPage subjectId="presidents" />} />
                  <Route path="language" element={<SubjectPage subjectId="language" />} />
                  <Route path="activity/:activityId" element={<ActivityPage />} />
                  <Route path="daily" element={<DailyChallengePage />} />
                  <Route path="progress" element={<ProgressPage />} />
                  <Route path="states" element={<StatesPage />} />
                  <Route path="states/learn/:groupId" element={<StatesLearnPage />} />
                  <Route path="learn/:activityId" element={<LearnPage />} />
                  <Route path="about" element={<AboutPage />} />
                  {/* NOTE(ai): DO NOT REMOVE — catch-all 404 page */}
                  <Route path="*" element={<NotFoundPage />} />
                </Route>
              </Routes>
            </Suspense>
          </AppErrorBoundary>
        </Router>
      </QueryClientProvider>
    </AppProviders>
  );
}

export default App;
