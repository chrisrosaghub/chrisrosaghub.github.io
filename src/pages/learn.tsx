import { useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2, RotateCcw } from "lucide-react";
import { ACTIVITY_LEARN_DATA } from "@/lib/activity-learn-data";
import { ACTIVITIES } from "@/lib/brainy-data";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

export default function LearnPage() {
  const { activityId } = useParams<{ activityId: string }>();
  const items = ACTIVITY_LEARN_DATA[activityId ?? ""] ?? [];
  const activity = ACTIVITIES.find((a) => a.id === activityId);

  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [finished, setFinished] = useState(false);

  // No learn data — send straight to the quiz
  if (!activityId || items.length === 0) {
    return <Navigate to={`/activity/${activityId}`} replace />;
  }

  const item = items[index];
  const isLast = index + 1 >= items.length;
  const progressPct = ((index + (revealed ? 1 : 0)) / items.length) * 100;
  const backHref = activity ? `/${activity.subjectId}` : "/";
  const backLabel = activity ? `Back to ${activity.subjectId === "states" ? "States & Capitals" : activity.subjectId.charAt(0).toUpperCase() + activity.subjectId.slice(1)}` : "Back";

  function handleReveal() {
    setRevealed(true);
  }

  function handleNext() {
    if (isLast) {
      setFinished(true);
    } else {
      setIndex((i) => i + 1);
      setRevealed(false);
    }
  }

  function handleRestart() {
    setIndex(0);
    setRevealed(false);
    setFinished(false);
  }

  // ── Done screen ─────────────────────────────────────────────────────────
  if (finished) {
    return (
      <div className="max-w-xl mx-auto space-y-5">
        <Link
          to={backHref}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="size-4" /> {backLabel}
        </Link>

        <div className="rounded-3xl bg-gradient-to-br from-emerald-400 via-teal-400 to-cyan-400 text-white p-8 shadow-lg text-center space-y-4">
          <div className="text-6xl select-none">🎉</div>
          <h1 className="text-2xl font-extrabold">You're ready!</h1>
          <p className="text-white/90">
            You studied all <strong>{items.length} facts</strong> for{" "}
            <strong>{activity?.title ?? "this activity"}</strong>.
          </p>
          <p className="text-white/75 text-sm">Now put that knowledge to work!</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Link
              to={`/activity/${activityId}`}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white text-emerald-700 px-6 py-3 font-bold shadow hover:bg-emerald-50 transition-colors"
            >
              🎯 Take the Quiz!
            </Link>
            <button
              onClick={handleRestart}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white/20 text-white px-6 py-3 font-bold hover:bg-white/30 transition-colors"
            >
              <RotateCcw className="size-4" /> Study Again
            </button>
          </div>
          <Link
            to={backHref}
            className="block text-xs text-white/60 hover:text-white/90 underline underline-offset-4 transition-colors pt-2"
          >
            Back to all activities
          </Link>
        </div>
      </div>
    );
  }

  // ── Flashcard screen ────────────────────────────────────────────────────
  return (
    <div className="max-w-xl mx-auto space-y-4">
      {/* Breadcrumb */}
      <div className="flex items-center justify-between">
        <Link
          to={backHref}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="size-3.5" /> {backLabel}
        </Link>
        <span className="text-xs font-bold text-muted-foreground">
          {index + 1} / {items.length}
        </span>
      </div>

      {/* Progress bar */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-1.5">
            <BookOpen className="size-3.5 text-primary" />
            <span className="text-xs font-bold text-primary">Learn Mode</span>
          </div>
          <span className="text-[11px] text-muted-foreground font-medium">
            {activity?.title}
          </span>
        </div>
        <Progress value={progressPct} className="h-2" />
      </div>

      {/* Flashcard */}
      <div
        key={index}
        className="animate-float-up rounded-3xl border-2 border-white/70 bg-gradient-to-br from-sky-50 via-indigo-50 to-violet-50 shadow-lg overflow-hidden"
      >
        <div className="p-6 md:p-8 space-y-4">
          {/* Term / topic */}
          <div className="flex flex-col items-center text-center gap-3">
            <div className="text-6xl select-none" aria-hidden>
              {item.emoji}
            </div>
            <h2 className="text-xl md:text-2xl font-extrabold tracking-tight text-slate-900">
              {item.title}
            </h2>
            {!revealed && (
              <p className="text-sm text-slate-500">Tap to learn more</p>
            )}
          </div>

          {/* Reveal button / revealed fact */}
          {!revealed ? (
            <button
              onClick={handleReveal}
              className="w-full rounded-2xl bg-primary text-primary-foreground py-3 font-bold text-sm hover:opacity-90 active:scale-[0.98] transition-all shadow"
            >
              Show Me!
            </button>
          ) : (
            <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
              {/* Fact */}
              <div className="rounded-2xl bg-white/90 border border-slate-100 p-4 shadow-sm">
                <p className="text-base md:text-lg text-slate-800 leading-relaxed text-center">
                  {item.fact}
                </p>
              </div>

              {/* Next / finish */}
              <button
                onClick={handleNext}
                className={cn(
                  "w-full inline-flex items-center justify-center gap-2 rounded-2xl py-3 font-bold text-sm shadow transition-colors active:scale-[0.98]",
                  isLast
                    ? "bg-emerald-600 text-white hover:bg-emerald-700"
                    : "bg-slate-900 text-white hover:bg-slate-800",
                )}
              >
                {isLast ? (
                  <>
                    <CheckCircle2 className="size-4" /> All done — Take the Quiz!
                  </>
                ) : (
                  <>
                    Got it! Next <ArrowRight className="size-4" />
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Skip link */}
      <p className="text-center text-xs text-muted-foreground">
        Already know this?{" "}
        <Link
          to={`/activity/${activityId}`}
          className="text-primary hover:underline underline-offset-4 font-medium"
        >
          Skip to the quiz →
        </Link>
      </p>
    </div>
  );
}
