"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { cn } from "@/lib/utils";

/**
 * SkillConstellation
 * Renders skills as floating nodes in a force-directed graph using Canvas 2D.
 * Nodes drift gently; hover to highlight cluster connections.
 */

interface SkillNode {
  id: string;
  label: string;
  category: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
}

const SKILLS_DATA = [
  { id: "dotnet", label: ".NET", category: "Backend" },
  { id: "csharp", label: "C#", category: "Backend" },
  { id: "aspnet", label: "ASP.NET", category: "Backend" },
  { id: "rest", label: "REST APIs", category: "Backend" },
  { id: "sql", label: "SQL Server", category: "Database" },
  { id: "mongo", label: "MongoDB", category: "Database" },
  { id: "python", label: "Python", category: "Automation" },
  { id: "powershell", label: "PowerShell", category: "Automation" },
  { id: "automate", label: "Power Automate", category: "Automation" },
  { id: "ai", label: "AI Agents", category: "AI" },
  { id: "elk", label: "ELK Stack", category: "Monitoring" },
  { id: "kibana", label: "Kibana", category: "Monitoring" },
  { id: "win", label: "Windows", category: "Tools" },
  { id: "linux", label: "Linux", category: "Tools" },
  { id: "git", label: "Git", category: "Tools" },
  { id: "next", label: "Next.js", category: "Frontend" },
  { id: "android", label: "Android", category: "Mobile" }
];

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

const CONNECTIONS: [string, string][] = [
  ["dotnet", "csharp"],
  ["csharp", "aspnet"],
  ["aspnet", "rest"],
  ["sql", "mongo"],
  ["python", "powershell"],
  ["python", "automate"],
  ["elk", "kibana"],
  ["win", "linux"],
  ["linux", "git"],
  ["dotnet", "sql"],
  ["python", "elk"],
  ["next", "rest"],
  ["android", "csharp"]
];

export function SkillConstellation({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const nodesRef = useRef<SkillNode[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const rafRef = useRef<number>(0);

  const initNodes = useCallback((width: number, height: number) => {
    return SKILLS_DATA.map((skill, i) => {
      const angle = (i / SKILLS_DATA.length) * Math.PI * 2;
      const dist = 120 + Math.random() * 80;
      return {
        ...skill,
        x: width / 2 + Math.cos(angle) * dist,
        y: height / 2 + Math.sin(angle) * dist + 100,
        vx: 0,
        vy: 0,
        radius: 30 + skill.label.length * 2,
        color: CATEGORY_COLORS[skill.category] || "#94a3b8",
      };
    });
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio, 1.5);
    let w = 0;
    let h = 0;

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);
      nodesRef.current = initNodes(w, h);
    };

    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - rect.left) * dpr,
        y: (e.clientY - rect.top) * dpr,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
      setHoveredNode(null);
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    let frame = 0;
    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);

      const nodes = nodesRef.current;
      const mouse = mouseRef.current;

      // Find hovered node
      let hovering: string | null = null;

      nodes.forEach((node) => {
        // Apply slight drift
        node.vx += (Math.random() - 0.5) * 0.01;
        node.vy += (Math.random() - 0.5) * 0.01;
        node.vx *= 0.98;
        node.vy *= 0.98;
        node.x += node.vx;
        node.y += node.vy;

        // Center attraction
        const dx = w / 2 - node.x;
        const dy = h / 2 - node.y;
        node.vx += dx * 0.0001;
        node.vy += dy * 0.0001;

        // Mouse repulsion
        const mdx = node.x - mouse.x / dpr;
        const mdy = node.y - mouse.y / dpr;
        const dist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (dist < 150) {
          const force = (150 - dist) / 150;
          node.vx += (mdx / dist) * force * 0.5;
          node.vy += (mdy / dist) * force * 0.5;
          hovering = node.id;
        }

        // Keep within bounds
        if (node.x < 50) node.vx += 0.05;
        if (node.x > w - 50) node.vx -= 0.05;
        if (node.y < 50) node.vy += 0.05;
        if (node.y > h - 50) node.vy -= 0.05;
      });

      // Draw connections
      ctx.save();
      ctx.lineWidth = 0.5;
      CONNECTIONS.forEach(([a, b]) => {
        const nodeA = nodes.find((n) => n.id === a);
        const nodeB = nodes.find((n) => n.id === b);
        if (!nodeA || !nodeB) return;

        const isHighlighted =
          hovering === nodeA.id || hovering === nodeB.id;

        ctx!.beginPath();
        ctx!.moveTo(nodeA.x, nodeA.y);
        ctx!.lineTo(nodeB.x, nodeB.y);
        ctx!.strokeStyle = isHighlighted
          ? "rgba(255,255,255,0.3)"
          : "rgba(255,255,255,0.06)";
        ctx!.lineWidth = isHighlighted ? 1 : 0.5;
        ctx!.stroke();
      });
      ctx.restore();

      // Draw nodes
      nodes.forEach((node) => {
        const isHovered = hovering === node.id;
        const r = isHovered ? node.radius * 1.2 : node.radius;

        // Glow
        const glow = ctx!.createRadialGradient(
          node.x,
          node.y,
          0,
          node.x,
          node.y,
          r * 2
        );
        glow.addColorStop(0, `${node.color}33`);
        glow.addColorStop(1, "transparent");
        ctx!.fillStyle = glow;
        ctx!.fillRect(node.x - r * 2, node.y - r * 2, r * 4, r * 4);

        // Circle
        ctx!.beginPath();
        ctx!.arc(node.x, node.y, r, 0, Math.PI * 2);
        ctx!.fillStyle = isHovered ? node.color : `${node.color}CC`;
        ctx!.fill();

        // Border
        ctx!.strokeStyle = isHovered
          ? "rgba(255,255,255,0.8)"
          : "rgba(255,255,255,0.2)";
        ctx!.lineWidth = isHovered ? 2 : 1;
        ctx!.stroke();

        // Label
        ctx!.fillStyle = "#fff";
        ctx!.font = `${isHovered ? "bold " : ""}12px system-ui, sans-serif`;
        ctx!.textAlign = "center";
        ctx!.textBaseline = "middle";
        ctx!.fillText(node.label, node.x, node.y);
      });

      // Draw tooltip
      if (hovering) {
        const node = nodes.find((n) => n.id === hovering);
        if (node) {
          setHoveredNode(hovering);
          // Draw tooltip on canvas
          const text = `${node.label} — ${node.category}`;
          ctx!.font = "13px system-ui, sans-serif";
          const textWidth = ctx!.measureText(text).width;
          const padding = 10;
          const tooltipX = node.x + node.radius + 10;
          const tooltipY = node.y - 20;

          ctx!.fillStyle = "rgba(15, 23, 42, 0.9)";
          ctx!.beginPath();
          ctx!.roundRect(
            tooltipX - padding,
            tooltipY - padding,
            textWidth + padding * 2,
            24 + padding * 2,
            6
          );
          ctx!.fill();

          ctx!.fillStyle = "#f1f5f9";
          ctx!.fillText(text, tooltipX + textWidth / 2, tooltipY + 12);
        }
      } else {
        setHoveredNode(null);
      }

      frame++;
      rafRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [initNodes, prefersReducedMotion]);

  if (prefersReducedMotion) {
    return (
      <div className={cn("grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3", className)}>
        {SKILLS_DATA.map((skill) => (
          <div
            key={skill.id}
            className="px-3 py-2 rounded-lg text-sm font-medium text-center"
            style={{
              background: `${CATEGORY_COLORS[skill.category]}22`,
              border: `1px solid ${CATEGORY_COLORS[skill.category]}44`,
            }}
          >
            {skill.label}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={cn("relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden glass", className)}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full cursor-crosshair"
      />
    </div>
  );
}
