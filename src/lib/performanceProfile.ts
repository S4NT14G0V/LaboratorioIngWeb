export type PerformanceProfile = "low" | "medium" | "high";

export interface PerformanceConfig {
  profile: PerformanceProfile;
  /** Simulation grid resolution (displacement texture width/height). */
  grid: number;
  /** Renderer pixel ratio cap. */
  pixelRatio: number;
  /** Enable the expensive CSS layers (noise / halftone / particles). */
  enableHeavyLayers: boolean;
  /** prefers-reduced-motion — disables the liquid simulation entirely. */
  reducedMotion: boolean;
}

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function readReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.matchMedia(REDUCED_MOTION_QUERY).matches;
  } catch {
    return false;
  }
}

function readCores(): number {
  if (typeof navigator === "undefined") return 4;
  return navigator.hardwareConcurrency || 4;
}

function readMemoryGb(): number {
  const nav = navigator as Navigator & { deviceMemory?: number };
  return nav.deviceMemory || 4;
}

function readIsTouch(): boolean {
  if (typeof navigator === "undefined") return false;
  return navigator.maxTouchPoints > 0 || "ontouchstart" in window;
}

const PROFILE_BY_TIER: Record<PerformanceProfile, PerformanceConfig> = {
  low: { profile: "low", grid: 48, pixelRatio: 1, enableHeavyLayers: false, reducedMotion: false },
  medium: { profile: "medium", grid: 64, pixelRatio: 1.5, enableHeavyLayers: false, reducedMotion: false },
  high: { profile: "high", grid: 80, pixelRatio: 2, enableHeavyLayers: true, reducedMotion: false },
};

export function detectPerformanceProfile(): PerformanceConfig {
  const reducedMotion = readReducedMotion();
  if (reducedMotion) {
    return { ...PROFILE_BY_TIER.low, reducedMotion: true };
  }

  const cores = readCores();
  const memoryGb = readMemoryGb();
  const touch = readIsTouch();

  let profile: PerformanceProfile;
  if (cores <= 2 || memoryGb <= 2) {
    profile = "low";
  } else if (cores <= 4 || memoryGb <= 4 || touch) {
    profile = "medium";
  } else {
    profile = "high";
  }

  return { ...PROFILE_BY_TIER[profile] };
}
