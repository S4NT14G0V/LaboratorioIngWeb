"use client";

import React from "react";

export interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  onClick?: () => void;
  href?: string;
  download?: boolean | string;
  target?: string;
  rel?: string;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
  ariaLabel?: string;
}

/**
 * Button - Átomo para acciones interactivas y enlaces con estilo de botón.
 */
export default function Button({
  children,
  variant = "outline",
  size = "md",
  icon,
  iconPosition = "left",
  onClick,
  href,
  download,
  target,
  rel,
  disabled = false,
  className = "",
  type = "button",
  ariaLabel,
}: ButtonProps) {
  const sizeClasses = {
    sm: "px-3 py-1.5 text-xs gap-1.5",
    md: "px-4 py-2.5 text-xs md:text-sm gap-2",
    lg: "px-6 py-3 text-sm md:text-base gap-2.5",
  }[size];

  const variantClasses = {
    primary:
      "bg-[var(--color-text)] text-[var(--color-bg)] hover:opacity-90 active:scale-[0.98] border border-[var(--color-text)] font-semibold shadow-sm",
    secondary:
      "bg-[var(--color-stripe)] text-[var(--color-text)] hover:bg-[var(--color-line)]/50 active:scale-[0.98] border border-[var(--color-line)]",
    outline:
      "border border-[var(--color-line)] text-[var(--color-text)] hover:border-[var(--color-text)] hover:bg-[var(--color-text)] hover:text-[var(--color-bg)] transition-colors active:scale-[0.98]",
    ghost:
      "text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-line)]/20",
  }[variant];

  const baseClasses = `group inline-flex items-center justify-center font-mono rounded-md transition-all duration-200 select-none cursor-pointer disabled:opacity-50 disabled:pointer-events-none ${sizeClasses} ${variantClasses} ${className}`;

  if (href) {
    return (
      <a
        href={href}
        onClick={onClick}
        target={target}
        rel={target === "_blank" ? (rel || "noopener noreferrer") : rel}
        download={download}
        className={baseClasses}
        aria-label={ariaLabel}
      >
        {icon && iconPosition === "left" && <span className="shrink-0">{icon}</span>}
        <span>{children}</span>
        {icon && iconPosition === "right" && <span className="shrink-0">{icon}</span>}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={baseClasses}
      aria-label={ariaLabel}
    >
      {icon && iconPosition === "left" && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === "right" && <span className="shrink-0">{icon}</span>}
    </button>
  );
}
