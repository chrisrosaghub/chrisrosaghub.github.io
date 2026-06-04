import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, CheckCircle2, RotateCcw, Star, Trophy, XCircle, Volume2, VolumeX } from "lucide-react";
import {
  useActivity,
  useRoundKey,
  useCompleteActivity,
  useSubject,
  useLevel,
} from "@/lib/brainy-hooks";
import { useTTS } from "@/lib/use-tts";
import type { Badge, Question, SubjectId } from "@/lib/brainy-data";
import { DAILY_CHALLENGE_ID } from "@/lib/brainy-data";
import { Progress } from "@/components/ui/progress";
import { Shimmer } from "@/components/brainy/Shimmer";
import { Confetti } from "@/components/brainy/Confetti";
import { cn } from "@/lib/utils";

const ENCOURAGEMENTS = ["Awesome!", "You got it!", "Brilliant!", "Way to go!", "Super star!", "Wonderful!"];
const TRY_AGAIN = ["Almost!", "Good try!", "Keep going!", "You can do it!"];

export default function ActivityPage() {
  const { activityId } = useParams<{ activityId: string }>();
  const navigate = useNavigate();
  const isDaily = activityId === DAILY_CHALLENGE_ID;
  const { roundKey, nextRound } = useRoundKey();
  const { data: activity, isLoading } = useActivity(activityId, roundKey);
  const { data: subject } = useSubject(
    isDaily ? undefined : (activity?.subjectId as SubjectId | undefined),
  );
  const completeMutation = useCompleteActivity();
  const level = useLevel();
  const { speak, isSpeaking, autoRead, toggleAutoRead, isSupported } = useTTS();
  const isEarlyLearner = level === "kindergarten" || level === "grade1";

  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [missedQuestions, setMissedQuestions] = useState<Question[]>([]);
  const [finished, setFinished] = useState(false);
  const [summary, setSummary] = useState<{
    starsEarned: number;
    newBadges: Badge[];
    totalStars: number;
    streakDays: number;
  } | null>(null);
  // Reset on activity change.
  useEffect(() => {
    setIndex(0);
    setSelected(null);
    setRevealed(false);
    setCorrectCount(0);
    setMissedQuestions([]);
    setFinished(false);
    setSummary(null);
  }, [activityId]);

  // Auto-speak question when Read Aloud is enabled
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (autoRead && question) {
      const text = question.prompt + ". " + question.choices.map((c, i) => `${String.fromCharCode(65 + i)}: ${c}`).join(". ");
      speak(text);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, autoRead]);

  const total = activity?.questions.length ?? 0;
  const question = activity?.questions[index];
  const progressPct = total ? ((index + (revealed ? 1 : 0)) / total) * 100 : 0;

  const encouragement = useMemo(
    () => ENCOURAGEMENTS[Math.floor(Math.random() * ENCOURAGEMENTS.length)],
    [index, revealed],
  );
  const tryAgain = useMemo(
    () => TRY_AGAIN[Math.floor(Math.random() * TRY_AGAIN.length)],
    [index, revealed],
  );

  function handleSelect(choiceIdx: number) {
    if (revealed || !question) return;
    setSelected(choiceIdx);
    setRevealed(true);
    if (choiceIdx === question.answer) {
      setCorrectCount((c) => c + 1);
    } else {
      setMissedQuestions((prev) => [...prev, question]);
    }
  }

  function handleNext() {
    if (!activity) return;
    if (index + 1 >= activity.questions.length) {
      // Finish
      const finalCorrect = correctCount; // already updated by handleSelect
      completeMutation.mutate(
        {
          activityId: activity.id,
          subjectId: activity.subjectId,
          correct: finalCorrect,
          total: activity.questions.length,
          isDaily,
        },
        {
          onSuccess: (res) => {
            setSummary(res);
            setFinished(true);
          },
          onError: () => {
            // Saving failed — still show finish screen with locally-computed values
            const isPerfect = finalCorrect === activity.questions.length && activity.questions.length > 0;
            const starsEarned = 1 + finalCorrect + (isPerfect ? 2 : 0) + (isDaily ? 5 : 0);
            setSummary({ starsEarned, newBadges: [], totalStars: starsEarned, streakDays: 1 });
            setFinished(true);
          },
        },
      );
      return;
    }
    setIndex((i) => i + 1);
    setSelected(null);
    setRevealed(false);
  }

  function handleTryAnother() {
    nextRound();
    setIndex(0);
    setSelected(null);
    setRevealed(false);
    setCorrectCount(0);
    setMissedQuestions([]);
    setFinished(false);
    setSummary(null);
  }

  if (isLoading || !activity) {
    return (
      <div className="max-w-2xl mx-auto space-y-4">
        <Shimmer className="h-8 w-1/2" />
        <Shimmer className="h-4 w-2/3" />
        <Shimmer className="h-40 w-full" />
        <div className="grid grid-cols-2 gap-3">
          {Array.from({ length: 4 }).map((_, i) => <Shimmer key={i} className="h-12" />)}
        </div>
      </div>
    );
  }

  // Header gradient/back-link differ for the daily challenge vs subject activities.
  const headerGradient = isDaily
    ? "from-fuchsia-400 via-violet-400 to-sky-400"
    : (subject?.gradientClass ?? "from-slate-200 to-slate-300");
  const backHref = isDaily ? "/" : `/${activity.subjectId}`;
  const backLabel = isDaily ? "Back to home" : `Back to ${subject?.name ?? "subject"}`;

  if (finished && summary) {
    const isPerfect = correctCount === activity.questions.length;
    return (
      <div className="relative max-w-2xl mx-auto">
        <Confetti />
        <div className="relative animate-pop-in rounded-3xl border-2 border-white/60 bg-white shadow-xl p-6 md:p-8 text-center">
          <div className="text-6xl mb-2" aria-hidden>
            {isDaily ? "🏆" : isPerfect ? "🏆" : "🎉"}
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            {isDaily
              ? "Daily Challenge complete!"
              : isPerfect
                ? "Perfect score!"
                : "Great job!"}
          </h1>
          <p className="text-muted-foreground mt-1">
            You got <span className="font-bold text-emerald-600">{correctCount}</span> out of{" "}
            <span className="font-bold">{activity.questions.length}</span> right.
          </p>

          <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-amber-100 ring-2 ring-amber-200 px-5 py-2.5 text-amber-800 font-extrabold text-lg shadow">
            <Star className="size-5 fill-amber-400 text-amber-500" />
            +{summary.starsEarned} stars earned!
          </div>

          {summary.newBadges.length > 0 && (
            <div className="mt-5">
              <div className="text-sm font-bold text-muted-foreground mb-2">New badges unlocked!</div>
              <div className="flex flex-wrap items-center justify-center gap-2">
                {summary.newBadges.map((b) => (
                  <span
                    key={b.id}
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-100 to-orange-100 ring-2 ring-amber-200 px-3 py-1.5 text-sm font-bold animate-pop-in"
                  >
                    <span className="text-lg" aria-hidden>{b.emoji}</span> {b.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {missedQuestions.length > 0 && (
            <div className="mt-6 text-left">
              <h2 className="text-base font-extrabold tracking-tight mb-3 flex items-center gap-2">
                <span aria-hidden>📖</span> Study these!
              </h2>
              <div className="space-y-3">
                {missedQuestions.map((q) => (
                  <div
                    key={q.id}
                    className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm"
                  >
                    <p className="font-bold text-rose-900">{q.prompt}</p>
                    <p className="mt-1 text-emerald-800 font-semibold">
                      ✓ {q.choices[q.answer]}
                    </p>
                    {q.explanation && (
                      <p className="mt-1 text-slate-600">{q.explanation}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {!isDaily && (
              <button
                type="button"
                onClick={handleTryAnother}
                className="inline-flex items-center gap-2 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 px-4 py-2 text-sm font-bold shadow"
              >
                <RotateCcw className="size-4" /> Try again
              </button>
            )}
            {isDaily ? (
              <button
                type="button"
                onClick={() => navigate("/")}
                className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 text-sm font-bold shadow"
              >
                Back to home <ArrowRight className="size-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => navigate(`/${activity.subjectId}`)}
                className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 text-sm font-bold shadow"
              >
                More {subject?.name ?? ""} activities <ArrowRight className="size-4" />
              </button>
            )}
            <button
              type="button"
              onClick={() => navigate("/progress")}
              className="inline-flex items-center gap-2 rounded-full bg-white border-2 px-4 py-2 text-sm font-bold shadow"
            >
              See my progress
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <div className="flex items-center justify-between gap-3">
        <Link
          to={backHref}
          className="inline-flex items-center gap-1 text-sm font-semibold text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" /> {backLabel}
        </Link>
        <div className="flex items-center gap-2">
          {isSupported && (
            <button
              type="button"
              onClick={toggleAutoRead}
              aria-label={autoRead ? "Turn off read aloud" : "Turn on read aloud"}
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
            Question {Math.min(index + 1, total)} of {total}
          </span>
        </div>
      </div>

      <div
        className={cn(
          "relative overflow-hidden rounded-3xl border-2 border-white/60 shadow-md p-6 md:p-8 bg-gradient-to-br text-white",
          headerGradient,
          !isDaily && "text-slate-900",
        )}
      >
        <div className="absolute -right-4 -bottom-6 text-[8rem] leading-none opacity-25 select-none" aria-hidden>
          {activity.emoji}
        </div>
        <div className="relative space-y-3">
          <div className={cn(
            "flex items-center gap-2 text-sm font-bold",
            isDaily ? "text-white" : "text-slate-900/80",
          )}>
            <span className="text-2xl" aria-hidden>{activity.emoji}</span>
            <span>{activity.title}</span>
            {isDaily && (
              <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-white/25 ring-1 ring-white/40 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide">
                <Trophy className="size-3" /> Daily
              </span>
            )}
          </div>
          <Progress value={progressPct} className="bg-white/60 h-3" />
        </div>
      </div>

      <div
        key={index}
        className="animate-float-up rounded-3xl border-2 border-white/60 bg-white shadow-md p-6 md:p-8 space-y-5"
      >
        {question?.image && (
          <div className="flex justify-center">
            <img
              src={question.image}
              alt="State location map"
              loading="lazy"
              className="h-40 w-auto max-w-full rounded-2xl border border-slate-100 bg-slate-50 shadow-sm object-contain"
              onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
            />
          </div>
        )}

        <h2 className="text-xl md:text-2xl font-extrabold tracking-tight text-center">
          {question?.prompt}
        </h2>

        {/* Read question aloud button */}
        {isSupported && question && (
          <div className="flex justify-center">
            <button
              type="button"
              onClick={() => {
                const text = question.prompt + ". " + question.choices.map((c, i) => `${String.fromCharCode(65 + i)}: ${c}`).join(". ");
                speak(text);
              }}
              aria-label="Read question aloud"
              className={cn(
                "inline-flex items-center gap-2 rounded-full font-bold transition-all",
                isEarlyLearner
                  ? cn(
                      "px-5 py-2.5 text-sm shadow-md",
                      isSpeaking
                        ? "bg-gradient-to-r from-amber-400 to-orange-400 text-white"
                        : "bg-amber-100 text-amber-700 border-2 border-amber-300 hover:bg-amber-200",
                    )
                  : cn(
                      "px-3 py-1.5 text-xs border",
                      isSpeaking
                        ? "bg-primary/10 text-primary border-primary/20"
                        : "bg-white/80 text-slate-500 border-slate-200 hover:text-primary hover:border-primary/30",
                    ),
              )}
            >
              <Volume2 className={isEarlyLearner ? "size-4" : "size-3.5"} />
              {isSpeaking ? "Reading…" : isEarlyLearner ? "🔊 Read to me!" : "Read aloud"}
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {question?.choices.map((choice, idx) => {
            const isCorrect = idx === question.answer;
            const isSelected = idx === selected;
            let stateClass =
              "bg-white hover:bg-secondary border-border hover:border-primary/40";
            if (revealed) {
              if (isCorrect) {
                stateClass = "bg-emerald-100 border-emerald-300 text-emerald-900 ring-2 ring-emerald-300";
              } else if (isSelected) {
                stateClass = "bg-rose-100 border-rose-300 text-rose-900 ring-2 ring-rose-300";
              } else {
                stateClass = "bg-white border-border opacity-70";
              }
            }
            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelect(idx)}
                disabled={revealed}
                className={cn(
                  "group relative rounded-2xl border-2 px-4 py-4 text-left text-base md:text-lg font-bold shadow-sm transition-all",
                  "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30",
                  !revealed && "hover:-translate-y-0.5 hover:shadow-md",
                  stateClass,
                )}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      "inline-flex size-9 items-center justify-center rounded-full text-sm font-extrabold",
                      revealed && isCorrect
                        ? "bg-emerald-500 text-white"
                        : revealed && isSelected
                          ? "bg-rose-500 text-white"
                          : "bg-secondary text-secondary-foreground",
                    )}
                    aria-hidden
                  >
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="flex-1">{choice}</span>
                  {revealed && isCorrect && <CheckCircle2 className="size-5 text-emerald-600" />}
                  {revealed && isSelected && !isCorrect && <XCircle className="size-5 text-rose-600" />}
                </div>
              </button>
            );
          })}
        </div>

        {revealed && question && (
          <div
            className={cn(
              "animate-pop-in rounded-2xl px-4 py-3 text-sm md:text-base font-semibold flex items-start gap-2",
              selected === question.answer
                ? "bg-emerald-50 text-emerald-800 ring-1 ring-emerald-200"
                : "bg-amber-50 text-amber-900 ring-1 ring-amber-200",
            )}
          >
            <span className="text-xl" aria-hidden>
              {selected === question.answer ? "🎉" : "💡"}
            </span>
            <div className="flex-1">
              <div className="font-extrabold">
                {selected === question.answer ? encouragement : tryAgain}
              </div>
              <div>
                {selected === question.answer
                  ? question.explanation ?? "That’s correct!"
                  : `The correct answer was ${String.fromCharCode(65 + question.answer)}: ${question.choices[question.answer]}.`}
              </div>
            </div>
          </div>
        )}

        {revealed && (
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleNext}
              disabled={completeMutation.isPending}
              className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-60 px-5 py-2.5 text-sm md:text-base font-extrabold shadow"
            >
              {index + 1 >= total
                ? completeMutation.isPending
                  ? "Saving…"
                  : "See my score"
                : "Next question"}
              <ArrowRight className="size-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
