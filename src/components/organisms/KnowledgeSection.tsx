"use client";

import { useLang } from "@/app/providers";
import { KNOWLEDGE_ITEMS } from "@/constants/portfolioData";
import SectionHeading from "../atoms/SectionHeading";
import KnowledgeCard from "../molecules/KnowledgeCard";

export interface KnowledgeSectionProps {
  className?: string;
}

/**
 * Renderiza el ícono SVG correspondiente a la clave de conocimiento.
 */
function getKnowledgeIcon(icon: string) {
  switch (icon) {
    case "server":
      return (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
          <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
          <line x1="6" y1="6" x2="6.01" y2="6" strokeWidth={2.5} />
          <line x1="6" y1="18" x2="6.01" y2="18" strokeWidth={2.5} />
        </svg>
      );
    case "layout":
      return (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M3 9h18M9 21V9" />
        </svg>
      );
    case "shield-check":
      return (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      );
    case "database":
      return (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
        </svg>
      );
    case "cloud":
      return (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 00-9.78 2.096A4.001 4.001 0 003 15z" />
        </svg>
      );
    case "smartphone":
      return (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
          <line x1="12" y1="18" x2="12.01" y2="18" strokeWidth={2.5} />
        </svg>
      );
    default:
      return (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <circle cx="12" cy="12" r="10" />
        </svg>
      );
  }
}

/**
 * KnowledgeSection - Organismo para la sección central de Conocimientos.
 */
export default function KnowledgeSection({ className = "" }: KnowledgeSectionProps) {
  const { t } = useLang();

  return (
    <section id="knowledge" className={`relative w-full px-4 sm:px-8 xl:px-12 py-8 sm:py-12 ${className}`}>
      <SectionHeading
        label={t("knowledge.heading")}
      />

      {/* Grid de Cards de Conocimientos respetando el diseño de Figma */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {KNOWLEDGE_ITEMS.map((item) => (
          <KnowledgeCard
            key={item.id}
            title={t(item.titleKey)}
            description={t(item.descKey)}
            icon={getKnowledgeIcon(item.icon)}
            tags={item.tags}
          />
        ))}
      </div>
    </section>
  );
}
