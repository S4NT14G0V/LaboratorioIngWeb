"use client";

import React from "react";
import { useLang } from "@/app/providers";
import { SITE_URLS } from "@/constants/site";
import { GitHubIcon, LinkedInIcon, MailIcon } from "../atoms/Icons";

export interface FooterProps {
  className?: string;
}

/**
 * Footer - Organismo para el pie de página principal.
 * Mantiene la tipografía estética monumental "SANTIAGO", enlaces directos y créditos de autor.
 *
 * @param props - Propiedades opcionales de clase CSS
 */
export default function Footer({ className = "" }: FooterProps) {
  const { t } = useLang();

  const textStyle: React.CSSProperties = {
    fontFamily: "var(--font-iceland)",
    fontSize: "clamp(3.5rem, 12vw, 10rem)",
    fontWeight: 900,
    lineHeight: 0.7,
    backgroundImage: `
      linear-gradient(
        to top,
        var(--color-text) 0%,
        var(--color-text) 35%,
        color-mix(in srgb, var(--color-text) 65%, transparent) 45%,
        color-mix(in srgb, var(--color-text) 15%, transparent) 65%,
        transparent 80%
      )
    `,
    opacity: 0.18,
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    color: "transparent",
  };

  return (
    <footer
      className={`relative w-full px-4 sm:px-8 xl:px-12 pt-16 pb-8 border-t border-[var(--color-line)]/60 mt-12 overflow-hidden select-none ${className}`}
    >
      <div className="flex flex-col items-center justify-center text-center relative z-10">
        {/* Tipografía Monumental "SANTIAGO" */}
        <span
          className="pointer-events-none select-none whitespace-nowrap mb-4"
          style={textStyle}
          aria-hidden="true"
        >
          SANTIAGO
        </span>

        {/* Enlaces en móvil (visibles en pantallas pequeñas donde no se ve la barra lateral derecha) */}
        <div className="flex items-center gap-4 lg:hidden mb-4">
          <a
            href={SITE_URLS.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg border border-[var(--color-line)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
            aria-label="Perfil de GitHub"
          >
            <GitHubIcon className="h-4 w-4" />
          </a>
          <a
            href={SITE_URLS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg border border-[var(--color-line)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
            aria-label="Perfil de LinkedIn"
          >
            <LinkedInIcon className="h-4 w-4" />
          </a>
          <a
            href={SITE_URLS.email}
            className="p-2 rounded-lg border border-[var(--color-line)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
            aria-label="Enviar Correo Electrónico"
          >
            <MailIcon className="h-4 w-4" />
          </a>
        </div>

        {/* Información de Copyright y Curso */}
        <p className="font-mono text-xs font-semibold text-[var(--color-text)]">
          {t("footer.copy")}
        </p>
        <p className="mt-1 font-mono text-[11px] text-[var(--color-text-muted)]">
          Universidad de Antioquia · {t("footer.rights")}
        </p>
      </div>
    </footer>
  );
}
