"use client";

import { useLang } from "@/app/providers";
import SectionHeading from "../atoms/SectionHeading";
import ExperienceCard, { ExperienceItem } from "../molecules/ExperienceCard";

/**
 * Listado de registros de experiencia profesional.
 */
const EXPERIENCE_ITEMS: ExperienceItem[] = [
  {
    titleKey: "section.exp.value.first.title",
    companyKey: "section.exp.value.first.company",
    yearsKey: "section.exp.value.first.years",
    pointKeys: [
      "section.exp.value.first.points.p1",
      "section.exp.value.first.points.p2",
      "section.exp.value.first.points.p3",
      "section.exp.value.first.points.p4",
    ],
    startYear: 2025,
  },
];

export interface ExperienceSectionProps {
  className?: string;
}

/**
 * ExperienceSection - Organismo para la sección de Experiencia Profesional.
 * Presenta la trayectoria laboral mediante tarjetas individuales `ExperienceCard`
 * organizadas en un listado con divisores estéticos y encabezado unificado.
 *
 * @param props - Propiedades de estilo opcionales
 */
export default function ExperienceSection({ className = "" }: ExperienceSectionProps) {
  const { t } = useLang();

  return (
    <section
      id="experience"
      className={`w-full px-4 sm:px-8 xl:px-12 py-8 ${className}`}
      aria-label={t("section.exp.label")}
    >
      <SectionHeading label={t("section.exp.label")} />

      <div className="divide-y divide-[var(--color-line)] border-t border-[var(--color-line)]">
        {EXPERIENCE_ITEMS.map((entry) => (
          <ExperienceCard key={entry.titleKey} item={entry} />
        ))}
      </div>
    </section>
  );
}
