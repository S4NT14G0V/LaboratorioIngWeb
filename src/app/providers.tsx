"use client";

import { translations, type Lang } from "@/constants/translations";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useSyncExternalStore,
  type ReactNode,
} from "react";

type Theme = "light" | "dark";

const THEME_KEY = "theme";
const LANG_KEY = "lang";

const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function emitChange() {
  for (const listener of listeners) listener();
}

function readStored(key: string): string | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function readTheme(): Theme {
  const stored = readStored(THEME_KEY);
  return stored === "dark" || stored === "light" ? stored : "dark";
}

function readLang(): Lang {
  const stored = readStored(LANG_KEY);
  return stored === "en" || stored === "es" ? stored : "en";
}

function readTranslation(path: string, lang: Lang): string {
  let value: unknown = translations;

  for (const segment of path.split(".")) {
    if (typeof value !== "object" || value === null || !(segment in value)) return path;
    value = (value as Record<string, unknown>)[segment];
  }

  if (typeof value === "object" && value !== null && lang in value) {
    return (value as Record<Lang, string>)[lang];
  }

  return path;
}

const ThemeContext = createContext<{
  theme: Theme;
  toggle: () => void;
}>({ theme: "dark", toggle: () => {} });

export function useTheme() {
  return useContext(ThemeContext);
}

function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useSyncExternalStore<Theme>(subscribe, readTheme, () => "dark");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggle = useCallback(() => {
    const next = theme === "light" ? "dark" : "light";
    try {
      window.localStorage.setItem(THEME_KEY, next);
    } catch {
      // ignore storage errors
    }
    document.documentElement.classList.toggle("dark", next === "dark");
    emitChange();
  }, [theme]);

  return (
    <ThemeContext value={{ theme, toggle }}>{children}</ThemeContext>
  );
}

const LangContext = createContext<{
  lang: Lang;
  toggle: () => void;
  t: (key: string) => string;
}>({ lang: "en", toggle: () => {}, t: (k) => k });

export function useLang() {
  return useContext(LangContext);
}

function LanguageProvider({ children }: { children: ReactNode }) {
  const lang = useSyncExternalStore<Lang>(subscribe, readLang, () => "en");

  const toggle = useCallback(() => {
    const next = lang === "en" ? "es" : "en";
    try {
      window.localStorage.setItem(LANG_KEY, next);
    } catch {
      // ignore storage errors
    }
    emitChange();
  }, [lang]);

  const t = (path: string) => readTranslation(path, lang);

  return (
    <LangContext value={{ lang, toggle, t }}>{children}</LangContext>
  );
}

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <LanguageProvider>{children}</LanguageProvider>
    </ThemeProvider>
  );
}
