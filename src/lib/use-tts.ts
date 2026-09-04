/**
 * useTTS — thin wrapper around the Web Speech API (SpeechSynthesis).
 * Automatically selects the highest-quality available voice (neural/enhanced).
 * All state is local to the component; no persistence.
 */
import { useCallback, useEffect, useRef, useState } from "react";

// Friendly modern voices to prefer when the browser exposes several voices of
// the same quality. Quality is scored first, so an unlisted Natural voice still
// beats an older exact-name match such as Google US English.
const FRIENDLY_VOICE_NAMES = [
  "ava",
  "aria",
  "jenny",
  "emma",
  "ana",
  "samantha",
  "karen",
  "andrew",
  "brian",
  "guy",
  "alex",
];

function scoreVoice(voice: SpeechSynthesisVoice): number {
  if (!voice.lang.toLowerCase().startsWith("en")) return Number.NEGATIVE_INFINITY;

  const name = voice.name.toLowerCase();
  let score = voice.lang.toLowerCase() === "en-us" ? 30 : 20;

  // These labels are supplied by the OS/browser and are the strongest signal
  // that a voice uses a newer, less robotic synthesis model.
  if (name.includes("natural")) score += 200;
  if (name.includes("neural")) score += 190;
  if (name.includes("premium")) score += 170;
  if (name.includes("enhanced")) score += 160;
  if (name.includes("online")) score += 60;
  if (!voice.localService) score += 40;

  const friendlyIndex = FRIENDLY_VOICE_NAMES.findIndex((candidate) => name.includes(candidate));
  if (friendlyIndex >= 0) score += 35 - friendlyIndex;

  // Older Windows desktop voices are clear but noticeably more mechanical.
  if (["david", "zira", "mark", "hazel"].some((candidate) => name.includes(candidate))) {
    score -= 60;
  }

  if (voice.default) score += 5;
  return score;
}

function pickBestVoice(): SpeechSynthesisVoice | null {
  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) return null;

  return voices
    .map((voice) => ({ voice, score: scoreVoice(voice) }))
    .filter(({ score }) => Number.isFinite(score))
    .sort((a, b) => b.score - a.score)[0]?.voice ?? null;
}

function prepareTextForSpeech(text: string): string {
  return text
    .replace(/\s+/g, " ")
    .replace(/(^|[.!?]\s+)([A-D]):\s*/g, "$1Option $2. ")
    .replace(/\s*[—–]\s*/g, ", ")
    .trim();
}

export function useTTS() {
  const isSupported = typeof window !== "undefined" && "speechSynthesis" in window;

  const [isSpeaking, setIsSpeaking] = useState(false);
  const [autoRead, setAutoRead] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const voiceRef = useRef<SpeechSynthesisVoice | null>(null);

  // Voices load asynchronously — resolve once available
  useEffect(() => {
    if (!isSupported) return;
    const resolve = () => { voiceRef.current = pickBestVoice(); };
    resolve();
    window.speechSynthesis.addEventListener("voiceschanged", resolve);
    return () => window.speechSynthesis.removeEventListener("voiceschanged", resolve);
  }, [isSupported]);

  const stop = useCallback(() => {
    if (!isSupported) return;
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }, [isSupported]);

  const speak = useCallback(
    (text: string) => {
      if (!isSupported) return;
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(prepareTextForSpeech(text));

      // Refresh at click time as some browsers populate voices after the
      // initial voiceschanged event. Otherwise the browser picks its default.
      const voice = pickBestVoice() ?? voiceRef.current;
      if (voice) {
        voiceRef.current = voice;
        utterance.voice = voice;
        utterance.lang = voice.lang;
      }

      utterance.rate = 0.96;  // conversational while remaining clear for kids
      utterance.pitch = 1.0;  // neutral pitch sounds more natural on neural voices
      utterance.volume = 1;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => {
        if (utteranceRef.current === utterance) setIsSpeaking(false);
      };
      utterance.onerror = () => {
        if (utteranceRef.current === utterance) setIsSpeaking(false);
      };
      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    },
    [isSupported],
  );

  // Cancel speech when the component unmounts
  useEffect(() => {
    return () => {
      if (isSupported) window.speechSynthesis.cancel();
    };
  }, [isSupported]);

  const toggleAutoRead = useCallback(() => {
    setAutoRead((prev) => {
      if (prev) {
        if (isSupported) window.speechSynthesis.cancel();
        setIsSpeaking(false);
      }
      return !prev;
    });
  }, [isSupported]);

  return { speak, stop, isSupported, isSpeaking, autoRead, toggleAutoRead };
}
