import { useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2, RotateCcw } from "lucide-react";
import { LEARN_GROUPS } from "@/lib/brainy-data-states";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

export default function StatesLearnPage() {
    const { groupId } = useParams<{ groupId: string }>();
    const group = LEARN_GROUPS.find((g) => g.id === groupId);

    const [index, setIndex] = useState(0);
    const [revealed, setRevealed] = useState(false);
    const [finished, setFinished] = useState(false);

    if (!group) return <Navigate to="/states" replace />;

    const state = group.states[index];
    const isLast = index + 1 >= group.states.length;
    const progressPct = ((index + (revealed ? 1 : 0)) / group.states.length) * 100;

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

    if (finished) {
        return (
            <div className="max-w-xl mx-auto space-y-5">
                <Link
                    to="/states"
                    className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                    <ArrowLeft className="size-4" /> Back to States &amp; Capitals
                </Link>

                <div className="rounded-3xl bg-gradient-to-br from-emerald-400 via-teal-400 to-cyan-400 text-white p-8 shadow-lg text-center space-y-4">
                    <div className="text-6xl select-none">🎉</div>
                    <h1 className="text-2xl font-extrabold">You did it!</h1>
                    <p className="text-white/90 text-base">
                        You reviewed all <strong>{group.states.length} states</strong> in the{" "}
                        <strong>{group.title}</strong> group.
                    </p>
                    <p className="text-white/80 text-sm">
                        Ready to put your memory to the test?
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                        <Link
                            to={`/activity/${group.quizActivityId}`}
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
                        to="/states"
                        className="block text-xs text-white/60 hover:text-white/90 underline underline-offset-4 transition-colors pt-2"
                    >
                        Back to all activities
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-xl mx-auto space-y-4">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm">
                <Link
                    to="/states"
                    className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
                >
                    <ArrowLeft className="size-3.5" /> States &amp; Capitals
                </Link>
                <span className="text-muted-foreground/40">›</span>
                <span className="font-semibold">
                    {group.emoji} {group.title} — Learn Mode
                </span>
            </div>

            {/* Progress bar */}
            <div>
                <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-1.5">
                        <BookOpen className="size-3.5 text-primary" />
                        <span className="text-xs font-bold text-primary">Studying</span>
                    </div>
                    <span className="text-xs text-muted-foreground font-medium">
                        {index + 1} / {group.states.length}
                    </span>
                </div>
                <Progress value={progressPct} className="h-2" />
            </div>

            {/* Flashcard */}
            <div className="rounded-3xl border-2 border-white/70 bg-gradient-to-br from-sky-50 via-indigo-50 to-violet-50 shadow-lg overflow-hidden">
                {/* State map */}
                <div className="flex justify-center items-center py-6 bg-white/50 min-h-[140px]">
                    <img
                        key={state.name}
                        src={state.img}
                        alt={`${state.name} highlighted on US map`}
                        className="h-28 w-44 object-contain"
                        loading="lazy"
                        onError={(e) => {
                            (e.currentTarget as HTMLImageElement).style.display = "none";
                        }}
                    />
                </div>

                <div className="p-6 space-y-4">
                    {/* State name prompt */}
                    <div className="text-center space-y-1">
                        <div className="text-2xl font-extrabold text-slate-900">{state.name}</div>
                        <div className="text-sm text-slate-500">What is the capital?</div>
                    </div>

                    {/* Reveal / revealed state */}
                    {!revealed ? (
                        <button
                            onClick={handleReveal}
                            className="w-full rounded-2xl bg-primary text-primary-foreground py-3 font-bold text-sm hover:opacity-90 active:scale-[0.98] transition-all shadow"
                        >
                            Tap to Reveal Capital
                        </button>
                    ) : (
                        <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
                            {/* Capital reveal */}
                            <div className="rounded-2xl bg-white/90 border border-emerald-100 p-4 text-center shadow-sm">
                                <div className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-1">
                                    Capital
                                </div>
                                <div className="text-3xl font-extrabold text-emerald-600">{state.capital}</div>
                            </div>

                            {/* Fun fact */}
                            {state.explanation && (
                                <div className="rounded-2xl bg-amber-50 border border-amber-100 p-3 text-sm text-amber-900 leading-relaxed">
                                    💡 {state.explanation}
                                </div>
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
                                        Next State <ArrowRight className="size-4" />
                                    </>
                                )}
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Skip to quiz */}
            <p className="text-center text-xs text-muted-foreground">
                Already know these?{" "}
                <Link
                    to={`/activity/${group.quizActivityId}`}
                    className="text-primary hover:underline underline-offset-4 font-medium"
                >
                    Skip to the quiz →
                </Link>
            </p>
        </div>
    );
}
