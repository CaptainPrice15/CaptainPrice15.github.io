"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { cn } from "@/lib/utils";
import { skills } from "@/data/skills";

const CATEGORY_LABELS: Record<string, string> = {
  backend: "Backend",
  database: "Database",
  automation: "Automation",
  ai: "AI",
  monitoring: "Monitoring",
  tools: "Tools",
  mobile: "Mobile",
  frontend: "Frontend",
};

const CATEGORY_COLORS: Record<string, string> = {
  Backend: "#3b82f6",
  Database: "#8b5cf6",
  Automation: "#10b981",
  AI: "#f59e0b",
  Monitoring: "#ef4444",
  Tools: "#6b7280",
  Frontend: "#ec4899",
  Mobile: "#00bcd4",
};

interface RadarData {
  category: string;
  value: number;
  color: string;
}

function computeCategoryProficiency(): RadarData[] {
  const entries = Object.entries(skills);
  const categories = entries.map(([key, skills]) => {
    const label = CATEGORY_LABELS[key] ?? key;
    const count = skills.length;
    return {
      category: label,
      value: Math.min(100, count * 10 + 30),
      color: CATEGORY_COLORS[label] || "#94a3b8",
    };
  });
  return categories;
}

export function TechRadar({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const animationRef = useRef<number | null>(null);
  const rotationRef = useRef(0);
  const dataRef = useRef<RadarData[]>([]);

  useEffect(() => {
    dataRef.current = computeCategoryProficiency();
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const animate = () => {
      const w = canvas.width;
      const h = canvas.height;
      const centerX = w / 2;
      const centerY = h / 2;
      const radius = Math.min(w, h) * 0.4;

      ctx.clearRect(0, 0, w, h);
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate((rotationRef.current * Math.PI) / 180);

      const data = dataRef.current;
      const angleStep = (Math.PI * 2) / data.length;

      ctx.beginPath();
      for (let i = 0; i <= 5; i++) {
        const r = (radius * i) / 5;
        ctx.moveTo(r, 0);
        ctx.arc(0, 0, r, 0, Math.PI * 2);
      }
      ctx.strokeStyle = "rgba(148, 163, 184, 0.15)";
      ctx.lineWidth = 1;
      ctx.stroke();

      for (let i = 0; i < data.length; i++) {
        const angle = i * angleStep - Math.PI / 2;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
        ctx.strokeStyle = "rgba(148, 163, 184, 0.1)";
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.font = "11px system-ui, sans-serif";
        ctx.fillStyle = "#94a3b8";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        const labelX = Math.cos(angle) * (radius + 20);
        const labelY = Math.sin(angle) * (radius + 20);
        ctx.fillText(data[i].category, labelX, labelY);
      }

      ctx.beginPath();
      data.forEach((d, i) => {
        const angle = i * angleStep - Math.PI / 2;
        const r = (d.value / 100) * radius;
        const x = Math.cos(angle) * r;
        const y = Math.sin(angle) * r;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.closePath();

      const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, radius);
      gradient.addColorStop(0, "rgba(37, 99, 235, 0.3)");
      gradient.addColorStop(1, "rgba(37, 99, 235, 0.05)");
      ctx.fillStyle = gradient;
      ctx.fill();

      ctx.strokeStyle = "#2563eb";
      ctx.lineWidth = 2;
      ctx.stroke();

      data.forEach((d, i) => {
        const angle = i * angleStep - Math.PI / 2;
        const r = (d.value / 100) * radius;
        const x = Math.cos(angle) * r;
        const y = Math.sin(angle) * r;

        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fillStyle = d.color;
        ctx.fill();
        ctx.strokeStyle = "#fff";
        ctx.lineWidth = 2;
        ctx.stroke();
      });

      ctx.restore();
      rotationRef.current = (rotationRef.current + 0.15) % 360;
      animationRef.current = requestAnimationFrame(animate);
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 1.5);
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
    };

    resize();
    window.addEventListener("resize", resize);
    animate();

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) {
    return (
      <div className={cn("grid grid-cols-2 sm:grid-cols-4 gap-3", className)}>
        {computeCategoryProficiency().map((d) => (
          <div
            key={d.category}
            className="p-4 rounded-xl text-center"
            style={{
              background: `${d.color}15`,
              border: `1px solid ${d.color}33`,
            }}
          >
            <div className="font-bold text-lg" style={{ color: d.color }}>
              {d.value}%
            </div>
            <div className="text-xs text-muted-foreground">{d.category}</div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={cn("relative w-full aspect-square max-w-[400px] mx-auto", className)}>
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ display: "block" }}
      />
    </div>
  );
}