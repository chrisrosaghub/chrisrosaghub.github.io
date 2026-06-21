import { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Wand2,
  Settings2,
  KeyRound,
  ChevronRight,
  ChevronDown,
  Loader2,
  Trash2,
  Star,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Sparkles,
  BookOpen,
  GraduationCap,
  Volume2,
  VolumeX,
} from "lucide-react";
import { useLevel } from "@/lib/brainy-hooks";
import { useTTS } from "@/lib/use-tts";
import {
  generateLearningPath,
  type GeneratedLearningPath,
  type AILearningStep,
  type AIQuestion,
} from "@/lib/custom-learn-ai";
import {
  getStoredPaths,
  addPath,
  removePath,
  getConfig,
  saveConfig,
  type CustomLearnConfig,
} from "@/lib/custom-learn-store";
import { LEVELS, type Level } from "@/lib/brainy-data";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

// ─── Types ───────────────────────────────────────────────────────────────────

type View =
  | { type: "home" }
  | { type: "overview"; path: GeneratedLearningPath }
  | { type: "step"; path: GeneratedLearningPath; stepIndex: number };

// ─── Step Quiz Component ──────────────────────────────────────────────────────

interface StepQuizProps {
  step: AILearningStep;
  stepIndex: number;
  totalSteps: number;
  onComplete: (score: number) => void;
  onBack: () => void;
}

const ENCOURAGEMENTS = ["Awesome! 🎉", "You got it! ⭐", "Brilliant! 🌟", "Way to go! 🚀", "Super! ✨"];
const TRY_AGAIN = ["Almost there!", "Good try!", "Keep going!", "So close!"];

function StepQuiz({ step, stepIndex, totalSteps, onComplete, onBack }: StepQuizProps) {
  const level = useLevel();
  const isEarlyLearner = level === "kindergarten" || level === "grade1";
  const { speak, stop, isSupported, isSpeaking, autoRead, toggleAutoRead } = useTTS();
  const [phase, setPhase] = useState<"learn" | "quiz">("learn");
  const [qIndex, setQIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const questions = step.questions;
  const question: AIQuestion | undefined = questions[qIndex];
  const total = questions.length;
  const progressPct = phase === "learn" ? 0 : ((qIndex + (revealed ? 1 : 0)) / total) * 100;

  // Full lesson text for read-aloud during the learn phase.
  const lessonText = `${step.title}. ${step.description} ${step.keyPoints.join(". ")}`;

  // Auto-read each quiz question when Read Aloud is enabled.
  useEffect(() => {
    if (phase === "quiz" && autoRead && question && !revealed) {
      const text = question.prompt + ". " + question.choices.map((c, i) => `${String.fromCharCode(65 + i)}: ${c}`).join(". ");
      speak(text);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qIndex, phase, autoRead]);

  // Auto-read the lesson when Read Aloud is enabled and we enter the learn phase.
  useEffect(() => {
    if (phase === "learn" && autoRead) {
      speak(lessonText);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, autoRead]);

  function handleSelect(idx: number) {
    if (revealed) return;
    setSelected(idx);
  }

  function handleCheck() {
    if (selected === null || !question) return;
    setRevealed(true);
    if (selected === question.answer) setScore((s) => s + 1);
  }

  function handleNext() {
    if (qIndex + 1 >= total) {
      setFinished(true);
    } else {
      setQIndex((i) => i + 1);
      setSelected(null);
      setRevealed(false);
    }
  }

  if (phase === "learn") {
    return (
      <div className="space-y-5 max-w-2xl mx-auto">
        <div className="flex items-center justify-between gap-3">
          <button
            onClick={() => { stop(); onBack(); }}
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="size-4" /> Back to overview
          </button>
          {isSupported && (
            <button
              type="button"
              onClick={toggleAutoRead}
              aria-label={autoRead ? "Turn off read aloud" : "Turn on read aloud"}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full font-bold transition-all",
                isEarlyLearner ? "px-4 py-2 text-sm shadow" : "px-3 py-1 text-xs border",
                autoRead
                  ? "bg-gradient-to-r from-amber-400 to-orange-400 text-white shadow-amber-200"
                  : isEarlyLearner
                    ? "bg-amber-100 text-amber-700 border-2 border-amber-300 hover:bg-amber-200"
                    : "bg-muted text-muted-foreground border-transparent hover:bg-muted/80",
              )}
            >
              {autoRead ? <Volume2 className={isEarlyLearner ? "size-4" : "size-3.5"} /> : <VolumeX className={isEarlyLearner ? "size-4" : "size-3.5"} />}
              {isEarlyLearner ? (autoRead ? "Reading!" : "Read to me!") : "Read Aloud"}
            </button>
          )}
        </div>

        <div className="rounded-3xl bg-gradient-to-br from-sky-400 via-blue-400 to-indigo-500 text-white p-6 md:p-8 shadow-lg space-y-3">
          <div className="flex items-center gap-3">
            <span className="text-5xl drop-shadow" aria-hidden>{step.emoji}</span>
            <div>
              <p className="text-xs font-bold uppercase tracking-wide opacity-75">
                Step {stepIndex + 1} of {totalSteps}
              </p>
              <h2 className="text-2xl font-extrabold leading-tight">{step.title}</h2>
            </div>
          </div>
          <p className="text-white/90 text-base leading-relaxed">{step.description}</p>
        </div>

        <div className="rounded-2xl border bg-card p-5 space-y-3 shadow-sm">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-bold text-base flex items-center gap-2">
              <BookOpen className="size-4 text-sky-500" /> Key Points
            </h3>
            {isSupported && (
              <button
                type="button"
                onClick={() => speak(lessonText)}
                aria-label="Read this lesson aloud"
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold transition-colors",
                  isSpeaking
                    ? "bg-sky-500 text-white border-sky-500"
                    : "bg-sky-50 text-sky-700 border-sky-200 hover:bg-sky-100",
                )}
              >
                <Volume2 className="size-3.5" />
                {isSpeaking ? "Reading…" : "Read aloud"}
              </button>
            )}
          </div>
          <ul className="space-y-2.5">
            {step.keyPoints.map((pt, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm">
                <span className="mt-0.5 flex-shrink-0 size-5 rounded-full bg-sky-100 text-sky-700 font-bold text-xs flex items-center justify-center">
                  {i + 1}
                </span>
                <span>{pt}</span>
              </li>
            ))}
          </ul>
        </div>

        <button
          onClick={() => { stop(); setPhase("quiz"); }}
          className="w-full rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-500 text-white font-bold py-3.5 px-6 shadow hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
        >
          Ready? Start Mini Quiz <ChevronRight className="size-5" />
        </button>
      </div>
    );
  }

  if (finished) {
    const stars = score === total ? 3 : score >= Math.ceil(total / 2) ? 2 : 1;
    return (
      <div className="max-w-2xl mx-auto space-y-5">
        <div className="rounded-3xl bg-gradient-to-br from-emerald-400 via-teal-400 to-cyan-400 text-white p-8 shadow-lg text-center space-y-4">
          <div className="text-6xl" aria-hidden>🎉</div>
          <h2 className="text-2xl font-extrabold">Step Complete!</h2>
          <div className="flex justify-center gap-1">
            {Array.from({ length: 3 }).map((_, i) => (
              <Star key={i} className={cn("size-8", i < stars ? "fill-yellow-300 text-yellow-300" : "text-white/30")} />
            ))}
          </div>
          <p className="text-white/90 text-lg font-semibold">
            {score} / {total} correct
          </p>
        </div>
        <button
          onClick={() => onComplete(score)}
          className="w-full rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold py-3.5 px-6 shadow hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
        >
          Continue <ChevronRight className="size-5" />
        </button>
        <button
          onClick={() => { setQIndex(0); setSelected(null); setRevealed(false); setScore(0); setFinished(false); }}
          className="w-full rounded-2xl border border-border py-3 px-6 text-sm font-semibold text-muted-foreground hover:bg-muted transition-colors flex items-center justify-center gap-2"
        >
          <RotateCcw className="size-4" /> Try again
        </button>
      </div>
    );
  }

  const isCorrect = revealed && selected === question?.answer;
  const encouragement = ENCOURAGEMENTS[Math.floor(Math.random() * ENCOURAGEMENTS.length)];
  const tryAgain = TRY_AGAIN[Math.floor(Math.random() * TRY_AGAIN.length)];

  const questionText = question
    ? question.prompt + ". " + question.choices.map((c, i) => `${String.fromCharCode(65 + i)}: ${c}`).join(". ")
    : "";

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      <div className="flex items-center justify-between gap-3">
        <button
          onClick={() => { stop(); onBack(); }}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="size-4" /> Back to overview
        </button>
        {isSupported && (
          <button
            type="button"
            onClick={toggleAutoRead}
            aria-label={autoRead ? "Turn off read aloud" : "Turn on read aloud"}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full font-bold transition-all",
              isEarlyLearner ? "px-4 py-2 text-sm shadow" : "px-3 py-1 text-xs border",
              autoRead
                ? "bg-gradient-to-r from-amber-400 to-orange-400 text-white shadow-amber-200"
                : isEarlyLearner
                  ? "bg-amber-100 text-amber-700 border-2 border-amber-300 hover:bg-amber-200"
                  : "bg-muted text-muted-foreground border-transparent hover:bg-muted/80",
            )}
          >
            {autoRead ? <Volume2 className={isEarlyLearner ? "size-4" : "size-3.5"} /> : <VolumeX className={isEarlyLearner ? "size-4" : "size-3.5"} />}
            {isEarlyLearner ? (autoRead ? "Reading!" : "Read to me!") : "Read Aloud"}
          </button>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-muted-foreground font-medium">
          <span>Question {qIndex + 1} of {total}</span>
          <span>{score} correct so far</span>
        </div>
        <Progress value={progressPct} className="h-2" />
      </div>

      <div className="rounded-2xl bg-card border shadow-sm p-6 space-y-5">
        <div className="flex items-start justify-between gap-3">
          <p className="text-lg font-bold leading-snug">{question?.prompt}</p>
          {isSupported && (
            <button
              type="button"
              onClick={() => speak(questionText)}
              aria-label="Read question aloud"
              className={cn(
                "flex-shrink-0 inline-flex items-center justify-center rounded-full border transition-colors",
                isEarlyLearner ? "size-11" : "size-9",
                isSpeaking
                  ? "bg-sky-500 text-white border-sky-500"
                  : "bg-sky-50 text-sky-700 border-sky-200 hover:bg-sky-100",
              )}
            >
              <Volume2 className={isEarlyLearner ? "size-5" : "size-4"} />
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 gap-2.5">
          {question?.choices.map((choice, i) => {
            const isSelected = selected === i;
            const isAnswer = i === question.answer;
            let cls = "rounded-xl border-2 px-4 py-3 text-sm font-medium text-left transition-all cursor-pointer ";
            if (!revealed) {
              cls += isSelected
                ? "border-sky-500 bg-sky-50 text-sky-700"
                : "border-border hover:border-sky-300 hover:bg-sky-50/50";
            } else {
              if (isAnswer) cls += "border-emerald-500 bg-emerald-50 text-emerald-700";
              else if (isSelected && !isAnswer) cls += "border-rose-400 bg-rose-50 text-rose-600";
              else cls += "border-border opacity-50";
            }
            return (
              <button key={i} className={cls} onClick={() => handleSelect(i)} disabled={revealed}>
                <span className="font-bold mr-2">{String.fromCharCode(65 + i)}.</span>
                {choice}
              </button>
            );
          })}
        </div>

        {revealed && (
          <div className={cn(
            "rounded-xl p-3 flex items-start gap-2 text-sm",
            isCorrect ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-600"
          )}>
            {isCorrect
              ? <CheckCircle2 className="size-4 mt-0.5 flex-shrink-0" />
              : <XCircle className="size-4 mt-0.5 flex-shrink-0" />}
            <div>
              <p className="font-bold">{isCorrect ? encouragement : tryAgain}</p>
              <p className="mt-0.5 opacity-80">{question?.explanation}</p>
            </div>
          </div>
        )}
      </div>

      {!revealed ? (
        <button
          onClick={handleCheck}
          disabled={selected === null}
          className="w-full rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-500 text-white font-bold py-3.5 px-6 shadow hover:opacity-90 transition-opacity disabled:opacity-40"
        >
          Check Answer
        </button>
      ) : (
        <button
          onClick={handleNext}
          className="w-full rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-500 text-white font-bold py-3.5 px-6 shadow hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
        >
          {qIndex + 1 >= total ? "See Results" : "Next Question"}
          <ChevronRight className="size-5" />
        </button>
      )}
    </div>
  );
}

// ─── Path Overview Component ──────────────────────────────────────────────────

interface PathOverviewProps {
  path: GeneratedLearningPath;
  onStartStep: (stepIndex: number) => void;
  onBack: () => void;
  onDelete: () => void;
}

function PathOverview({ path, onStartStep, onBack, onDelete }: PathOverviewProps) {
  const levelInfo = LEVELS.find((l) => l.id === path.level);

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="size-4" /> Back
      </button>

      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-pink-500 text-white p-6 md:p-8 shadow-lg space-y-3">
        <div className="absolute -right-6 -bottom-8 text-[10rem] opacity-20 select-none" aria-hidden>
          {path.emoji}
        </div>
        <div className="relative">
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-bold uppercase tracking-wide ring-1 ring-white/30">
              <GraduationCap className="size-3.5" /> {levelInfo?.label ?? path.level}
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight leading-tight">
            {path.emoji} {path.title}
          </h1>
          <p className="mt-2 text-white/85 text-sm md:text-base max-w-lg">{path.summary}</p>
        </div>
      </div>

      <div className="space-y-3">
        <h2 className="font-bold text-base text-muted-foreground uppercase tracking-wide text-xs">
          Learning Steps
        </h2>
        {path.steps.map((step, i) => (
          <div
            key={i}
            className="rounded-2xl border bg-card shadow-sm overflow-hidden"
          >
            <div className="flex items-center gap-4 p-4">
              <div className="flex-shrink-0 size-12 rounded-2xl bg-gradient-to-br from-violet-100 to-fuchsia-100 flex items-center justify-center text-2xl">
                {step.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide">
                  Step {i + 1}
                </p>
                <p className="font-bold text-base leading-tight truncate">{step.title}</p>
                <p className="text-sm text-muted-foreground mt-0.5 line-clamp-1">{step.description}</p>
              </div>
              <button
                onClick={() => onStartStep(i)}
                className="flex-shrink-0 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white text-sm font-bold px-4 py-2 shadow hover:opacity-90 transition-opacity"
              >
                Study <ChevronRight className="size-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={onDelete}
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-destructive transition-colors"
      >
        <Trash2 className="size-4" /> Remove this learning path
      </button>
    </div>
  );
}

// ─── Settings Panel ───────────────────────────────────────────────────────────

interface SettingsPanelProps {
  config: CustomLearnConfig;
  onChange: (c: CustomLearnConfig) => void;
}

function SettingsPanel({ config, onChange }: SettingsPanelProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-2xl border bg-card shadow-sm overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold hover:bg-muted/50 transition-colors"
        aria-expanded={open}
      >
        <span className="flex items-center gap-2">
          <Settings2 className="size-4 text-muted-foreground" />
          AI Settings
        </span>
        <ChevronDown className={cn("size-4 text-muted-foreground transition-transform", open && "rotate-180")} />
      </button>

      {open && (
        <div className="px-4 pb-4 space-y-4 border-t">
          <div className="space-y-1.5 pt-3">
            <Label htmlFor="api-key" className="flex items-center gap-1.5 text-xs font-semibold">
              <KeyRound className="size-3.5" /> OpenAI API Key
            </Label>
            <Input
              id="api-key"
              type="password"
              placeholder="sk-..."
              value={config.apiKey}
              onChange={(e) => onChange({ ...config, apiKey: e.target.value })}
            />
            <p className="text-xs text-muted-foreground">
              Stored in session memory only — never sent anywhere except the AI endpoint.
              Get a key at{" "}
              <a
                href="https://platform.openai.com/api-keys"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-foreground"
              >
                platform.openai.com
              </a>
              .
            </p>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="model" className="text-xs font-semibold">Model</Label>
            <Input
              id="model"
              placeholder="gpt-4o-mini"
              value={config.model}
              onChange={(e) => onChange({ ...config, model: e.target.value })}
            />
            <p className="text-xs text-muted-foreground">
              Default: <code>gpt-4o-mini</code>. Also compatible with{" "}
              <code>gpt-4o</code>, <code>gpt-4.1</code>, or any OpenAI-compatible endpoint.
            </p>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="base-url" className="text-xs font-semibold">API Base URL</Label>
            <Input
              id="base-url"
              placeholder="https://api.openai.com"
              value={config.baseUrl}
              onChange={(e) => onChange({ ...config, baseUrl: e.target.value })}
            />
            <p className="text-xs text-muted-foreground">
              Change to use a compatible provider (e.g. Azure OpenAI, Groq, local Ollama).
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function CustomLearnPage() {
  const currentLevel = useLevel();

  const [view, setView] = useState<View>({ type: "home" });
  const [topic, setTopic] = useState("");
  const [selectedLevel, setSelectedLevel] = useState<Level>(currentLevel);
  const [config, setConfig] = useState<CustomLearnConfig>(() => getConfig());
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paths, setPaths] = useState<GeneratedLearningPath[]>(() => getStoredPaths());

  // Sync level picker when profile level changes
  useEffect(() => {
    setSelectedLevel(currentLevel);
  }, [currentLevel]);

  const handleConfigChange = useCallback((c: CustomLearnConfig) => {
    setConfig(c);
    saveConfig(c);
  }, []);

  const handleGenerate = useCallback(async () => {
    const trimmedTopic = topic.trim();
    if (!trimmedTopic) return;
    if (!config.apiKey) {
      setError("Please enter your OpenAI API key in AI Settings below.");
      return;
    }

    setGenerating(true);
    setError(null);

    try {
      const path = await generateLearningPath({
        topic: trimmedTopic,
        level: selectedLevel,
        apiKey: config.apiKey,
        baseUrl: config.baseUrl,
        model: config.model,
      });
      addPath(path);
      setPaths(getStoredPaths());
      setView({ type: "overview", path });
      setTopic("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setGenerating(false);
    }
  }, [topic, selectedLevel, config]);

  const handleDeletePath = useCallback((id: string) => {
    removePath(id);
    setPaths(getStoredPaths());
    if (view.type === "overview" && view.path.id === id) {
      setView({ type: "home" });
    }
  }, [view]);

  // ── Step view ──
  if (view.type === "step") {
    return (
      <div className="max-w-2xl mx-auto">
        <StepQuiz
          step={view.path.steps[view.stepIndex]}
          stepIndex={view.stepIndex}
          totalSteps={view.path.steps.length}
          onComplete={() => setView({ type: "overview", path: view.path })}
          onBack={() => setView({ type: "overview", path: view.path })}
        />
      </div>
    );
  }

  // ── Overview view ──
  if (view.type === "overview") {
    return (
      <PathOverview
        path={view.path}
        onStartStep={(stepIndex) => setView({ type: "step", path: view.path, stepIndex })}
        onBack={() => setView({ type: "home" })}
        onDelete={() => handleDeletePath(view.path.id)}
      />
    );
  }

  // ── Home view ──
  const levelInfo = LEVELS.find((l) => l.id === selectedLevel);

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-pink-500 text-white shadow-lg p-6 md:p-10">
        <div className="absolute -right-10 -top-10 text-[10rem] opacity-20 select-none" aria-hidden>
          🧠
        </div>
        <div className="relative space-y-2 max-w-xl">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-bold uppercase tracking-wide ring-1 ring-white/30">
            <Sparkles className="size-3.5" /> AI-Powered
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight drop-shadow">
            Build Your Learning Path
          </h1>
          <p className="text-white/85 text-base md:text-lg">
            Tell us what you want to learn and we'll create a custom, age-appropriate lesson
            just for you — powered by AI.
          </p>
        </div>
      </section>

      {/* Generator Form */}
      <div className="rounded-3xl border bg-card shadow-sm p-5 md:p-6 space-y-5">
        <h2 className="font-extrabold text-lg flex items-center gap-2">
          <Wand2 className="size-5 text-fuchsia-500" /> What do you want to learn?
        </h2>

        <div className="space-y-1.5">
          <Label htmlFor="topic" className="text-sm font-semibold">Topic or Subject</Label>
          <div className="relative">
            <Input
              id="topic"
              placeholder="e.g. How volcanoes work, The American Revolution, Fractions..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !generating) handleGenerate();
              }}
              disabled={generating}
              className="pr-4 text-base h-11"
            />
          </div>
        </div>

        {/* Grade Level Selector */}
        <div className="space-y-2">
          <Label className="text-sm font-semibold flex items-center gap-1.5">
            <GraduationCap className="size-4 text-muted-foreground" /> Grade Level
          </Label>
          <div className="flex flex-wrap gap-2">
            {LEVELS.map((lvl) => (
              <button
                key={lvl.id}
                type="button"
                onClick={() => setSelectedLevel(lvl.id as Level)}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-bold border-2 transition-all",
                  selectedLevel === lvl.id
                    ? "border-fuchsia-500 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white shadow"
                    : "border-border text-slate-600 hover:border-fuchsia-300 hover:bg-fuchsia-50"
                )}
              >
                <span aria-hidden>{lvl.emoji}</span> {lvl.label}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="rounded-xl bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 text-sm">
            {error}
          </div>
        )}

        <button
          onClick={handleGenerate}
          disabled={generating || !topic.trim()}
          className="w-full rounded-2xl bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 text-white font-extrabold py-3.5 px-6 shadow hover:opacity-90 transition-opacity disabled:opacity-40 flex items-center justify-center gap-2 text-base"
        >
          {generating ? (
            <>
              <Loader2 className="size-5 animate-spin" />
              Building your learning path…
            </>
          ) : (
            <>
              <Wand2 className="size-5" />
              Generate Learning Path
            </>
          )}
        </button>

        {generating && (
          <div className="rounded-xl bg-fuchsia-50 border border-fuchsia-200 text-fuchsia-700 px-4 py-3 text-sm text-center space-y-1">
            <p className="font-semibold">✨ AI is crafting your {levelInfo?.label} lesson…</p>
            <p className="opacity-75">This usually takes 5–15 seconds.</p>
          </div>
        )}

        {/* AI Settings */}
        <SettingsPanel config={config} onChange={handleConfigChange} />
      </div>

      {/* History */}
      {paths.length > 0 && (
        <div className="space-y-3">
          <h2 className="font-bold text-sm text-muted-foreground uppercase tracking-wide">
            Recent Learning Paths (this session)
          </h2>
          <div className="space-y-2.5">
            {paths.map((p) => {
              const lvl = LEVELS.find((l) => l.id === p.level);
              return (
                <div
                  key={p.id}
                  className="rounded-2xl border bg-card shadow-sm flex items-center gap-4 p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex-shrink-0 text-3xl" aria-hidden>{p.emoji}</div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-base leading-tight truncate">{p.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {lvl?.emoji} {lvl?.label} · {p.steps.length} steps
                    </p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => setView({ type: "overview", path: p })}
                      className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white text-xs font-bold px-3.5 py-2 shadow hover:opacity-90 transition-opacity"
                    >
                      Open <ChevronRight className="size-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeletePath(p.id)}
                      aria-label="Delete"
                      className="text-muted-foreground hover:text-destructive transition-colors p-1"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Empty state */}
      {paths.length === 0 && !generating && (
        <div className="rounded-2xl border border-dashed bg-card/50 p-8 text-center space-y-2 text-muted-foreground">
          <div className="text-4xl" aria-hidden>🚀</div>
          <p className="font-semibold">No learning paths yet</p>
          <p className="text-sm">Enter a topic above and hit Generate to get started!</p>
        </div>
      )}
    </div>
  );
}
