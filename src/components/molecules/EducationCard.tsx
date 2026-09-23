"use client";

import Badge from "../atoms/Badge";
import IconWrapper from "../atoms/IconWrapper";

export interface EducationCardProps {
  institution: string;
  degree: string;
  dates: string;
  status?: string;
  description: string;
  highlights?: string[];
  className?: string;
}

/**
 * EducationCard - Molécula para representar un hito académico o certificación.
 */
export default function EducationCard({
  institution,
  degree,
  dates,
  status,
  description,
  highlights = [],
  className = "",
}: EducationCardProps) {
  return (
    <article
      className={`group relative rounded-xl border border-[var(--color-line)] bg-[var(--color-bg)] p-6 transition-all duration-300 hover:border-[var(--color-text)] hover:shadow-lg ${className}`}
    >
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <IconWrapper size="sm" variant="circle">
            <svg
              className="h-4 w-4 text-[var(--color-text)]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.8}
            >
              <path d="M12 14l9-5-9-5-9 5 9 5z" />
              <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            </svg>
          </IconWrapper>
          <span className="font-mono text-xs uppercase tracking-wider text-[var(--color-text-muted)] font-semibold">
            {institution}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {status && (
            <Badge size="xs" variant="glow">
              {status}
            </Badge>
          )}
          <Badge size="xs" variant="outline">
            {dates}
          </Badge>
        </div>
      </div>

      <h3 className="font-mono text-base sm:text-lg font-bold text-[var(--color-text)] mb-2">
        {degree}
      </h3>

      <p className="text-xs sm:text-sm text-[var(--color-text-muted)] font-sans leading-relaxed mb-4">
        {description}
      </p>

      {highlights.length > 0 && (
        <ul className="space-y-1.5 pt-3 border-t border-[var(--color-line)]/50">
          {highlights.map((highlight, i) => (
            <li key={i} className="flex items-start gap-2 text-xs font-sans text-[var(--color-text-muted)]">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-text)] opacity-70" />
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
