"use client";

import React from "react";
import { useLang } from "@/app/providers";
import { ProjectItem } from "@/constants/portfolioData";
import ModalDialog from "../molecules/ModalDialog";
import Badge from "../atoms/Badge";
import Button from "../atoms/Button";
import { GitHubIcon } from "../atoms/Icons";

export interface ProjectDetailModalProps {
  project: ProjectItem | null;
  isOpen: boolean;
  onClose: () => void;
}

/**
 * ProjectDetailModal - Organismo para el Diálogo Detallado de Proyectos ("Saber más").
 */
export default function ProjectDetailModal({
  project,
  isOpen,
  onClose,
}: ProjectDetailModalProps) {
  const { t } = useLang();

  if (!project) return null;

  return (
    <ModalDialog
      isOpen={isOpen}
      onClose={onClose}
      title={t(project.titleKey)}
      subtitle={t(project.summaryKey)}
      size="lg"
      closeLabel={t("portfolio.close")}
      actions={
        project.links.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {project.links.map((link) => (
              <Button
                key={link.url}
                variant="primary"
                size="sm"
                href={link.url}
                target="_blank"
                icon={<GitHubIcon className="h-4 w-4" />}
              >
                {link.label}
              </Button>
            ))}
          </div>
        ) : undefined
      }
    >
      <div className="space-y-6">
        {/* Stack Tecnológico */}
        <div>
          <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)] mb-2.5">
            {t("portfolio.technologies")}
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <Badge key={tag} size="sm" variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Descripción Detallada */}
        <div>
          <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)] mb-2">
            {t("portfolio.project_overview")}
          </h4>
          <p className="text-xs sm:text-sm text-[var(--color-text-muted)] font-sans leading-relaxed">
            {t(project.detailedDescKey)}
          </p>
        </div>

        {/* Aportes y Responsabilidades Clave */}
        <div>
          <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)] mb-3">
            {t("portfolio.key_contributions")}
          </h4>
          <ul className="space-y-2">
            {project.pointsKeys.map((key) => (
              <li
                key={key}
                className="flex items-start gap-2.5 text-xs sm:text-sm font-sans text-[var(--color-text-muted)]"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-text)]" />
                <span className="leading-relaxed">{t(key)}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Destacados de Arquitectura */}
        {project.architectureHighlightsKeys.length > 0 && (
          <div className="p-4 rounded-lg border border-[var(--color-line)] bg-[var(--color-stripe)]/30">
            <h5 className="font-mono text-xs font-bold text-[var(--color-text)] uppercase tracking-wider mb-2.5">
              {t("portfolio.arch_title")}
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {project.architectureHighlightsKeys.map((archKey, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded bg-[var(--color-bg)] border border-[var(--color-line)]/50 text-[11px] font-mono text-[var(--color-text-muted)] flex items-center gap-1.5"
                >
                  <span className="text-emerald-500 font-bold">✓</span>
                  <span>{t(archKey)}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </ModalDialog>
  );
}
