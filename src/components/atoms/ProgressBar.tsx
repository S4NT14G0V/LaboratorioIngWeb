"use client";

export interface ProgressBarProps {
  percentage: number;
  label?: string;
  showPercent?: boolean;
  size?: "sm" | "md";
  className?: string;
}

/**
 * ProgressBar - Átomo para representar porcentajes de dominio o progreso.
 */
export default function ProgressBar({
  percentage,
  label,
  showPercent = true,
  size = "md",
  className = "",
}: ProgressBarProps) {
  const clampedPercent = Math.min(100, Math.max(0, percentage));
  const heightClass = size === "sm" ? "h-1.5" : "h-2";

  return (
    <div className={`w-full ${className}`}>
      {(label || showPercent) && (
        <div className="flex justify-between items-center mb-1.5 text-xs font-mono">
          {label && <span className="text-[var(--color-text)] font-medium">{label}</span>}
          {showPercent && (
            <span className="text-[var(--color-text-muted)] font-mono text-[11px]">
              {clampedPercent}%
            </span>
          )}
        </div>
      )}
      <div
        role="progressbar"
        aria-valuenow={clampedPercent}
        aria-valuemin={0}
        aria-valuemax={100}
        className={`w-full overflow-hidden rounded-full bg-[var(--color-line)]/50 ${heightClass}`}
      >
        <div
          className="h-full rounded-full bg-[var(--color-text)] transition-all duration-700 ease-out"
          style={{ width: `${clampedPercent}%` }}
        />
      </div>
    </div>
  );
}
