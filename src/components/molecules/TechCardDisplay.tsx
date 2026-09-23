"use client";

import { useState } from "react";

export interface TechCardDisplayProps {
  /** Nombre del archivo de ícono dentro de /stack/ */
  iconSrc?: string;
  /** Nombre visible de la tecnología */
  label: string;
  /** Retraso en milisegundos para la animación de entrada en grid */
  delay?: number;
  /** Indica si se está renderizando dentro de la vista de cuadrícula o en el marquee */
  gridMode?: boolean;
}

/**
 * TechCardDisplay - Molécula interactiva para presentar una tecnología individual.
 * Permite voltear al hacer clic para alternar entre el ícono y el nombre de la tecnología.
 *
 * @param props - Parámetros de la tecnología (iconSrc, label, delay, gridMode)
 */
export default function TechCardDisplay({
  iconSrc,
  label,
  delay = 0,
  gridMode = false,
}: TechCardDisplayProps) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className={`flex h-16 items-center justify-center group ${
        gridMode ? "w-full md:w-32" : "w-32"
      }`}
      style={
        gridMode
          ? { animation: `tech-grid-in 400ms ${delay}ms cubic-bezier(0.22, 1, 0.36, 1) both` }
          : undefined
      }
    >
      <div
        role="button"
        tabIndex={0}
        aria-label={`Tecnología: ${label}`}
        className={`relative flex h-full w-full select-none items-center justify-center border transition-colors cursor-pointer rounded-lg ${
          flipped
            ? "border-[var(--color-text)] bg-[var(--color-stripe)]/30"
            : "border-[var(--color-line)] group-hover:border-[var(--color-text)] bg-[var(--color-bg)]"
        }`}
        onClick={() => setFlipped((v) => !v)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setFlipped((v) => !v);
          }
        }}
      >
        {iconSrc ? (
          <>
            <img
              src={`/stack/${iconSrc}`}
              alt={label}
              className={`h-8 w-8 object-contain transition-[opacity,transform] duration-200 ${
                flipped
                  ? "opacity-0 scale-90"
                  : "opacity-100 scale-100 group-hover:opacity-0 group-hover:scale-90"
              }`}
            />
            <span
              className={`absolute inset-0 flex items-center justify-center font-mono text-xs font-semibold text-[var(--color-text)] transition-[opacity,transform] duration-200 scale-90 whitespace-nowrap px-1 ${
                flipped
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100"
              }`}
            >
              {label}
            </span>
          </>
        ) : (
          <span className="flex items-center justify-center font-mono text-[11px] font-semibold text-[var(--color-text)] whitespace-nowrap px-2">
            {label}
          </span>
        )}
      </div>
    </div>
  );
}
