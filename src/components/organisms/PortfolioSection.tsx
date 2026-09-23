"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { useLang } from "@/app/providers";
import { PROJECTS_DATA, ProjectItem } from "@/constants/portfolioData";
import SectionHeading from "../atoms/SectionHeading";
import ProjectCard from "../molecules/ProjectCard";
import ProjectDetailModal from "./ProjectDetailModal";

export interface PortfolioSectionProps {
  className?: string;
}

/**
 * PortfolioSection - Organismo para la sección de Portafolio con carrusel horizontal
 * accionado por scroll vertical (Sticky Pinned Horizontal Scroll) y tarjetas chevron continuas.
 */
export default function PortfolioSection({ className = "" }: PortfolioSectionProps) {
  const { t } = useLang();
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Calcula el desplazamiento horizontal proporcional al scroll vertical
  const handleScroll = useCallback(() => {
    if (!sectionRef.current || !trackRef.current || !containerRef.current) return;

    const section = sectionRef.current;
    const track = trackRef.current;
    const container = containerRef.current;
    const rect = section.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Distancia vertical disponible en la sección pinned
    const totalScrollableDistance = section.offsetHeight - windowHeight;
    if (totalScrollableDistance <= 0) return;

    // Progreso normalizado de 0 a 1 dentro de la sección
    const scrolled = -rect.top;
    const progress = Math.min(Math.max(scrolled / totalScrollableDistance, 0), 1);

    // Desplazamiento horizontal real: diferencia entre el track completo y la ventana visible
    const containerWidth = container.clientWidth;
    const trackWidth = track.scrollWidth;
    const maxTranslate = Math.max(0, trackWidth - containerWidth + 60);
    const translateX = progress * maxTranslate;

    // Aplicar transformación fluida
    track.style.transform = `translateX(-${translateX}px)`;
  }, []);

  useEffect(() => {
    let animationFrameId: number;

    const onScrollOrResize = () => {
      animationFrameId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);

    // Cálculo inicial
    handleScroll();

    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [handleScroll]);

  const handleOpenDetail = (project: ProjectItem) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className={`relative w-full ${className}`}
      // Runway vertical de scroll
      style={{ height: "300vh" }}
    >
      {/* Contenedor Sticky fijado a la ventana durante el scroll vertical */}
      <div className="sticky top-0 h-[calc(100vh-90px)] overflow-hidden flex flex-col justify-between">
        <div className="w-full h-full flex flex-col justify-between p-4 sm:p-8 xl:p-12">
          {/* Encabezado sin números ni doble slash */}
          <div className="border-b border-[var(--color-line)] flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-3 pb-2 shrink-0">
            <SectionHeading
              label={t("portfolio.heading")}
              className="mb-0"
            />
          </div>

          {/* Contenedor visible con ancho completo medido por containerRef */}
          <div ref={containerRef} className="relative w-full flex-1 min-h-0 overflow-hidden py-1">
            {/* Track horizontal con tarjetas chevron anidadas */}
            <div
              ref={trackRef}
              className="flex h-full items-stretch will-change-transform transition-transform duration-75 ease-out pr-8"
              style={{ width: "max-content" }}
            >
              {PROJECTS_DATA.map((project, idx) => (
                <ProjectCard
                  key={project.id}
                  index={idx}
                  title={t(project.titleKey)}
                  description={t(project.summaryKey)}
                  tags={project.tags}
                  learnMoreLabel={t("portfolio.learn_more")}
                  onLearnMore={() => handleOpenDetail(project)}
                  className={idx > 0 ? "-ml-6 sm:-ml-10" : ""}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal Diálogo de Detalle del Proyecto ("Saber más") */}
      <ProjectDetailModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}
