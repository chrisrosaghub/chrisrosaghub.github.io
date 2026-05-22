/**
 * useTTS — thin wrapper around the Web Speech API (SpeechSynthesis).
 * All state is local to the component; no persistence.
 */
import { useCallback, useEffect, useRef, useState } from "react";

export function useTTS() {
  const isSupported = typeof window !== "undefined" && "speechSynthesis" in window;

  const [isSpeaking, setIsSpeaking] = useState(false);
  const [autoRead, setAutoRead] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const stop = useCallback(() => {
    if (!isSupported) return;
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }, [isSupported]);

  const speak = useCallback(
    (text: string) => {
      if (!isSupported) return;
      // Cancel any ongoing speech first
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.88;   // slightly slower — easier for kids
      utterance.pitch = 1.05;
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
        // Turning off — stop any ongoing speech
        if (isSupported) window.speechSynthesis.cancel();
        setIsSpeaking(false);
      }
      return !prev;
    });
  }, [isSupported]);

  return { speak, stop, isSupported, isSpeaking, autoRead, toggleAutoRead };
}
