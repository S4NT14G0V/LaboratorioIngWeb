"use client";

import { useLang } from "@/app/providers";

export interface ExperienceItem {
  titleKey: string;
  companyKey: string;
  yearsKey: string;
  pointKeys: string[];
  startYear: number;
}

export interface ExperienceCardProps {
  item: ExperienceItem;
  className?: string;
}

/**
 * ExperienceCard - Molécula para representar un bloque de experiencia profesional individual.
 * Incluye año en tipografía display grande, badge de compañía, rol y viñetas descriptivas con hover invertido.
 *
 * @param props - Datos de la experiencia profesional y estilos opcionales
 */
export default function ExperienceCard({ item, className = "" }: ExperienceCardProps) {
  const { t } = useLang();

  return (
    <article
      className={`group relative transition-colors duration-300 hover:bg-[var(--color-text)] overflow-hidden ${className}`}
    >
      <div className="px-5 py-7">
        {/* Año destacado en display */}
        <span className="block font-mono text-3xl md:text-5xl font-bold leading-none text-[var(--color-line-strong)]/25 group-hover:text-[var(--color-bg)]/20 select-none mb-4 md:mb-0 md:absolute md:mt-0.5">
          {item.startYear}
        </span>

        {/* Contenido descriptivo alineado */}
        <div className="md:ml-32">
          <span className="font-mono text-xs whitespace-nowrap text-[var(--color-text-muted)] group-hover:text-[var(--color-bg)]/70">
            {t(item.yearsKey)}
          </span>

          <div className="mt-0.5 mb-4 flex flex-wrap items-center gap-2 w-full justify-between">
            <h3 className="text-base font-medium text-[var(--color-text)] group-hover:text-[var(--color-bg)]">
              {t(item.titleKey)}
            </h3>
            <span className="inline-flex items-center rounded-full border border-[var(--color-line)] px-3 py-1 text-xs font-semibold text-[var(--color-text-muted)] group-hover:text-[var(--color-bg)]/70">
              {t(item.companyKey)}
            </span>
          </div>

          <ul className="mt-2 space-y-2">
            {item.pointKeys.map((key) => (
              <li key={key} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-line-strong)] group-hover:bg-[var(--color-bg)]/40" />
                <span className="text-sm leading-relaxed text-[var(--color-text-muted)] group-hover:text-[var(--color-bg)]/60">
                  {t(key)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}
