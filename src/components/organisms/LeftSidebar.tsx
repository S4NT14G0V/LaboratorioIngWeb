"use client";

import Image from "next/image";
import { useLang } from "@/app/providers";
import {
  PERSONAL_INFO,
  LANGUAGES,
  PROGRAMMING_LANGUAGES,
  EXTRA_SKILLS,
} from "@/constants/portfolioData";
import { SITE_URLS } from "@/constants/site";
import SkillBar from "../molecules/SkillBar";
import ContactItem from "../molecules/ContactItem";
import Badge from "../atoms/Badge";
import Button from "../atoms/Button";
import { MailIcon, FileIcon } from "../atoms/Icons";

export interface LeftSidebarProps {
  className?: string;
  onCloseMobile?: () => void;
}

/**
 * LeftSidebar - Organismo que representa el Menú Izquierdo Fijo según el diseño de Figma.
 */
export default function LeftSidebar({
  className = "",
  onCloseMobile,
}: LeftSidebarProps) {
  const { t } = useLang();

  return (
    <aside
      className={`flex flex-col h-full bg-[var(--color-bg)] border-r border-[var(--color-line)] p-5 overflow-y-auto custom-scrollbar select-none ${className}`}
    >
      {/* Botón de cierre en vista móvil */}
      {onCloseMobile && (
        <div className="flex justify-end lg:hidden mb-2">
          <button
            onClick={onCloseMobile}
            className="p-1.5 rounded-md text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-stripe)]"
            aria-label="Cerrar menú lateral"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      {/* 1. Información Personal */}
      <section className="flex flex-col items-center text-center pb-6 border-b border-[var(--color-line)]/70">
        <div className="relative h-28 w-28 rounded-full border-2 border-[var(--color-line)] bg-white overflow-hidden shadow-md mb-3.5 group">
          <Image
            src={PERSONAL_INFO.avatar}
            alt={PERSONAL_INFO.name}
            fill
            sizes="112px"
            className="object-cover object-center scale-105 transition-transform duration-300 group-hover:scale-110"
            priority
          />
          <div className="absolute inset-0 rounded-full ring-1 ring-black/5" />
        </div>

        <h1 className="font-mono text-base font-bold text-[var(--color-text)] tracking-tight">
          {PERSONAL_INFO.name}
        </h1>

        <p className="mt-1 text-xs text-[var(--color-text-muted)] font-sans max-w-[220px]">
          {t(PERSONAL_INFO.titleKey)}
        </p>

        <div className="mt-2.5">
          <Badge size="xs" variant="glow">
            {t("sidebar.status_val")}
          </Badge>
        </div>
      </section>

      {/* 2. Datos de Contacto */}
      <section className="py-5 border-b border-[var(--color-line)]/70">
        <h2 className="font-mono text-[11px] font-bold uppercase tracking-wider text-[var(--color-text-muted)] mb-3">
          {t("sidebar.contact")}
        </h2>

        <div className="space-y-1">
          <ContactItem
            label={t("sidebar.residence")}
            value={`${PERSONAL_INFO.contact.city}, ${PERSONAL_INFO.contact.country}`}
            icon={
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            }
          />

          <ContactItem
            label={t("sidebar.phone")}
            value={PERSONAL_INFO.contact.phone}
            href={`tel:${PERSONAL_INFO.contact.phone.replace(/[^0-9+]/g, "")}`}
            icon={
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            }
          />

          <ContactItem
            label={t("sidebar.email")}
            value={PERSONAL_INFO.contact.email}
            href={SITE_URLS.email}
            icon={<MailIcon className="h-3.5 w-3.5" />}
          />
        </div>
      </section>

      {/* 3. Idiomas */}
      <section className="py-5 border-b border-[var(--color-line)]/70">
        <h2 className="font-mono text-[11px] font-bold uppercase tracking-wider text-[var(--color-text-muted)] mb-3">
          {t("sidebar.languages")}
        </h2>

        <div className="space-y-3">
          {LANGUAGES.map((langItem) => (
            <SkillBar
              key={langItem.nameKey}
              name={t(langItem.nameKey)}
              percentage={langItem.percentage}
              level={t(langItem.levelKey)}
              size="sm"
            />
          ))}
        </div>
      </section>

      {/* 4. Lenguajes de Programación */}
      <section className="py-5 border-b border-[var(--color-line)]/70">
        <h2 className="font-mono text-[11px] font-bold uppercase tracking-wider text-[var(--color-text-muted)] mb-3">
          {t("sidebar.programming")}
        </h2>

        <div className="space-y-3">
          {PROGRAMMING_LANGUAGES.map((skill) => (
            <SkillBar
              key={skill.name}
              name={skill.name}
              percentage={skill.percentage}
              size="sm"
            />
          ))}
        </div>
      </section>

      {/* 5. Habilidades Extra */}
      <section className="py-5 border-b border-[var(--color-line)]/70">
        <h2 className="font-mono text-[11px] font-bold uppercase tracking-wider text-[var(--color-text-muted)] mb-3">
          {t("sidebar.extra_skills")}
        </h2>

        <div className="flex flex-wrap gap-1.5">
          {EXTRA_SKILLS.map((skillKey) => (
            <Badge key={skillKey} size="xs" variant="outline">
              ✓ {t(skillKey)}
            </Badge>
          ))}
        </div>
      </section>

      {/* 6. Botón Descargar CV */}
      <div className="pt-5 pb-2 mt-auto">
        <Button
          variant="primary"
          size="sm"
          href={PERSONAL_INFO.cvUrl}
          download="CV_Santiago_Trespalacios.pdf"
          className="w-full shadow-sm"
          icon={<FileIcon className="h-4 w-4" />}
        >
          {t("sidebar.download_cv")}
        </Button>
      </div>
    </aside>
  );
}
