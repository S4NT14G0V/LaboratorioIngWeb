"use client";

import React from "react";
import { useLang, useTheme } from "@/app/providers";
import { SITE_URLS } from "@/constants/site";
import { PERSONAL_INFO } from "@/constants/portfolioData";
import SocialIconButton from "../atoms/SocialIconButton";
import {
  GitHubIcon,
  LinkedInIcon,
  MailIcon,
  SunIcon,
  MoonIcon,
  FileIcon,
} from "../atoms/Icons";

export interface RightSidebarProps {
  className?: string;
}

/**
 * RightSidebar - Organismo que representa el Menú Derecho Fijo según el diseño de Figma.
 */
export default function RightSidebar({ className = "" }: RightSidebarProps) {
  const { theme, toggle: toggleTheme } = useTheme();
  const { lang, toggle: toggleLang, t } = useLang();

  return (
    <aside
      className={`flex flex-col items-center justify-between h-full bg-[var(--color-bg)] border-l border-[var(--color-line)] py-6 px-2 select-none ${className}`}
    >
      {/* Controles superiores: Tema e Idioma */}
      <div className="flex flex-col items-center gap-3">
        {/* Toggle de Tema */}
        <button
          onClick={toggleTheme}
          aria-label="Cambiar tema claro/oscuro"
          className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--color-line)] bg-[var(--color-bg)] text-[var(--color-text-muted)] hover:border-[var(--color-text)] hover:text-[var(--color-text)] hover:bg-[var(--color-stripe)] transition-all duration-200 active:scale-95 cursor-pointer"
        >
          {theme === "light" ? (
            <MoonIcon className="h-4 w-4" />
          ) : (
            <SunIcon className="h-4 w-4" />
          )}
        </button>

        {/* Toggle de Idioma */}
        <button
          onClick={toggleLang}
          aria-label="Cambiar idioma español/inglés"
          className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--color-line)] bg-[var(--color-bg)] font-mono text-xs font-bold text-[var(--color-text-muted)] hover:border-[var(--color-text)] hover:text-[var(--color-text)] hover:bg-[var(--color-stripe)] transition-all duration-200 active:scale-95 uppercase cursor-pointer"
        >
          {lang === "en" ? "ES" : "EN"}
        </button>
      </div>

      {/* Redes Sociales fijas y Descarga de CV */}
      <div className="flex flex-col items-center gap-3">
        <SocialIconButton
          href={PERSONAL_INFO.cvUrl}
          icon={<FileIcon />}
          label={t("sidebar.download_cv")}
          download="CV_Santiago_Trespalacios.pdf"
          tooltipPosition="left"
        />

        <SocialIconButton
          href={SITE_URLS.github}
          icon={<GitHubIcon />}
          label={t("sidebar.github_profile")}
          tooltipPosition="left"
        />

        <SocialIconButton
          href={SITE_URLS.linkedin}
          icon={<LinkedInIcon />}
          label={t("sidebar.linkedin_profile")}
          tooltipPosition="left"
        />

        <SocialIconButton
          href={SITE_URLS.email}
          icon={<MailIcon />}
          label={t("sidebar.send_email")}
          tooltipPosition="left"
        />
      </div>
    </aside>
  );
}
