"use client";

import React, { useState } from "react";
import { useLang, useTheme } from "@/app/providers";
import { TECHS, techIcon } from "@/constants/tech";
import TechCardDisplay from "../molecules/TechCardDisplay";
import TechMarquee from "./TechMarquee";
import SectionHeading from "../atoms/SectionHeading";

export interface TechShowcaseProps {
  className?: string;
}

/**
 * TechShowcase - Organismo contenedor para la exhibición de tecnologías del Tech Stack.
 * Permite alternar entre la vista continua tipo marquee y una vista en cuadrícula (grid).
 *
 * @param props - Propiedades opcionales de clase CSS
 */
export default function TechShowcase({ className = "" }: TechShowcaseProps) {
  const { t } = useLang();
  const { theme } = useTheme();
  const [gridMode, setGridMode] = useState(false);

  const toggleButton = (
    <button
      type="button"
      onClick={() => setGridMode(!gridMode)}
      aria-expanded={gridMode}
      className="font-mono text-[11px] text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors border border-[var(--color-line)] hover:border-[var(--color-text)] rounded-md px-3 py-1.5 text-nowrap z-20 cursor-pointer"
    >
      {gridMode ? t("stack_opt.hide") : t("stack_opt.show")}
    </button>
  );

  return (
    <div id="stack" className={`w-full relative py-2 ${className}`}>
      <div className="flex justify-between items-center mb-3 px-2">
        <SectionHeading
          label={t("nav.stack")}
          className="!mb-0"
        />
        {toggleButton}
      </div>

      <div className="w-full relative">
        {gridMode ? (
          <section className="relative py-4 w-full" aria-label="Cuadrícula de tecnologías">
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 px-2">
              {TECHS.map((tech, i) => (
                <TechCardDisplay
                  key={tech.key}
                  iconSrc={techIcon(tech, theme)}
                  label={t(tech.key)}
                  delay={i * 60}
                  gridMode
                />
              ))}
            </div>
          </section>
        ) : (
          <div className="w-full">
            <TechMarquee />
          </div>
        )}
      </div>
    </div>
  );
}
