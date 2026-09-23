"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { useLang } from "@/app/providers";
import { PERSONAL_INFO } from "@/constants/portfolioData";
import Button from "../atoms/Button";
import CreativeProfileModal from "./CreativeProfileModal";

// Carga dinámica del canvas interactivo
const HeroCanvas = dynamic(() => import("../hero/HeroCanvas"), { ssr: false });

export interface ProfileSectionProps {
  className?: string;
}

/**
 * ProfileSection - Organismo para la sección superior de Perfil.
 */
export default function ProfileSection({ className = "" }: ProfileSectionProps) {
  const { lang, t } = useLang();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section id="profile" className={`relative w-full border-b border-[var(--color-line)]/60 ${className}`}>
      {/* Contenedor Full-Width y Full-Height sin borde exterior */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-screen">
        {/* Columna Izquierda: Información Textual y Botones con padding interno amplio */}
        <div className="lg:col-span-6 xl:col-span-5 flex flex-col justify-center px-6 py-10 sm:px-10 sm:py-14 xl:px-16 xl:py-20 z-10">

          <h1 className="font-mono text-3xl sm:text-4xl xl:text-5xl font-extrabold text-[var(--color-text)] tracking-tight mb-3">
            {PERSONAL_INFO.name}
          </h1>

          <h2 className="font-sans text-sm sm:text-base xl:text-lg font-semibold text-[var(--color-text-muted)] mb-5">
            {t("profile.title")}
          </h2>

          <p className="text-xs sm:text-sm text-[var(--color-text-muted)] font-sans leading-relaxed mb-8 max-w-xl">
            {t("profile.short_bio")}
          </p>

          {/* Botones de Acción */}
          <div className="flex flex-wrap items-center gap-3.5 pt-2">
            <Button
              variant="primary"
              size="md"
              onClick={() => setIsModalOpen(true)}
              iconPosition="right"
              icon={
                <svg
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              }
            >
              {t("profile.cta_modal")}
            </Button>

            <Button
              variant="outline"
              size="md"
              href="#portfolio"
              onClick={() => {
                const el = document.getElementById("portfolio");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
            >
              {t("section.projects.title")}
            </Button>
          </div>
        </div>

        {/* Columna Derecha: Hero animado ocupando todo el espacio disponible sin márgenes */}
        <div className="lg:col-span-6 xl:col-span-7 relative min-h-[380px] sm:min-h-[460px] lg:min-h-full border-t lg:border-t-0 lg:border-l border-[var(--color-line)]/60 overflow-hidden bg-white dark:bg-black/20">
          <HeroCanvas
            className="absolute inset-0 h-full w-full rounded-none"
            showThoughtBubble={false}
          />
        </div>
      </div>

      {/* Modal Diálogo Creativo */}
      <CreativeProfileModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}
