"use client";

import React from "react";
import LeftSidebar from "../organisms/LeftSidebar";
import RightSidebar from "../organisms/RightSidebar";
import MobileHeader from "../organisms/MobileHeader";
import CustomCursor from "../atoms/CustomCursor";

export interface PortfolioLayoutProps {
  children: React.ReactNode;
}

/**
 * PortfolioLayout - Template que estructura la aplicación en 3 columnas según el diseño de Figma:
 * 1. Columna Izquierda: Menú lateral fijo (`LeftSidebar`) con datos personales, contacto, idiomas, lenguajes, habilidades y CV.
 * 2. Columna Central: Contenido scrolleable sin padding restrictivo en el contenedor raíz para permitir que el Perfil ocupe todo el ancho y alto.
 * 3. Columna Derecha: Menú lateral fijo (`RightSidebar`) con redes sociales y controles.
 * 4. Adaptación Móvil: `MobileHeader` con drawer responsivo para pantallas pequeñas.
 */
export default function PortfolioLayout({ children }: PortfolioLayoutProps) {
  return (
    <div className="relative min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] transition-colors duration-300">
      {/* Cursor personalizado */}
      <CustomCursor />

      {/* Cabecera Móvil (visible en pantallas < 1024px) */}
      <MobileHeader />

      {/* Contenedor principal de 3 columnas */}
      <div className="flex w-full mx-auto max-w-[1920px]">
        {/* Columna Izquierda: Fija / Sticky en Desktop */}
        <div className="hidden lg:block w-72 xl:w-80 shrink-0 sticky top-0 h-screen overflow-hidden z-20">
          <LeftSidebar />
        </div>

        {/* Columna Central: Scroll Vertical Fluido (sin padding exterior forzado para permitir full-width en Perfil) */}
        <main className="flex-1 min-w-0 min-h-screen p-0">
          {children}
        </main>

        {/* Columna Derecha: Fija / Sticky en Desktop */}
        <div className="hidden lg:block w-16 xl:w-20 shrink-0 sticky top-0 h-screen z-30">
          <RightSidebar />
        </div>
      </div>
    </div>
  );
}
