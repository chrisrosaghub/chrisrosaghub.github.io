import { useEffect, useRef } from "react";

/**
 * Keeps newly revealed actions visible without forcing the page to jump when
 * the target is already inside the viewport.
 */
interface AutoScrollOptions {
  enabled?: boolean;
  block?: ScrollLogicalPosition;
}

export function useAutoScrollIntoView<T extends HTMLElement>(
  trigger: unknown,
  options: AutoScrollOptions = {},
) {
  const targetRef = useRef<T>(null);
  const enabled = options.enabled ?? Boolean(trigger);
  const block = options.block ?? "nearest";

  useEffect(() => {
    if (!enabled) return;

    const frame = window.requestAnimationFrame(() => {
      const target = targetRef.current;
      if (!target) return;

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      target.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block,
        inline: "nearest",
      });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [block, enabled, trigger]);

  return targetRef;
}
