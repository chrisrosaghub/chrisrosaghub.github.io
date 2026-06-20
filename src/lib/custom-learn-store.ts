/**
 * In-memory store for the Custom Learning module.
 * NOTE(ai): Ephemeral — all data is lost on page refresh (per Agents.md).
 */

import { memory } from "@/lib/memory-store";
import type { GeneratedLearningPath } from "@/lib/custom-learn-ai";

const KEY_PATHS = "custom-learn:paths";
const KEY_CONFIG = "custom-learn:config";
const MAX_SAVED_PATHS = 10;

export interface CustomLearnConfig {
  apiKey: string;
  baseUrl: string;
  model: string;
}

export function getStoredPaths(): GeneratedLearningPath[] {
  return memory.ensure<GeneratedLearningPath[]>(KEY_PATHS, () => []);
}

export function addPath(path: GeneratedLearningPath): void {
  const paths = getStoredPaths();
  paths.unshift(path);
  if (paths.length > MAX_SAVED_PATHS) paths.splice(MAX_SAVED_PATHS);
  memory.put(KEY_PATHS, paths);
}

export function removePath(id: string): void {
  const paths = getStoredPaths();
  const idx = paths.findIndex((p) => p.id === id);
  if (idx !== -1) paths.splice(idx, 1);
  memory.put(KEY_PATHS, paths);
}

export function getConfig(): CustomLearnConfig {
  return memory.ensure<CustomLearnConfig>(KEY_CONFIG, () => ({
    apiKey: (import.meta.env.VITE_OPENAI_API_KEY as string) ?? "",
    baseUrl: "https://api.openai.com",
    model: "gpt-4o-mini",
  }));
}

export function saveConfig(config: CustomLearnConfig): void {
  memory.put(KEY_CONFIG, config);
}
