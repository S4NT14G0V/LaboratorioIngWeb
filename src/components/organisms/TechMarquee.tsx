"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { useLang, useTheme } from "@/app/providers";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { TECHS, techIcon } from "@/constants/tech";
import TechCardDisplay from "../molecules/TechCardDisplay";

const CARD_TOTAL = 128 + 24;
const COPIES = 4;
const SET_WIDTH = TECHS.length * CARD_TOTAL;
const SPEED = 95;

const duplicated = Array.from({ length: COPIES }, () => TECHS).flat();

export interface TechMarqueeProps {
  className?: string;
}

/**
 * TechMarquee - Organismo de carrusel continuo arrastrable e infinito de tecnologías.
 * Soporta arrastre táctil y con cursor, pausa en hover y respeta la preferencia de movimiento reducido.
 *
 * @param props - Propiedades opcionales de clase CSS
 */
export default function TechMarquee({ className = "" }: TechMarqueeProps) {
  const { t } = useLang();
  const { theme } = useTheme();
  const reducedMotion = useReducedMotion();

  const marqueeRef = useRef<HTMLDivElement | null>(null);
  const visibleRef = useRef(true);

  const stateRef = useRef({
    position: 0,
    running: true,
    dragging: false,
    lastTime: 0,
    basePosition: 0,
    startX: 0,
    hovering: false,
  });

  const [cursorClass, setCursorClass] = useState("cursor-grab");

  const wrap = (n: number): number => {
    while (n > 0) n -= SET_WIDTH;
    while (n < -SET_WIDTH * (COPIES - 1)) n += SET_WIDTH;
    return n;
  };

  const apply = (v: number) => {
    const el = marqueeRef.current;
    if (el) el.style.transform = `translateX(${v}px)`;
  };

  useEffect(() => {
    if (reducedMotion) return;

    const s = stateRef.current;
    let raf: number;

    const loop = (ts: number) => {
      if (s.lastTime === 0) s.lastTime = ts;
      const dt = ts - s.lastTime;
      s.lastTime = ts;

      if (s.running && !s.dragging && visibleRef.current) {
        s.position = wrap(s.position - SPEED * (dt / 1000));
        apply(s.position);
      }

      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [reducedMotion]);

  useEffect(() => {
    const el = marqueeRef.current;
    if (!el || reducedMotion) return;

    const observer = new IntersectionObserver(([entry]) => {
      visibleRef.current = entry?.isIntersecting ?? true;
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [reducedMotion]);

  const onDown = useCallback((e: React.PointerEvent) => {
    const s = stateRef.current;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    s.running = false;
    s.dragging = true;
    s.startX = e.clientX;
    s.basePosition = s.position;
    setCursorClass("cursor-grabbing");
  }, []);

  const onMove = useCallback((e: React.PointerEvent) => {
    const s = stateRef.current;
    if (!s.dragging) return;
    s.position = wrap(s.basePosition + (e.clientX - s.startX));
    apply(s.position);
  }, []);

  const onUp = useCallback((e: React.PointerEvent) => {
    const s = stateRef.current;
    if (!s.dragging) return;
    s.dragging = false;
    s.running = !s.hovering;
    setCursorClass("cursor-grab");
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
  }, []);

  return (
    <section className={`relative overflow-hidden py-4 ${className}`} aria-label="Carrusel de tecnologías">
      {/* Sombras difuminadas en los extremos */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[var(--color-bg)] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[var(--color-bg)] to-transparent" />

      <div
        ref={marqueeRef}
        className={`flex w-max select-none touch-pan-y ${cursorClass} gap-6`}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        onPointerEnter={() => {
          stateRef.current.hovering = true;
          if (!stateRef.current.dragging) stateRef.current.running = false;
        }}
        onPointerLeave={() => {
          stateRef.current.hovering = false;
          if (!stateRef.current.dragging) stateRef.current.running = true;
        }}
      >
        {duplicated.map((tech, i) => (
          <TechCardDisplay
            key={`${tech.key}-${i}`}
            iconSrc={techIcon(tech, theme)}
            label={t(tech.key)}
          />
        ))}
      </div>
    </section>
  );
}
