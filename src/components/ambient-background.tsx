"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { useLenis } from "@/components/smooth-scroll";

/**
 * AmbientBackground
 * A living, mouse-reactive canvas with 3D depth layers.
 * Foreground blobs move faster (closer), background blobs move slower (farther).
 * Scroll progress shifts the global hue from cool blue → violet so the page
 * feels different as you travel down.
 */
export function AmbientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { progress } = useLenis();
  const progressRef = useRef(progress);

  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    let mouseX = 0;
    let mouseY = 0;

    const blobs = [
      // Background layer (slow, subtle)
      { x: 0.3, y: 0.4, r: 400, alpha: 0.03, speed: 0.00015, parallaxFactor: 0.005, pulseAmp: 30, pulseSpeed: 0.0005, hueOffset: 0 },
      { x: 0.7, y: 0.6, r: 450, alpha: 0.025, speed: 0.00012, parallaxFactor: -0.005, pulseAmp: 25, pulseSpeed: 0.0004, hueOffset: -15 },
      // Mid layer
      { x: 0.2, y: 0.3, r: 300, alpha: 0.06, speed: 0.0003, parallaxFactor: 0.02, pulseAmp: 20, pulseSpeed: 0.0007, hueOffset: 10 },
      { x: 0.8, y: 0.7, r: 350, alpha: 0.05, speed: 0.00025, parallaxFactor: -0.02, pulseAmp: 18, pulseSpeed: 0.0006, hueOffset: -5 },
      // Foreground layer (fast, responsive)
      { x: 0.5, y: 0.5, r: 200, alpha: 0.04, speed: 0.0004, parallaxFactor: 0.04, pulseAmp: 15, pulseSpeed: 0.0008, hueOffset: 25 },
    ];

    let time = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 1.5);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const draw = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      ctx.clearRect(0, 0, width, height);

      const p = progressRef.current;
      // 200° (cool teal/blue) → 295° (violet) over the course of the page.
      const hueBase = 200 + p * 95;

      blobs.forEach((blob) => {
        const driftX =
          Math.sin(time * blob.speed * 1000) * 50 +
          (mouseX - width / 2) * blob.parallaxFactor;
        const driftY =
          Math.cos(time * blob.speed * 1000) * 40 +
          (mouseY - height / 2) * blob.parallaxFactor * 0.8;

        const pulse = Math.sin(time * blob.pulseSpeed) * blob.pulseAmp;

        const cx = blob.x * width + driftX;
        const cy = blob.y * height + driftY;
        const radius = blob.r + pulse;

        const hue = hueBase + blob.hueOffset;
        const color = `hsla(${hue}, 72%, 58%, ${blob.alpha})`;

        const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
        gradient.addColorStop(0, color);
        gradient.addColorStop(1, "rgba(0,0,0,0)");

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      });

      time += 16;
      raf = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: -1, width: "100%", height: "100%" }}
    />
  );
}
