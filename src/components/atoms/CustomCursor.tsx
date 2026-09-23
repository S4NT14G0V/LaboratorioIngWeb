"use client";

import { useEffect, useRef } from "react";

export interface CustomCursorProps {
  className?: string;
}

/**
 * CustomCursor - Átomo para renderizar un cursor dinámico interactivo de doble anillo con aceleración lerp.
 * Se desactiva automáticamente en pantallas táctiles (`pointer: coarse`).
 * 
 * @param props - Propiedades opcionales de clase CSS
 */
export default function CustomCursor({ className = "" }: CustomCursorProps) {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;
    if (matchMedia("(pointer: coarse)").matches) return;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    let targetX = -100;
    let targetY = -100;
    let dotX = -100;
    let dotY = -100;
    let ringX = -100;
    let ringY = -100;

    const onMove = (e: PointerEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      const el = e.target as HTMLElement | null;
      const hovering = !!el?.closest("a, button, [role='button'], input, textarea, select, label");
      dot.classList.toggle("is-hovering", hovering);
    };

    const onLeave = () => {
      targetX = -100;
      targetY = -100;
    };

    let raf = 0;
    let dotPrevX = -100;
    let dotPrevY = -100;
    let ringPrevX = -100;
    let ringPrevY = -100;

    const loop = () => {
      raf = requestAnimationFrame(loop);
      dotX = lerp(dotX, targetX, 0.9);
      dotY = lerp(dotY, targetY, 0.9);
      ringX = lerp(ringX, targetX, 0.18);
      ringY = lerp(ringY, targetY, 0.18);

      if (dotX !== dotPrevX || dotY !== dotPrevY) {
        dotPrevX = dotX;
        dotPrevY = dotY;
        dot.style.transform = `translate(${dotX}px, ${dotY}px) translate(-50%, -50%)`;
      }
      if (ringX !== ringPrevX || ringY !== ringPrevY) {
        ringPrevX = ringX;
        ringPrevY = ringY;
        ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    loop();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div className={className}>
      <div ref={dotRef} className="custom-cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="custom-cursor-ring" aria-hidden="true" />
    </div>
  );
}
