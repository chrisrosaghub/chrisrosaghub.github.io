import { useEffect, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2, RotateCcw, Volume2, VolumeX } from "lucide-react";
import { ACTIVITY_LEARN_DATA } from "@/lib/activity-learn-data";
import { ACTIVITIES } from "@/lib/brainy-data";
import { useTTS } from "@/lib/use-tts";
import { useLevel } from "@/lib/brainy-hooks";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

export default function LearnPage() {
  const { activityId } = useParams<{ activityId: string }>();
  const items = ACTIVITY_LEARN_DATA[activityId ?? ""] ?? [];
  const activity = ACTIVITIES.find((a) => a.id === activityId);

  const [index, setIndex] = useState(0);
  const [finished, setFinished] = useState(false);
  const { speak, stop, isSupported, isSpeaking, autoRead, toggleAutoRead } = useTTS();
  const level = useLevel();
  const isEarlyLearner = level === "kindergarten" || level === "grade1";

  // Auto-read the full card when it changes
  useEffect(() => {
    if (autoRead && items.length > 0) {
      speak(items[index].title + ". " + items[index].fact);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, autoRead]);

  // No learn data — send straight to the quiz
  if (!activityId || items.length === 0) {
    return <Navigate to={`/activity/${activityId}`} replace />;
  }

  const item = items[index];
  const isLast = index + 1 >= items.length;
  const progressPct = (index / items.length) * 100;
  const backHref = activity ? `/${activity.subjectId}` : "/";
  const backLabel = activity ? `Back to ${activity.subjectId === "states" ? "States & Capitals" : activity.subjectId.charAt(0).toUpperCase() + activity.subjectId.slice(1)}` : "Back";

  function handleNext() {
    if (isLast) {
      stop();
      setFinished(true);
    } else {
      setIndex((i) => i + 1);
    }
  }

  function handleRestart() {
    stop();
    setIndex(0);
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
        <div className="flex items-center gap-2">
          {isSupported && (
            <button
              onClick={toggleAutoRead}
              aria-label={autoRead ? "Turn off read aloud" : "Turn on read aloud"}
              title={autoRead ? "Read Aloud: ON" : "Read Aloud: OFF"}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full font-bold transition-all",
                isEarlyLearner
                  ? cn(
                      "px-4 py-2 text-sm shadow",
                      autoRead
                        ? "bg-gradient-to-r from-amber-400 to-orange-400 text-white shadow-amber-200"
                        : "bg-amber-100 text-amber-700 border-2 border-amber-300 hover:bg-amber-200",
                    )
                  : cn(
                      "px-3 py-1 text-xs border",
                      autoRead
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-muted text-muted-foreground border-transparent hover:bg-muted/80",
                    ),
              )}
            >
              {autoRead
                ? <Volume2 className={isEarlyLearner ? "size-4" : "size-3.5"} />
                : <VolumeX className={isEarlyLearner ? "size-4" : "size-3.5"} />}
              {isEarlyLearner ? (autoRead ? "Reading!" : "Read to me!") : "Read Aloud"}
            </button>
          )}
          <span className="text-xs font-bold text-muted-foreground">
            {index + 1} / {items.length}
          </span>
        </div>
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
            {item.elementCard ? (
              <div className={`relative rounded-2xl bg-gradient-to-br ${item.elementCard.gradient} shadow-lg px-6 py-4 min-w-[120px] text-white text-center select-none`}>
                <div className="text-xs font-bold opacity-80 mb-0.5">{item.elementCard.number}</div>
                <div className="text-5xl font-black leading-none tracking-tight">{item.elementCard.symbol}</div>
                <div className="text-sm font-bold mt-1 opacity-90">{item.elementCard.name}</div>
              </div>
            ) : (
              <div className="text-6xl select-none" aria-hidden>
                {item.emoji}
              </div>
            )}
            <h2 className="text-xl md:text-2xl font-extrabold tracking-tight text-slate-900">
              {item.title}
            </h2>
          </div>

          {/* Fact */}
          <div className="rounded-2xl bg-white/90 border border-slate-100 p-4 shadow-sm">
            <p className="text-base md:text-lg text-slate-800 leading-relaxed text-center">
              {item.fact}
            </p>
          </div>

          {/* Read aloud button */}
          {isSupported && (
            <button
              onClick={() => speak(item.title + ". " + item.fact)}
              aria-label="Read aloud"
              className={cn(
                "mx-auto flex items-center gap-2 rounded-full font-bold transition-all",
                isEarlyLearner
                  ? cn(
                      "px-5 py-2.5 text-sm shadow-md",
                      isSpeaking
                        ? "bg-gradient-to-r from-amber-400 to-orange-400 text-white"
                        : "bg-amber-100 text-amber-700 border-2 border-amber-300 hover:bg-amber-200",
                    )
                  : cn(
                      "px-3 py-1 text-xs font-semibold border",
                      isSpeaking
                        ? "bg-primary/10 text-primary border-primary/20"
                        : "bg-white/80 text-slate-500 border-slate-200 hover:text-primary hover:border-primary/30",
                    ),
              )}
            >
              <Volume2 className={isEarlyLearner ? "size-4" : "size-3"} />
              {isSpeaking ? "Reading…" : isEarlyLearner ? "🔊 Read to me!" : "Read aloud"}
            </button>
          )}

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
