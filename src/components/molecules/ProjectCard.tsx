"use client";

import Button from "../atoms/Button";

export interface ProjectCardProps {
  title: string;
  description: string;
  image?: string;
  tags: string[];
  learnMoreLabel: string;
  onLearnMore: () => void;
  className?: string;
  index?: number;
}

/**
 * ProjectCard - Molécula de proyecto con el diseño de flecha chevron continuo (según dibujo del usuario).
 * Características:
 * - Forma chevron continua en avance: lado izquierdo con hendidura y lado derecho en punta flecha '>'.
 * - Ocupa el máximo ancho posible.
 * - Sin imágenes según la instrucción del usuario ("no hace falta poner imagenes").
 * - Nombre (título) a la izquierda/arriba, caja framed para Descripción en el centro, y fila de tecnologías abajo.
 * - Efecto de hover idéntico a educación: invierte el color de fondo a var(--color-text) y los textos a var(--color-bg).
 */
export default function ProjectCard({
  title,
  description,
  tags,
  learnMoreLabel,
  onLearnMore,
  className = "",
  index = 0,
}: ProjectCardProps) {
  return (
    <article
      className={`group relative shrink-0 w-[85vw] sm:w-[680px] lg:w-[780px] xl:w-[840px] h-full select-none transition-transform duration-300 hover:scale-[1.01] ${className}`}
    >
      {/* 1. Fondo vectorial en forma de flecha chevron con efecto hover invertido */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-sm"
        viewBox="0 0 860 300"
        preserveAspectRatio="none"
      >
        <path
          d={
            index === 0
              ? "M 0,0 L 805,0 L 860,150 L 805,300 L 0,300 Z"
              : "M 0,0 L 805,0 L 860,150 L 805,300 L 0,300 L 55,150 Z"
          }
          vectorEffect="non-scaling-stroke"
          className="fill-[var(--color-bg)] stroke-[var(--color-line)] group-hover:fill-[var(--color-text)] group-hover:stroke-[var(--color-text)] transition-colors duration-300"
          strokeWidth="1.5"
        />
      </svg>

      {/* 2. Contenido interno centrado que respeta los márgenes del chevron */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-12 sm:px-20 md:px-24 py-6 gap-3 sm:gap-4">
        {/* Título */}
        <h3 className="font-mono text-xl sm:text-2xl lg:text-3xl font-bold text-[var(--color-text)] group-hover:text-[var(--color-bg)] transition-colors duration-300 tracking-tight">
          {title}
        </h3>

        {/* Descripción */}
        <p className="text-xs sm:text-sm text-[var(--color-text-muted)] group-hover:text-[var(--color-bg)]/85 transition-colors duration-300 font-sans leading-relaxed max-w-xl line-clamp-3">
          {description}
        </p>

        {/* Stack de Tecnologías */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 pt-1">
          {tags.map((tech) => (
            <span
              key={tech}
              className="font-mono text-xs px-2.5 py-1 rounded-md border border-[var(--color-line)] text-[var(--color-text-muted)] group-hover:border-[var(--color-bg)]/30 group-hover:text-[var(--color-bg)]/90 transition-colors duration-300"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Botón de acción */}
        <div className="pt-1 sm:pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onLearnMore}
            className="group-hover:border-[var(--color-bg)] group-hover:text-[var(--color-bg)] group-hover:hover:bg-[var(--color-bg)] group-hover:hover:text-[var(--color-text)]"
            iconPosition="right"
            icon={
              <span className="font-mono font-bold transition-transform group-hover:translate-x-1">
                &gt;
              </span>
            }
          >
            {learnMoreLabel}
          </Button>
        </div>
      </div>
    </article>
  );
}
