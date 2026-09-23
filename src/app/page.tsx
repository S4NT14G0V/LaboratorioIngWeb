import PortfolioLayout from "@/components/templates/PortfolioLayout";
import ProfileSection from "@/components/organisms/ProfileSection";
import ExperienceSection from "@/components/organisms/ExperienceSection";
import PortfolioSection from "@/components/organisms/PortfolioSection";
import KnowledgeSection from "@/components/organisms/KnowledgeSection";
import TechShowcase from "@/components/organisms/TechShowcase";
import EducationSection from "@/components/organisms/EducationSection";
import Footer from "@/components/organisms/Footer";

/**
 * Home - Página principal del portafolio.
 * Desarrollado para el Proyecto Evaluativo 1 de Ingeniería Web.
 * 
 * Jerarquía de secciones organizada por orden de relevancia e impacto:
 * 1. Perfil (Hero animado a la derecha, sin títulos exteriores, ancho y alto completo).
 * 2. Experiencia Profesional (puesto, empresa, viñetas, año 2025 en display).
 * 3. Portafolio de Proyectos (carrusel horizontal accionado por scroll vertical con diseño chevron >> sin imágenes).
 * 4. Conocimientos Técnicos & Tech Stack (cards según Figma + carrusel full-width).
 * 5. Educación (Ingeniería de Sistemas en Universidad de Antioquia, año 2020 en display).
 * 6. Footer (diseño personal).
 */
export default function Home() {
  return (
    <PortfolioLayout>
      <div className="w-full space-y-4 sm:space-y-6">
        {/* 1. Perfil: Full-width y full-height con Hero animado a la derecha */}
        <ProfileSection />

        {/* 2. Experiencia Profesional (priorizada arriba) */}
        <ExperienceSection />

        {/* 3. Portafolio de Proyectos (Carrusel chevron >> continuo accionado por scroll) */}
        <PortfolioSection />

        {/* 4. Conocimientos & Tech Stack */}
        <div className="space-y-2">
          <KnowledgeSection />
          <div className="w-full px-4 sm:px-8 xl:px-12 pt-1 pb-4">
            <TechShowcase />
          </div>
        </div>

        {/* 5. Educación (Ingeniería de Sistemas - Universidad de Antioquia) */}
        <EducationSection />

        {/* 6. Footer */}
        <Footer />
      </div>
    </PortfolioLayout>
  );
}
