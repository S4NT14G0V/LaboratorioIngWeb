"use client";

import { useEffect, useMemo, useState } from "react";
import { useTheme, useLang } from "@/app/providers";
import LiquidCanvas from "./LiquidCanvas";
import { detectPerformanceProfile } from "@/lib/performanceProfile";
import Image from "next/image";

export interface HeroCanvasProps {
  className?: string;
  showThoughtBubble?: boolean;
}

export default function HeroCanvas({
  className = "relative h-full min-h-[380px] lg:min-h-[460px] w-full rounded-2xl overflow-hidden gradient-bg transition-colors duration-300",
  showThoughtBubble = false,
}: HeroCanvasProps) {
  const { theme } = useTheme();
  const { t } = useLang();
  const [fontsReady, setFontsReady] = useState(false);
  const [canvasReady, setCanvasReady] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    document.fonts.ready.then(() => setFontsReady(true));
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const perf = useMemo(() => detectPerformanceProfile(), []);

  const strokeColor =
    theme === "dark"
      ? "rgba(255,255,255,0.45)"
      : "rgba(27,27,27,0.4)";

  const letterClass = perf.reducedMotion
    ? "letter-static"
    : fontsReady
      ? "letter-draw"
      : "letter-hidden";

  return (
    <div className={`relative z-0 gradient-bg transition-colors duration-300 ${className}`}>
      <div className="base" />
      <div className="treatment" />
      <div className="glow" />
      {perf.enableHeavyLayers && <div className="particles" />}
      <div className="vignette" />
      {perf.enableHeavyLayers && <div className="noise" />}
      {perf.enableHeavyLayers && <div className="halftone" />}

      {/* SVG Tipografía Iceland */}
      <div
        className="absolute flex justify-center items-center inset-0 overflow-hidden pointer-events-none select-none z-10"
        aria-hidden="true"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 1050 260"
          preserveAspectRatio="xMidYMid meet"
          className="w-[95%] max-w-[1000px]"
          style={{ pointerEvents: "none" }}
        >
          <text
            x="525"
            y="195"
            textAnchor="middle"
            fill="transparent"
            strokeWidth="2"
            style={{
              stroke: strokeColor,
              fontFamily: "var(--font-iceland)",
              fontSize: "300",
              letterSpacing: "-0.01em",
            }}
          >
            {"Santiago".split("").map((char, i) => (
              <tspan
                key={i}
                className={letterClass}
                style={{ animationDelay: `${i * 250}ms` }}
              >
                {char}
              </tspan>
            ))}
          </text>
        </svg>
      </div>

      {/* Imagen con LiquidCanvas interactivo */}
      <div className="absolute inset-0 z-10">
        <Image
          src="/color_sinfondo.webp"
          alt="Santiago Trespalacios Bolívar"
          width={1633}
          height={571}
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-contain object-bottom transition-opacity duration-300"
          style={{
            pointerEvents: "none",
            opacity: canvasReady ? 0 : 1,
            transform: isMobile ? "scale(1.3)" : "scale(0.9)",
            transformOrigin: "50% 100%",
          }}
        />
        {!perf.reducedMotion && (
          <LiquidCanvas
            imageSrc="/color_sinfondo.webp"
            sketchSrc="/nocolor_sinfondo.webp"
            bandIn={0.01}
            bandOut={0.1}
            stretch={2.5}
            fitScale={isMobile ? 1.2 : 1.3}
            grid={perf.grid}
            pixelRatio={perf.pixelRatio}
            reducedMotion={perf.reducedMotion}
            onReady={() => setCanvasReady(true)}
          />
        )}
      </div>

      {/* Bocadillo de pensamiento opcional */}
      {showThoughtBubble && (
        <div className="hidden md:block absolute left-[10%] top-[14%] z-50 thought-bubble">
          <div className="relative max-w-[28ch] bg-[var(--color-bg)]/80 backdrop-blur-sm border border-[var(--color-line)] rounded-xl px-4 py-3 text-xs leading-relaxed text-[var(--color-text)]">
            {t("about.thought_bubble")}
            <span className="absolute -right-[9px] top-1/2 -translate-y-1/2 h-3.5 w-3.5 rotate-45 bg-[var(--color-bg)] border-r border-t border-[var(--color-line)] rounded-[1px]" />
          </div>
        </div>
      )}
    </div>
  );
}
