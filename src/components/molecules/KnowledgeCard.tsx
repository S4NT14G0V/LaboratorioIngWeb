"use client";

import React from "react";
import IconWrapper from "../atoms/IconWrapper";
import Badge from "../atoms/Badge";

export interface KnowledgeCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  tags?: string[];
  className?: string;
}

/**
 * KnowledgeCard - Molécula que compone IconWrapper y Badges para mostrar un área de conocimiento.
 */
export default function KnowledgeCard({
  title,
  description,
  icon,
  tags = [],
  className = "",
}: KnowledgeCardProps) {
  return (
    <article
      className={`group relative flex flex-col justify-between rounded-xl border border-[var(--color-line)] bg-[var(--color-bg)] p-6 transition-all duration-300 hover:border-[var(--color-text)] hover:shadow-lg hover:-translate-y-1 ${className}`}
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <IconWrapper size="md" variant="square">
            {icon}
          </IconWrapper>
        </div>

        <h3 className="font-mono text-base sm:text-lg font-bold text-[var(--color-text)] mb-2.5 tracking-tight group-hover:text-[var(--color-text)]">
          {title}
        </h3>

        <p className="text-xs sm:text-sm text-[var(--color-text-muted)] leading-relaxed font-sans mb-5">
          {description}
        </p>
      </div>

      {tags.length > 0 && (
        <div className="pt-4 border-t border-[var(--color-line)]/50 flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <Badge key={tag} size="sm" variant="outline">
              {tag}
            </Badge>
          ))}
        </div>
      )}
    </article>
  );
}
