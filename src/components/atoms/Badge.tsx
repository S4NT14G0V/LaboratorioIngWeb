"use client";

import React from "react";

export interface BadgeProps {
  children: React.ReactNode;
  variant?: "outline" | "solid" | "subtle" | "glow";
  size?: "xs" | "sm" | "md";
  className?: string;
  icon?: React.ReactNode;
}

/**
 * Badge - Átomo para etiquetas, tags tecnológicas y estados.
 */
export default function Badge({
  children,
  variant = "outline",
  size = "sm",
  className = "",
  icon,
}: BadgeProps) {
  const sizeClasses = {
    xs: "text-[10px] px-2 py-0.5",
    sm: "text-xs px-2.5 py-1",
    md: "text-sm px-3 py-1.5",
  }[size];

  const variantClasses = {
    outline:
      "border border-[var(--color-line)] text-[var(--color-text-muted)] hover:border-[var(--color-text)] hover:text-[var(--color-text)] transition-colors duration-200",
    solid:
      "bg-[var(--color-text)] text-[var(--color-bg)] font-semibold border border-[var(--color-text)]",
    subtle:
      "bg-[var(--color-stripe)]/60 text-[var(--color-text)] border border-[var(--color-line)]/50",
    glow:
      "border border-emerald-500/40 bg-emerald-500/10 text-emerald-400 dark:text-emerald-300 font-mono",
  }[variant];

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-mono rounded-md tracking-wide transition-all ${sizeClasses} ${variantClasses} ${className}`}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
}
