"use client";

import { useState, useRef, useEffect } from "react";
import Button from "../atoms/Button";

export interface ProjectCardProps {
  id?: string;
  title: string;
  description: string;
  image?: string;
  video?: string;
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
 * - Previsualización de video animada por detrás del card en hover cuando se provee 'video'.
 */
export default function ProjectCard({
  id,
  title,
  description,
  video,
  tags,
  learnMoreLabel,
  onLearnMore,
  className = "",
  index = 0,
}: ProjectCardProps) {
  const [isDesktop, setIsDesktop] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Detección estricta de dispositivo PC / Escritorio (pantalla >= 1024px y cursor fino con hover real)
  // En dispositivos móviles (smartphones/tablets), no se monta el elemento <video> en el DOM,
  // evitando por completo la descarga de los archivos de video (0 MB consumidos en móvil).
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 1024px)");
    setIsDesktop(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const hasVideo = Boolean(video) && isDesktop;
  const isSyncActivity = id === "fitness" || (video ? video.includes("syncactivity") : false);

  useEffect(() => {
    if (!hasVideo || !videoRef.current) return;
    // Audio 100% desactivado por requerimiento estricto
    videoRef.current.muted = true;
    videoRef.current.defaultMuted = true;
    videoRef.current.volume = 0;

    if (isHovered) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    } else {
      videoRef.current.pause();
    }
  }, [isHovered, hasVideo]);

  return (
    <article
      onMouseEnter={() => hasVideo && setIsHovered(true)}
      onMouseLeave={() => hasVideo && setIsHovered(false)}
      className={`group relative shrink-0 w-[85vw] sm:w-[680px] lg:w-[780px] xl:w-[840px] h-full select-none transition-all duration-300 hover:scale-[1.01] ${
        isHovered ? "z-30" : "z-10"
      } ${className}`}
    >
      {/* 0. Video de previsualización: SÓLO se monta en el DOM para PCs/Desktop (0 bytes descargados en móvil) */}
      {hasVideo && (
        <div
          className={`pointer-events-none absolute inset-0 z-[2] transition-opacity duration-500 ease-in-out ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
          style={{
            clipPath:
              index === 0
                ? "polygon(0% 0%, 93.6% 0%, 100% 50%, 93.6% 100%, 0% 100%)"
                : "polygon(0% 0%, 93.6% 0%, 100% 50%, 93.6% 100%, 0% 100%, 6.4% 50%)",
          }}
        >
          {/* Contenedor del video en la parte inferior: sin borde superior y difuminado suave */}
          <div className="absolute left-0 right-0 overflow-hidden bottom-0 h-[40%] sm:h-[44%]">
            {/* Para syncactivity se ancla al fondo para que la bicicleta sea visible, se sube y se ajusta a la izquierda para entrar de inmediato */}
            <video
              ref={videoRef}
              src={video}
              muted
              playsInline
              loop
              preload="metadata"
              className={`absolute h-auto min-h-full object-cover ${
                isSyncActivity
                  ? "-top-15 -left-1 min-w-[103%] w-[103%] object-bottom"
                  : "top-0 left-1/2 -translate-x-1/2 min-w-[108%] w-[108%] object-top"
              }`}
            />
            {/* Difuminado suave con el fondo del card sin ninguna línea ni borde duro */}
            <div className="absolute top-0 left-0 right-0 h-8 pointer-events-none bg-gradient-to-b from-[var(--color-bg)] via-[var(--color-bg)]/40 to-transparent" />
          </div>
        </div>
      )}

      {/* 1. Fondo vectorial en forma de flecha chevron */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-sm z-[1]"
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
          className={`fill-[var(--color-bg)] transition-colors duration-300 ${
            hasVideo
              ? "stroke-[var(--color-line)] group-hover:stroke-[var(--color-line-strong)]"
              : "stroke-[var(--color-line)] group-hover:fill-[var(--color-text)] group-hover:stroke-[var(--color-text)]"
          }`}
          strokeWidth="1.5"
        />
      </svg>

      {/* 2. Contenido interno centrado en medio pero ligeramente más arriba */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-12 sm:px-20 md:px-24 pt-4 pb-10 sm:pb-12 gap-2.5 sm:gap-3 -translate-y-2 sm:-translate-y-3">
        {/* Título */}
        <h3
          className={`font-mono text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight transition-colors duration-300 ${
            hasVideo
              ? "text-[var(--color-text)]"
              : "text-[var(--color-text)] group-hover:text-[var(--color-bg)]"
          }`}
        >
          {title}
        </h3>

        {/* Descripción */}
        <p
          className={`text-xs sm:text-sm font-sans leading-relaxed max-w-xl transition-colors duration-300 line-clamp-2 sm:line-clamp-3 ${
            hasVideo
              ? "text-[var(--color-text-muted)]"
              : "text-[var(--color-text-muted)] group-hover:text-[var(--color-bg)]/85"
          }`}
        >
          {description}
        </p>

        {/* Stack de Tecnologías */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 pt-0.5">
          {tags.map((tech) => (
            <span
              key={tech}
              className={`font-mono text-xs px-2.5 py-1 rounded-md border transition-colors duration-300 ${
                hasVideo
                  ? "border-[var(--color-line)] text-[var(--color-text-muted)] bg-[var(--color-bg)]/80"
                  : "border-[var(--color-line)] text-[var(--color-text-muted)] group-hover:border-[var(--color-bg)]/30 group-hover:text-[var(--color-bg)]/90"
              }`}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Botón de acción */}
        <div className="pt-1.5">
          <Button
            variant="outline"
            size="sm"
            onClick={onLearnMore}
            className={
              hasVideo
                ? "border-[var(--color-line-strong)] text-[var(--color-text)] hover:bg-[var(--color-text)] hover:text-[var(--color-bg)] bg-[var(--color-bg)]/85 backdrop-blur-md shadow-sm"
                : "group-hover:border-[var(--color-bg)] group-hover:text-[var(--color-bg)] group-hover:bg-[var(--color-text)]/75 backdrop-blur-md group-hover:hover:bg-[var(--color-bg)] group-hover:hover:text-[var(--color-text)] shadow-sm"
            }
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
