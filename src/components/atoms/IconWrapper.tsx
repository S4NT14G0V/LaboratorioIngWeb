"use client";

import React from "react";

export interface IconWrapperProps {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
  variant?: "square" | "circle" | "soft";
  className?: string;
}

/**
 * IconWrapper - Átomo contenedor estilizado para íconos vectoriales SVG.
 */
export default function IconWrapper({
  children,
  size = "md",
  variant = "square",
  className = "",
}: IconWrapperProps) {
  const sizeClasses = {
    sm: "h-8 w-8 text-sm",
    md: "h-11 w-11 text-base",
    lg: "h-14 w-14 text-xl",
  }[size];

  const variantClasses = {
    square: "rounded-lg border border-[var(--color-line)] bg-[var(--color-stripe)]/40",
    circle: "rounded-full border border-[var(--color-line)] bg-[var(--color-stripe)]/40",
    soft: "rounded-md bg-[var(--color-stripe)]/60 text-[var(--color-text)]",
  }[variant];

  return (
    <div
      className={`inline-flex items-center justify-center shrink-0 text-[var(--color-text)] transition-transform duration-200 group-hover:scale-105 group-hover:border-[var(--color-text)] ${sizeClasses} ${variantClasses} ${className}`}
    >
      {children}
    </div>
  );
}
