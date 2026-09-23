"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useLang, useTheme } from "@/app/providers";
import { PERSONAL_INFO } from "@/constants/portfolioData";
import { SunIcon, MoonIcon } from "../atoms/Icons";
import LeftSidebar from "./LeftSidebar";

export interface MobileHeaderProps {
  className?: string;
}

/**
 * MobileHeader - Organismo para la barra superior móvil y cajón lateral desplegable (Drawer).
 * Permite acceder al menú izquierdo completo en smartphones y tablets sin perder ergonomía.
 */
export default function MobileHeader({ className = "" }: MobileHeaderProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { theme, toggle: toggleTheme } = useTheme();
  const { lang, toggle: toggleLang } = useLang();

  // Bloquear scroll al abrir el drawer móvil
  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  return (
    <>
      <header
        className={`sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-[var(--color-line)] bg-[var(--color-bg)]/90 backdrop-blur-md px-4 lg:hidden ${className}`}
      >
        {/* Identidad en móvil */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            aria-label="Abrir menú lateral de información"
            className="p-2 rounded-lg border border-[var(--color-line)] text-[var(--color-text)] hover:bg-[var(--color-stripe)] transition-colors cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <div className="flex items-center gap-2">
            <div className="relative h-8 w-8 rounded-full border border-[var(--color-line)] bg-white overflow-hidden shrink-0">
              <Image
                src={PERSONAL_INFO.avatar}
                alt={PERSONAL_INFO.shortName}
                fill
                sizes="32px"
                className="object-cover object-center"
              />
            </div>
            <span className="font-mono text-xs font-bold text-[var(--color-text)] truncate">
              {PERSONAL_INFO.shortName}
            </span>
          </div>
        </div>

        {/* Controles de tema e idioma */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            aria-label="Cambiar tema"
            className="p-2 rounded-lg border border-[var(--color-line)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-stripe)] transition-colors"
          >
            {theme === "light" ? <MoonIcon className="w-4 h-4" /> : <SunIcon className="w-4 h-4" />}
          </button>

          <button
            onClick={toggleLang}
            aria-label="Cambiar idioma"
            className="px-2.5 py-1.5 rounded-lg border border-[var(--color-line)] font-mono text-xs font-bold text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-stripe)] transition-colors uppercase"
          >
            {lang === "en" ? "ES" : "EN"}
          </button>
        </div>
      </header>

      {/* Drawer Móvil para LeftSidebar */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={() => setDrawerOpen(false)}
            aria-hidden="true"
          />

          {/* Panel Lateral Drawer */}
          <div className="relative h-full w-[85%] max-w-sm bg-[var(--color-bg)] shadow-2xl animate-in slide-in-from-left duration-200">
            <LeftSidebar onCloseMobile={() => setDrawerOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}
