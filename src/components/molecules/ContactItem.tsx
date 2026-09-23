"use client";

import React from "react";
import IconWrapper from "../atoms/IconWrapper";

export interface ContactItemProps {
  label: string;
  value: string;
  icon: React.ReactNode;
  href?: string;
  className?: string;
}

/**
 * ContactItem - Molécula que compone IconWrapper con etiqueta y valor de contacto.
 * Reutilizado en: Menú izquierdo (Datos de Contacto) y Diálogo de Perfil.
 */
export default function ContactItem({
  label,
  value,
  icon,
  href,
  className = "",
}: ContactItemProps) {
  const content = (
    <div className={`group flex items-center gap-3 py-1.5 ${className}`}>
      <IconWrapper size="sm" variant="soft">
        {icon}
      </IconWrapper>
      <div className="flex-1 min-w-0 text-left">
        <p className="font-mono text-[11px] uppercase tracking-wider text-[var(--color-text-muted)] truncate">
          {label}
        </p>
        <p className="text-xs sm:text-sm font-medium text-[var(--color-text)] truncate group-hover:text-[var(--color-text)] transition-colors">
          {value}
        </p>
      </div>
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        className="block hover:opacity-85 transition-opacity"
        {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {content}
      </a>
    );
  }

  return content;
}
