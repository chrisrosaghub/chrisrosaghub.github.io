/**
 * useTTS — thin wrapper around the Web Speech API (SpeechSynthesis).
 * Automatically selects the highest-quality available voice (neural/enhanced).
 * All state is local to the component; no persistence.
 */
import { useCallback, useEffect, useRef, useState } from "react";

// Ordered list of preferred voice names — first match wins.
// Covers Edge Neural, Chrome, macOS/iOS enhanced voices.
const PREFERRED_VOICE_NAMES = [
  // Microsoft Edge neural voices (Windows — highest quality)
  "Microsoft Aria Online (Natural) - English (United States)",
  "Microsoft Jenny Online (Natural) - English (United States)",
  "Microsoft Guy Online (Natural) - English (United States)",
  "Microsoft Aria - English (United States)",
  "Microsoft Jenny - English (United States)",
  // Chrome TTS engine
  "Google US English",
  "Google UK English Female",
  // macOS / iOS enhanced voices
  "Samantha (Enhanced)",
  "Samantha",
  "Alex",
  "Karen (Enhanced)",
];

function pickBestVoice(): SpeechSynthesisVoice | null {
  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) return null;

  // 1. Exact match from preferred list
  for (const name of PREFERRED_VOICE_NAMES) {
    const v = voices.find((v) => v.name === name);
    if (v) return v;
  }

  // 2. Any voice with quality keywords in English
  const qualityKeywords = ["natural", "neural", "enhanced", "online", "premium"];
  const english = voices.filter((v) => v.lang.startsWith("en"));
  for (const kw of qualityKeywords) {
    const v = english.find((v) => v.name.toLowerCase().includes(kw));
    if (v) return v;
  }

  // 3. Any English voice
  const enUS = english.find((v) => v.lang === "en-US");
  if (enUS) return enUS;
  if (english.length) return english[0];

  return null;
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
      const utterance = new SpeechSynthesisUtterance(text);

      // Apply best voice if available; otherwise browser picks default
      if (voiceRef.current) {
        utterance.voice = voiceRef.current;
        utterance.lang = voiceRef.current.lang;
      }

      utterance.rate = 0.9;   // slightly slower — easier for kids
      utterance.pitch = 1.0;  // neutral pitch sounds more natural on neural voices
      utterance.volume = 1;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
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
