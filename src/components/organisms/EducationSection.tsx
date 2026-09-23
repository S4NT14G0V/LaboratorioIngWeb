"use client";

import { useLang } from "@/app/providers";
import SectionHeading from "../atoms/SectionHeading";

export interface EducationSectionProps {
  className?: string;
}

/**
 * EducationSection - Organismo para la sección de Educación.
 */
export default function EducationSection({ className = "" }: EducationSectionProps) {
  const { t } = useLang();

  const highlights = [
    t("education.udea.h1"),
    t("education.udea.h2"),
    t("education.udea.h3"),
  ];

  return (
    <section id="education" className={`relative w-full px-4 sm:px-8 xl:px-12 py-8 sm:py-12 ${className}`}>
      <SectionHeading
        label={t("education.heading")}
      />

      <div className="border-t border-[var(--color-line)] divide-y divide-[var(--color-line)]">
        <div className="group relative transition-colors duration-300 hover:bg-[var(--color-text)] overflow-hidden">
          <div className="px-5 py-7">
            {/* Año en display grande en el lateral */}
            <span className="block font-mono text-3xl md:text-5xl font-bold leading-none text-[var(--color-line-strong)]/25 group-hover:text-[var(--color-bg)]/20 select-none mb-4 md:mb-0 md:absolute md:mt-0.5">
              2020
            </span>

            <div className="md:ml-32">
              {/* Fechas / Semestre */}
              <span className="font-mono text-xs whitespace-nowrap text-[var(--color-text-muted)] group-hover:text-[var(--color-bg)]/70">
                {t("education.udea.dates")} · {t("education.udea.status")}
              </span>

              {/* Título y Badge de Institución */}
              <div className="mt-1 mb-4 flex flex-wrap items-center gap-2 w-full justify-between">
                <h3 className="text-base md:text-lg font-medium text-[var(--color-text)] group-hover:text-[var(--color-bg)]">
                  {t("education.udea.degree")}
                </h3>
                <span className="inline-flex items-center rounded-full border border-[var(--color-line)] px-3 py-1 text-xs font-semibold text-[var(--color-text-muted)] group-hover:text-[var(--color-bg)]/70">
                  {t("education.udea.institution")}
                </span>
              </div>

              {/* Descripción breve de lo estudiado */}
              <p className="text-sm leading-relaxed text-[var(--color-text-muted)] group-hover:text-[var(--color-bg)]/80 mb-4 font-sans">
                {t("education.udea.desc")}
              </p>

              {/* Viñetas de competencias */}
              <ul className="space-y-2">
                {highlights.map((item, index) => (
                  <li key={index} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-line-strong)] group-hover:bg-[var(--color-bg)]/40" />
                    <span className="text-xs sm:text-sm leading-relaxed text-[var(--color-text-muted)] group-hover:text-[var(--color-bg)]/70">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
