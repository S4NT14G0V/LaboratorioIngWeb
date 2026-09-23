"use client";

export interface SectionHeadingProps {
  label: string;
  index?: string;
  subtitle?: string;
  className?: string;
}

/**
 * SectionHeading - Átomo para encabezados estandarizados de sección.
 */
export default function SectionHeading({
  label,
  subtitle,
  className = "",
}: SectionHeadingProps) {
  return (
    <div className={`mb-8 ${className}`}>
      <div className="flex items-center gap-4">
        <h2 className="font-mono text-sm sm:text-base font-bold tracking-widest uppercase text-[var(--color-text)]">
          {label}
        </h2>
      </div>

      {subtitle && (
        <p className="mt-2 text-xs sm:text-sm text-[var(--color-text-muted)] max-w-2xl font-sans">
          {subtitle}
        </p>
      )}
    </div>
  );
}
