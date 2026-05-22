import { useEffect, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2, RotateCcw, Volume2, VolumeX } from "lucide-react";
import { LEARN_GROUPS } from "@/lib/brainy-data-states";
import { useTTS } from "@/lib/use-tts";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

export default function StatesLearnPage() {
    const { groupId } = useParams<{ groupId: string }>();
    const group = LEARN_GROUPS.find((g) => g.id === groupId);

    const [index, setIndex] = useState(0);
    const [revealed, setRevealed] = useState(false);
    const [finished, setFinished] = useState(false);
    const { speak, stop, isSupported, isSpeaking, autoRead, toggleAutoRead } = useTTS();

    if (!group) return <Navigate to="/states" replace />;

    const state = group.states[index];
    const isLast = index + 1 >= group.states.length;
    const progressPct = ((index + (revealed ? 1 : 0)) / group.states.length) * 100;

    // Auto-read state name when card changes
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        if (autoRead) speak(state.name + ". What is the capital?");
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [index, autoRead]);

    // Auto-read capital when revealed
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        if (autoRead && revealed) {
            const text = "The capital of " + state.name + " is " + state.capital +
                (state.explanation ? ". " + state.explanation : "");
            speak(text);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [revealed, autoRead]);

    function handleReveal() {
        setRevealed(true);
    }

    function handleNext() {
        if (isLast) {
            stop();
            setFinished(true);
        } else {
            setIndex((i) => i + 1);
            setRevealed(false);
        }
    }

    function handleRestart() {
        stop();
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
            <div className="flex items-center justify-between gap-2 text-sm flex-wrap">
                <Link
                    to="/states"
                    className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
                >
                    <ArrowLeft className="size-3.5" /> States &amp; Capitals
                </Link>
                <div className="flex items-center gap-2">
                    {isSupported && (
                        <button
                            onClick={toggleAutoRead}
                            aria-label={autoRead ? "Turn off read aloud" : "Turn on read aloud"}
                            title={autoRead ? "Read Aloud: ON" : "Read Aloud: OFF"}
                            className={cn(
                                "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold border transition-colors",
                                autoRead
                                    ? "bg-primary text-primary-foreground border-primary"
                                    : "bg-muted text-muted-foreground border-transparent hover:bg-muted/80",
                            )}
                        >
                            {autoRead ? <Volume2 className="size-3.5" /> : <VolumeX className="size-3.5" />}
                            Read Aloud
                        </button>
                    )}
                    <span className="font-semibold text-xs text-muted-foreground">
                        {group.emoji} {group.title}
                    </span>
                </div>
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

                    {/* Manual read button — before reveal */}
                    {!revealed && isSupported && (
                        <button
                            onClick={() => speak(state.name + ". What is the capital?")}
                            aria-label="Read state name aloud"
                            className={cn(
                                "mx-auto flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold border transition-colors",
                                isSpeaking
                                    ? "bg-primary/10 text-primary border-primary/20"
                                    : "bg-white/80 text-slate-500 border-slate-200 hover:text-primary hover:border-primary/30",
                            )}
                        >
                            <Volume2 className="size-3" />
                            {isSpeaking ? "Reading…" : "Read aloud"}
                        </button>
                    )}

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

                            {/* Manual read button — after reveal */}
                            {isSupported && (
                                <button
                                    onClick={() => speak(
                                        "The capital of " + state.name + " is " + state.capital +
                                        (state.explanation ? ". " + state.explanation : "")
                                    )}
                                    aria-label="Read capital and fact aloud"
                                    className={cn(
                                        "mx-auto flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold border transition-colors",
                                        isSpeaking
                                            ? "bg-primary/10 text-primary border-primary/20"
                                            : "bg-white/80 text-slate-500 border-slate-200 hover:text-primary hover:border-primary/30",
                                    )}
                                >
                                    <Volume2 className="size-3" />
                                    {isSpeaking ? "Reading…" : "Read aloud"}
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
