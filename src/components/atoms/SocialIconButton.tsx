"use client";

import React, { useState } from "react";

export interface SocialIconButtonProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  tooltipPosition?: "left" | "top" | "right" | "bottom";
  className?: string;
  download?: string | boolean;
}

/**
 * SocialIconButton - Átomo para botones de enlace a redes sociales con tooltip.
 */
export default function SocialIconButton({
  href,
  icon,
  label,
  tooltipPosition = "left",
  className = "",
  download,
}: SocialIconButtonProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  const tooltipPosClass = {
    left: "right-full mr-2.5 top-1/2 -translate-y-1/2",
    right: "left-full ml-2.5 top-1/2 -translate-y-1/2",
    top: "bottom-full mb-2.5 left-1/2 -translate-x-1/2",
    bottom: "top-full mt-2.5 left-1/2 -translate-x-1/2",
  }[tooltipPosition];

  return (
    <div className="relative inline-flex items-center justify-center">
      <a
        href={href}
        target={download ? undefined : "_blank"}
        rel={download ? undefined : "noopener noreferrer"}
        download={download}
        aria-label={label}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onFocus={() => setShowTooltip(true)}
        onBlur={() => setShowTooltip(false)}
        className={`group relative flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--color-line)] bg-[var(--color-bg)] text-[var(--color-text-muted)] hover:border-[var(--color-text)] hover:text-[var(--color-text)] hover:bg-[var(--color-stripe)] transition-all duration-200 active:scale-95 ${className}`}
      >
        <span className="flex items-center justify-center h-full w-full transition-transform duration-200 group-hover:scale-110">
          {icon}
        </span>
      </a>

      {showTooltip && (
        <div
          role="tooltip"
          className={`pointer-events-none absolute z-[100] whitespace-nowrap rounded-md border border-[var(--color-line)]/60 bg-[var(--color-tooltip-bg)] px-2.5 py-1 font-mono text-[11px] font-medium text-[var(--color-tooltip-text)] shadow-xl transition-opacity duration-150 ${tooltipPosClass}`}
        >
          {label}
        </div>
      )}
    </div>
  );
}
