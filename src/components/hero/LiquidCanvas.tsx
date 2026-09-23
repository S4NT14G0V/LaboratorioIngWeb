"use client";

import { useEffect, useRef } from "react";
import { buildSdfMap } from "@/lib/edt";

interface LiquidCanvasProps {
  imageSrc: string;
  sketchSrc?: string;
  grid?: number;
  mouseRadius?: number;
  strength?: number;
  relaxation?: number;
  smudgeScale?: number;
  fitScale?: number;
  bandIn?: number;
  bandOut?: number;
  stretch?: number;
  introDuration?: number;
  introStrength?: number;
  pixelRatio?: number;
  reducedMotion?: boolean;
  onReady?: () => void;
}

const SDF_MAX_DIM = 1024;
const SLOW_FRAME_MS = 45;
const SLOW_FRAME_BUDGET_MS = 150;

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

export default function LiquidCanvas({
  imageSrc,
  sketchSrc,
  grid = 80,
  mouseRadius = 0.065,
  strength = 0.1,
  relaxation = 0.9,
  smudgeScale = 0.02,
  fitScale = 0.85,
  bandIn = 0.01,
  bandOut = 0.2,
  stretch = 2.5,
  introDuration = 1.5,
  introStrength = 1.0,
  pixelRatio = 2,
  reducedMotion = false,
  onReady,
}: LiquidCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const onReadyRef = useRef(onReady);

  useEffect(() => {
    onReadyRef.current = onReady;
  }, [onReady]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let cancelled = false;

    const canvas = document.createElement("canvas");
    canvas.style.position = "absolute";
    canvas.style.inset = "0";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    container.innerHTML = "";
    container.appendChild(canvas);
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const colorCanvas = document.createElement("canvas");
    const colorCtx = colorCanvas.getContext("2d")!;
    const revealCanvas = document.createElement("canvas");
    const revealCtx = revealCanvas.getContext("2d")!;

    const N = Math.max(16, Math.round(grid));

    let colorImg: HTMLImageElement | null = null;
    let sketchImg: HTMLImageElement | null = null;
    let sdfMap: Float32Array | null = null;
    let sdfW = 1;
    let sdfH = 1;
    let edgeFactor: Float32Array | null = null;
    let insideMask: Float32Array | null = null;
    let ready = false;

    let width = 0;
    let height = 0;
    let rect = { x: 0, y: 0, w: 0, h: 0 };

    const mouse = { x: 0.5, y: 0.5, prevX: 0.5, prevY: 0.5, vX: 0, vY: 0 };
    let pointerOver = false;
    let fade = 0;

    const vel = new Float32Array(N * N * 2);
    const seed = new Float32Array(N * N * 2);
    const mag = introStrength * 10;
    for (let i = 0; i < N * N; i++) {
      seed[2 * i] = (Math.random() * 2 - 1) * mag;
      seed[2 * i + 1] = (Math.random() * 2 - 1) * mag;
    }

    let introStart: number | null = null;
    let slowStart = 0;
    let degraded = false;
    let lastFrameTime = 0;

    const computeRect = () => {
      if (!colorImg) return;
      const cw = width;
      const ch = height;
      if (cw === 0 || ch === 0) return;
      const iw = colorImg.width;
      const ih = colorImg.height;
      const s = Math.min(cw / iw, ch / ih);
      const w = iw * s * fitScale;
      const h = ih * s * fitScale;
      rect = { x: (cw - w) / 2, y: ch - h, w, h };
    };

    const precomputeMasks = () => {
      if (!sdfMap || !colorImg) return;
      const n = N * N;
      edgeFactor = new Float32Array(n);
      insideMask = new Float32Array(n);
      for (let ty = 0; ty < N; ty++) {
        for (let tx = 0; tx < N; tx++) {
          const idx = ty * N + tx;
          const u = (tx + 0.5) / N;
          const vTop = (ty + 0.5) / N;
          const sx = Math.min(sdfW - 1, Math.max(0, Math.floor(u * sdfW)));
          const sy = Math.min(sdfH - 1, Math.max(0, Math.floor(vTop * sdfH)));
          const s = sdfMap[sy * sdfW + sx];
          const sNorm = s / Math.max(sdfH, 1);
          const outer = sNorm <= 0 ? 1 : Math.max(0, 1 - sNorm / Math.max(bandIn, 1e-4));
          const inner = sNorm <= 0 ? 1 : Math.max(0, 1 - sNorm / Math.max(bandOut, 1e-4));
          edgeFactor[idx] = outer * inner;
          insideMask[idx] = smoothstep(0, 0.02, sNorm);
        }
      }
    };

    const handleResize = () => {
      const r = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, pixelRatio);
      width = r.width;
      height = r.height;
      canvas.width = Math.max(1, Math.round(r.width * dpr));
      canvas.height = Math.max(1, Math.round(r.height * dpr));
      canvas.style.width = `${r.width}px`;
      canvas.style.height = `${r.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      colorCanvas.width = canvas.width;
      colorCanvas.height = canvas.height;
      revealCanvas.width = canvas.width;
      revealCanvas.height = canvas.height;
      computeRect();
      if (colorImg) {
        colorCtx.clearRect(0, 0, width, height);
        colorCtx.drawImage(colorImg, rect.x, rect.y, rect.w, rect.h);
      }
    };

    const drawStatic = () => {
      ctx.clearRect(0, 0, width, height);
      if (colorImg) ctx.drawImage(colorImg, rect.x, rect.y, rect.w, rect.h);
    };

    let notifiedReady = false;

    const drawSketchBase = () => {
      const img = sketchImg ?? colorImg;
      if (img) ctx.drawImage(img, rect.x, rect.y, rect.w, rect.h);
    };

    // ── Async asset loading ──
    (async () => {
      try {
        const color = await loadImage(imageSrc);
        if (cancelled) return;
        colorImg = color;

        const scale = Math.min(1, SDF_MAX_DIM / Math.max(color.width, color.height));
        const w = Math.max(1, Math.round(color.width * scale));
        const h = Math.max(1, Math.round(color.height * scale));
        const c = document.createElement("canvas");
        c.width = w;
        c.height = h;
        const sctx = c.getContext("2d", { willReadFrequently: true })!;
        sctx.drawImage(color, 0, 0, w, h);
        const data = sctx.getImageData(0, 0, w, h).data;
        const alpha = new Uint8Array(w * h);
        for (let i = 0; i < w * h; i++) alpha[i] = data[i * 4 + 3];
        sdfMap = buildSdfMap(alpha, w, h);
        sdfW = w;
        sdfH = h;

        if (sketchSrc) sketchImg = await loadImage(sketchSrc);

        computeRect();
        precomputeMasks();
        handleResize();

        if (reducedMotion) {
          drawStatic();
        } else {
          // Quick offscreen benchmark: render one frame to detect slow devices
          // before starting the animation loop. Avoids showing a laggy sketch.
          const benchCanvas = document.createElement("canvas");
          benchCanvas.width = canvas.width;
          benchCanvas.height = canvas.height;
          const benchCtx = benchCanvas.getContext("2d")!;
          const dpr = Math.min(window.devicePixelRatio || 1, pixelRatio);
          benchCtx.setTransform(dpr, 0, 0, dpr, 0, 0);

          const t0 = performance.now();
          if (sketchImg) {
            const iw = sketchImg.width;
            const ih = sketchImg.height;
            const tileW = rect.w / N;
            const tileH = rect.h / N;
            const benchN = Math.min(N, 40);
            for (let ty = 0; ty < benchN; ty++) {
              for (let tx = 0; tx < benchN; tx++) {
                const su = tx / benchN;
                const sv = ty / benchN;
                benchCtx.drawImage(
                  sketchImg,
                  su * iw, sv * ih, iw / benchN, ih / benchN,
                  rect.x + tx * tileW, rect.y + ty * tileH, tileW, tileH,
                );
              }
            }
          }
          const benchDt = performance.now() - t0;

          if (benchDt > SLOW_FRAME_MS) {
            // Too slow — show static color directly, no animation.
            drawStatic();
            if (!notifiedReady) {
              notifiedReady = true;
              onReadyRef.current?.();
            }
          } else {
            ready = true;
            introStart = performance.now();
          }
        }
      } catch {
        if (colorImg) drawStatic();
      }
    })();

    // ── Pointer handling ──
    let cachedRect = container.getBoundingClientRect();
    const onMove = (e: PointerEvent) => {
      cachedRect = container.getBoundingClientRect();
      pointerOver = true;
      const nx = (e.clientX - cachedRect.left) / cachedRect.width;
      const ny = (e.clientY - cachedRect.top) / cachedRect.height;
      mouse.vX = nx - mouse.prevX;
      mouse.vY = ny - mouse.prevY;
      mouse.x = nx;
      mouse.y = ny;
      mouse.prevX = nx;
      mouse.prevY = ny;
    };
    const onLeave = () => {
      pointerOver = false;
      mouse.x = 0;
      mouse.y = 0;
      mouse.prevX = 0;
      mouse.prevY = 0;
      mouse.vX = 0;
      mouse.vY = 0;
    };
    const onDown = () => {
      pointerOver = true;
    };
    const onUp = () => {
      pointerOver = false;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);

    let docVisible = document.visibilityState === "visible";
    let inView = true;
    const onVisibility = () => {
      docVisible = document.visibilityState === "visible";
    };
    document.addEventListener("visibilitychange", onVisibility);

    let io: IntersectionObserver | null = null;
    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver((entries) => {
        inView = entries[0]?.isIntersecting ?? true;
      });
      io.observe(container);
    }

    let ro: ResizeObserver | null = null;
    if (window.ResizeObserver) {
      ro = new ResizeObserver(handleResize);
      ro.observe(container);
    } else {
      window.addEventListener("resize", handleResize);
    }

    handleResize();

    // ── Render loop ──
    let raf = 0;

    const degrade = () => {
      degraded = true;
      cancelAnimationFrame(raf);
      ctx.clearRect(0, 0, width, height);
      if (colorImg) ctx.drawImage(colorImg, rect.x, rect.y, rect.w, rect.h);
      if (!notifiedReady) {
        notifiedReady = true;
        onReadyRef.current?.();
      }
    };

    const render = () => {
      if (!colorImg || !sketchImg || !sdfMap || !edgeFactor || !insideMask) return;

      const cw = width;
      const ch = height;
      const iw = sketchImg.width;
      const ih = sketchImg.height;
      const rw = rect.w;
      const rh = rect.h;
      if (cw === 0 || ch === 0 || rw === 0 || rh === 0) return;

      const vLen = Math.hypot(mouse.vX, mouse.vY);
      const relax = vLen > 1e-4 ? relaxation : 0.3;

      let introRemaining = 0;
      if (introStart !== null) {
        const progress = Math.min(1, (performance.now() - introStart) / (introDuration * 1000));
        introRemaining = 1 - progress;
      }

      // Update velocity field.
      for (let i = 0; i < N * N; i++) {
        vel[2 * i] *= relax;
        vel[2 * i + 1] *= relax;
      }

      const mx = N * Math.max(0, Math.min(1, (mouse.x * cw - rect.x) / rect.w));
      const my = N * Math.max(0, Math.min(1, (mouse.y * ch - rect.y) / rect.h));
      const radius = N * mouseRadius;
      let alongX = 0;
      let alongY = 1;
      if (vLen > 1e-4) {
        alongX = mouse.vX / vLen;
        alongY = mouse.vY / vLen;
      }
      const acrossX = -alongY;
      const acrossY = alongX;
      const rAlong = radius * 0.5;
      const rAcross = radius * stretch;
      for (let y = 0; y < N; y++) {
        for (let x = 0; x < N; x++) {
          const dx = mx - x;
          const dy = my - y;
          let dNormSq;
          if (vLen > 1e-4) {
            const a = dx * alongX + dy * alongY;
            const c = dx * acrossX + dy * acrossY;
            dNormSq = (a * a) / (rAlong * rAlong) + (c * c) / (rAcross * rAcross);
          } else {
            dNormSq = (dx * dx + dy * dy) / (radius * radius);
          }
          if (dNormSq < 1) {
            const idx = 2 * (x + N * y);
            const falloff = Math.min(1 / Math.max(Math.sqrt(dNormSq), 0.1), 10);
            vel[idx] += 100 * strength * mouse.vX * falloff;
            vel[idx + 1] += 100 * strength * mouse.vY * falloff;
          }
        }
      }

      if (introRemaining > 0) {
        for (let i = 0; i < N * N; i++) {
          vel[2 * i] = seed[2 * i] * introRemaining;
          vel[2 * i + 1] = seed[2 * i + 1] * introRemaining;
        }
      }

      ctx.clearRect(0, 0, cw, ch);

      // Tile overlap in CSS px to eliminate hairline seams.
      const tileW = rw / N;
      const tileH = rh / N;
      const bleed = 1;
      const srcBleedX = (bleed / tileW) * (iw / N);
      const srcBleedY = (bleed / tileH) * (ih / N);

      // After intro, draw undisplaced sketch as one full image first,
      // then only redraw cells with active gating on top.
      const canBaseOptimize = introRemaining < 0.01;

      if (canBaseOptimize) {
        drawSketchBase();
      }

      for (let ty = 0; ty < N; ty++) {
        for (let tx = 0; tx < N; tx++) {
          const idx = ty * N + tx;
          const gating = Math.max(edgeFactor[idx], introRemaining * insideMask[idx]);

          if (canBaseOptimize && gating < 0.001) continue;

          const vx = vel[2 * idx];
          const vy = vel[2 * idx + 1];
          const du = smudgeScale * vx * gating;
          const dv = smudgeScale * vy * gating;

          const su = tx / N;
          const sv = ty / N;
          const srcX = Math.max(0, (su - du) * iw - srcBleedX);
          const srcY = Math.max(0, (sv - dv) * ih - srcBleedY);
          const srcW = iw / N + 2 * srcBleedX;
          const srcH = ih / N + 2 * srcBleedY;
          const dx = rect.x + tx * tileW - bleed;
          const dy = rect.y + ty * tileH - bleed;
          ctx.drawImage(sketchImg, srcX, srcY, srcW, srcH, dx, dy, tileW + 2 * bleed, tileH + 2 * bleed);
        }
      }

      // Color reveal spotlight following the cursor.
      const targetFade = pointerOver ? 1 : 0;
      const rate = targetFade > fade ? 8 : 3;
      fade += (targetFade - fade) * Math.min(1, 0.016 * rate);

      if (fade > 0.001) {
        const revealRadius = 0.34 * Math.min(cw, ch);
        const px = mouse.x * cw;
        const py = mouse.y * ch;
        revealCtx.globalCompositeOperation = "source-over";
        revealCtx.clearRect(0, 0, cw, ch);
        revealCtx.drawImage(colorCanvas, 0, 0);
        revealCtx.globalCompositeOperation = "destination-in";
        const g = revealCtx.createRadialGradient(px, py, 0, px, py, revealRadius);
        g.addColorStop(0, `rgba(0,0,0,${fade})`);
        g.addColorStop(1, "rgba(0,0,0,0)");
        revealCtx.fillStyle = g;
        revealCtx.fillRect(0, 0, cw, ch);
        revealCtx.globalCompositeOperation = "source-over";
        ctx.drawImage(revealCanvas, 0, 0);
      }
    };

    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (!ready || reducedMotion || degraded) return;
      if (!docVisible || !inView) return;

      const now = performance.now();
      if (lastFrameTime > 0) {
        const dt = now - lastFrameTime;
        if (dt > SLOW_FRAME_MS) {
          if (slowStart === 0) slowStart = now;
          if (now - slowStart >= SLOW_FRAME_BUDGET_MS) {
            degrade();
            return;
          }
        } else {
          slowStart = 0;
        }
      }
      lastFrameTime = now;

      render();
      if (!notifiedReady) {
        notifiedReady = true;
        onReadyRef.current?.();
      }
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("visibilitychange", onVisibility);
      if (io) io.disconnect();
      if (ro) ro.disconnect();
      else window.removeEventListener("resize", handleResize);
    };
  }, [imageSrc, sketchSrc, grid, mouseRadius, strength, relaxation, smudgeScale, fitScale, bandIn, bandOut, stretch, introDuration, introStrength, pixelRatio, reducedMotion]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0"
      style={{ width: "100%", height: "100%", minWidth: 0, minHeight: 0, bottom: 0, right: 0 }}
    />
  );
}
