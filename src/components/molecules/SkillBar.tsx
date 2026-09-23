"use client";

import ProgressBar from "../atoms/ProgressBar";

export interface SkillBarProps {
  name: string;
  percentage: number;
  level?: string;
  size?: "sm" | "md";
  className?: string;
}

/**
 * SkillBar - Molécula que compone el átomo ProgressBar con etiquetas descriptivas.
 * Reutilizado en: Sección de Idiomas y sección de Lenguajes de Programación en el Menú Izquierdo.
 */
export default function SkillBar({
  name,
  percentage,
  level,
  size = "md",
  className = "",
}: SkillBarProps) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      <div className="flex justify-between items-center text-xs font-mono">
        <span className="text-[var(--color-text)] font-semibold">{name}</span>
        <div className="flex items-center gap-2">
          {level && (
            <span className="text-[11px] text-[var(--color-text-muted)] font-sans italic">
              {level}
            </span>
          )}
          <span className="text-[11px] text-[var(--color-text-muted)] font-mono font-medium">
            {percentage}%
          </span>
        </div>
      </div>

      <ProgressBar percentage={percentage} showPercent={false} size={size} />
    </div>
  );
}
