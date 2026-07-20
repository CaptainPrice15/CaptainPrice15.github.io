// @disable-react-compiler
"use client";

import { useEffect, useMemo, useRef, useState, type RefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, OrbitControls } from "@react-three/drei";
import { useTheme } from "next-themes";
import * as THREE from "three";
import { cn } from "@/lib/utils";
import { SKILLS_DATA, CONNECTIONS } from "./skill-data";

const RADIUS = 1.7;
const NODE_GEOMETRY = new THREE.SphereGeometry(0.085, 12, 12);

function fibonacciSphere(i: number, n: number): THREE.Vector3 {
  const phi = Math.acos(1 - (2 * (i + 0.5)) / n);
  const theta = Math.PI * (1 + Math.sqrt(5)) * i;
  return new THREE.Vector3(
    RADIUS * Math.sin(phi) * Math.cos(theta),
    RADIUS * Math.cos(phi),
    RADIUS * Math.sin(phi) * Math.sin(theta)
  );
}

function SkillGraph3D() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const lineRef = useRef<THREE.LineSegments>(null);
  const hoveredGroupRef = useRef<THREE.Group>(null);
  const occluderRef = useRef<THREE.Mesh>(null);
  const labelRefs = useRef<(THREE.Group | null)[]>([]);
  const [hovered, setHovered] = useState<number | null>(null);
  const { resolvedTheme } = useTheme();
  const isLight = resolvedTheme === "light";

  const positions = useRef<THREE.Vector3[]>([]);
  const velocities = useRef<THREE.Vector3[]>([]);
  const lineColorAttr = useRef<THREE.BufferAttribute | null>(null);

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const baseColor = useMemo(() => new THREE.Color(), []);
  const highlightColor = useMemo(() => new THREE.Color("#ffffff"), []);

  const linePositions = useMemo(
    () => new Float32Array(CONNECTIONS.length * 2 * 3),
    []
  );
  const lineColors = useMemo(() => {
    const arr = new Float32Array(CONNECTIONS.length * 2 * 3);
    for (let i = 0; i < CONNECTIONS.length; i++) {
      baseColor.set("#94a3b8");
      for (let k = 0; k < 2; k++) {
        const o = (i * 2 + k) * 3;
        arr[o] = baseColor.r;
        arr[o + 1] = baseColor.g;
        arr[o + 2] = baseColor.b;
      }
    }
    return arr;
  }, [baseColor]);

  useEffect(() => {
    positions.current = SKILLS_DATA.map((_, i) =>
      fibonacciSphere(i, SKILLS_DATA.length)
    );
    velocities.current = SKILLS_DATA.map(() => new THREE.Vector3());

    const mesh = meshRef.current;
    if (mesh) {
      SKILLS_DATA.forEach((n, i) => {
        mesh.setColorAt(i, new THREE.Color(n.color));
      });
      if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    }
  }, []);

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05);
    const pos = positions.current;
    const vel = velocities.current;
    const n = pos.length;
    if (n === 0) return;

    for (let i = 0; i < n; i++) {
      const pi = pos[i];
      const vi = vel[i];

      for (let j = i + 1; j < n; j++) {
        const dx = pi.x - pos[j].x;
        const dy = pi.y - pos[j].y;
        const dz = pi.z - pos[j].z;
        const distSq = dx * dx + dy * dy + dz * dz;
        const dist = Math.sqrt(distSq) || 0.0001;
        if (dist < 1.2) {
          const force = (1.2 - dist) * 0.02 / dist;
          const fx = dx * force;
          const fy = dy * force;
          const fz = dz * force;
          vi.x += fx;
          vi.y += fy;
          vi.z += fz;
          vel[j].x -= fx;
          vel[j].y -= fy;
          vel[j].z -= fz;
        }
      }

      CONNECTIONS.forEach(([a, b]) => {
        if (a !== i && b !== i) return;
        const other = pos[a === i ? b : a];
        const dx = other.x - pi.x;
        const dy = other.y - pi.y;
        const dz = other.z - pi.z;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz) || 0.0001;
        const force = (dist - 1.1) * 0.01 / dist;
        vi.x += dx * force;
        vi.y += dy * force;
        vi.z += dz * force;
      });

      const r = pi.length() || 0.0001;
      const sphereForce = (RADIUS - r) * 0.015 / r;
      vi.x += pi.x * sphereForce;
      vi.y += pi.y * sphereForce;
      vi.z += pi.z * sphereForce;
    }

    for (let i = 0; i < n; i++) {
      vel[i].multiplyScalar(0.86);
      pos[i].x += vel[i].x * dt * 6;
      pos[i].y += vel[i].y * dt * 6;
      pos[i].z += vel[i].z * dt * 6;
    }

    const mesh = meshRef.current;
    if (mesh) {
      for (let i = 0; i < n; i++) {
        const scale = hovered === i ? 1.9 : 1;
        dummy.position.copy(pos[i]);
        dummy.scale.setScalar(scale);
        dummy.updateMatrix();
        mesh.setMatrixAt(i, dummy.matrix);
      }
      mesh.instanceMatrix.needsUpdate = true;
    }

    const line = lineRef.current;
    if (line) {
      for (let c = 0; c < CONNECTIONS.length; c++) {
        const [a, b] = CONNECTIONS[c];
        const o = c * 6;
        linePositions[o] = pos[a].x;
        linePositions[o + 1] = pos[a].y;
        linePositions[o + 2] = pos[a].z;
        linePositions[o + 3] = pos[b].x;
        linePositions[o + 4] = pos[b].y;
        linePositions[o + 5] = pos[b].z;

        const isHot = hovered === a || hovered === b;
        for (let k = 0; k < 2; k++) {
          const co = (c * 2 + k) * 3;
          const col = isHot ? highlightColor : baseColor.set("#94a3b8");
          lineColors[co] = col.r;
          lineColors[co + 1] = col.g;
          lineColors[co + 2] = col.b;
        }
      }
      const geo = line.geometry;
      (geo.getAttribute("position") as THREE.BufferAttribute).needsUpdate = true;
      if (lineColorAttr.current) lineColorAttr.current.needsUpdate = true;
    }

    for (let i = 0; i < n; i++) {
      const g = labelRefs.current[i];
      if (g) {
        g.position.x = pos[i].x * 1.12;
        g.position.y = pos[i].y * 1.12;
        g.position.z = pos[i].z * 1.12;
      }
    }

    if (hovered != null && hoveredGroupRef.current) {
      hoveredGroupRef.current.position.copy(pos[hovered]);
    }
  });

  const hoveredData = hovered != null ? SKILLS_DATA[hovered] : null;

  return (
    <group>
      <instancedMesh
        ref={meshRef}
        args={[NODE_GEOMETRY, undefined, SKILLS_DATA.length]}
        onPointerMove={(e) => {
          e.stopPropagation();
          if (e.instanceId != null) setHovered(e.instanceId);
        }}
        onPointerDown={(e) => {
          e.stopPropagation();
          if (e.instanceId != null) setHovered(e.instanceId);
        }}
        onPointerOut={() => setHovered(null)}
      >
        <meshStandardMaterial toneMapped={false} metalness={0.3} roughness={0.4} />
      </instancedMesh>

      <lineSegments ref={lineRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[lineColors, 3]}
            ref={lineColorAttr}
          />
        </bufferGeometry>
        <lineBasicMaterial vertexColors transparent opacity={0.5} toneMapped={false} />
      </lineSegments>

      {SKILLS_DATA.map((node, i) => (
        <group
          key={node.id}
          ref={(el) => {
            labelRefs.current[i] = el;
          }}
        >
          <Html center distanceFactor={9} zIndexRange={[5, 0]} occlude={[occluderRef as RefObject<THREE.Object3D>]} style={{ pointerEvents: "none" }}>
            <div
              className={cn(
                "flex items-center gap-1.5 whitespace-nowrap rounded-md px-2 py-0.5 text-[11px] font-medium transition-colors",
                hovered === i
                  ? isLight
                    ? "bg-slate-900 text-white shadow-md ring-1 ring-white/20"
                    : "bg-slate-100 text-slate-900 shadow-md ring-1 ring-black/10"
                  : isLight
                    ? "bg-slate-900/80 text-slate-100"
                    : "bg-slate-900/60 text-slate-200"
              )}
            >
              <span
                className="h-2 w-2 rounded-full shrink-0"
                style={{ background: node.color }}
              />
              <span>{node.label}</span>
            </div>
          </Html>
        </group>
      ))}

      {hovered != null && hoveredData && (
        <group ref={hoveredGroupRef}>
          <Html center distanceFactor={8} zIndexRange={[10, 0]}>
            <div className="px-3 py-1.5 rounded-lg bg-slate-900/90 text-slate-100 text-xs font-medium whitespace-nowrap shadow-lg border border-white/10 pointer-events-none -translate-y-10">
              {hoveredData.label}
              <span className="block text-[10px] text-slate-400 font-normal">
                {hoveredData.category}
              </span>
            </div>
          </Html>
        </group>
      )}

      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 5, 3]} intensity={1.1} />
      <directionalLight position={[-4, -2, -3]} intensity={0.5} color="#a5b4fc" />

      {/* Invisible raycast-only sphere used to occlude (hide) labels on the
          far side of the constellation. Writes no color/depth. */}
      <mesh ref={occluderRef}>
        <sphereGeometry args={[1.6, 16, 16]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} colorWrite={false} />
      </mesh>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.6}
        rotateSpeed={0.5}
      />
    </group>
  );
}

export function SkillGraphCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [frameloop, setFrameloop] = useState<"always" | "never">("always");

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setFrameloop(entry.isIntersecting ? "always" : "never"),
      { threshold: 0.05 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full" style={{ contain: "layout paint" }}>
      <Canvas
        frameloop={frameloop}
        camera={{ position: [0, 0, 4.6], fov: 50 }}
        dpr={[1, 1.25]}
        gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
        style={{ touchAction: "pan-y" }}
      >
        <SkillGraph3D />
      </Canvas>
    </div>
  );
}
