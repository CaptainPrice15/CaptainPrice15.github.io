// @disable-react-compiler
"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

function makeAvatarTexture(initials: string) {
  const size = 512;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const cx = size / 2;
  const r = size / 2 - 8;

  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cx, r - 16, 0, Math.PI * 2);
  ctx.clip();
  const grad = ctx.createRadialGradient(cx, cx, 0, cx, cx, r);
  grad.addColorStop(0, "rgba(255,255,255,0.10)");
  grad.addColorStop(1, "rgba(120,130,160,0.18)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);
  ctx.restore();

  ctx.fillStyle = "rgba(255,255,255,0.95)";
  ctx.font = "bold 150px system-ui, -apple-system, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(initials, cx, cx + 6);

  const ring = ctx.createConicGradient(0, cx, cx);
  ring.addColorStop(0, "#2563eb");
  ring.addColorStop(0.33, "#7c3aed");
  ring.addColorStop(0.66, "#ec4899");
  ring.addColorStop(1, "#2563eb");
  ctx.strokeStyle = ring;
  ctx.lineWidth = 12;
  ctx.beginPath();
  ctx.arc(cx, cx, r - 6, 0, Math.PI * 2);
  ctx.stroke();

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

function AvatarMesh({ initials }: { initials: string }) {
  const groupRef = useRef<THREE.Group>(null);
  const mouseRef = useRef(new THREE.Vector2(0, 0));
  const texture = useMemo(() => makeAvatarTexture(initials), [initials]);
  const sphereGeo = useMemo(() => new THREE.SphereGeometry(1, 32, 32), []);
  const planeGeo = useMemo(() => new THREE.PlaneGeometry(1.6, 1.6), []);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setIsMobile(
      window.matchMedia("(max-width: 768px), (pointer: coarse)").matches
    );
  }, []);

  useEffect(() => () => {
    sphereGeo.dispose();
    planeGeo.dispose();
    texture.dispose();
  }, [sphereGeo, planeGeo, texture]);

  useEffect(() => {
    let rafId: number;
    let lastX = 0;
    let lastY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -((e.clientY / window.innerHeight) * 2 - 1);
      if (Math.abs(nx - lastX) > 0.02 || Math.abs(ny - lastY) > 0.02) {
        lastX = nx;
        lastY = ny;
        cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
          mouseRef.current.set(nx, ny);
        });
      }
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  useFrame(() => {
    if (groupRef.current) {
      const targetX = mouseRef.current.y * 0.4;
      const targetY = mouseRef.current.x * 0.4;
      groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.08;
      groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.08;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <primitive object={sphereGeo} />
        {isMobile ? (
          <meshPhysicalMaterial
            transmission={0.6}
            thickness={0.5}
            roughness={0.25}
            metalness={0.05}
            ior={1.4}
            clearcoat={0.15}
            transparent
            opacity={0.96}
          />
        ) : (
          <MeshTransmissionMaterial
            backside
            backsideThickness={0.2}
            thickness={0.5}
            roughness={0.08}
            metalness={0.02}
            distortion={0.6}
            distortionScale={0.4}
            temporalDistortion={0.12}
            clearcoat={0.15}
            envMapIntensity={1.5}
            transparent
            opacity={0.96}
            samples={4}
          />
        )}
      </mesh>
      <mesh position={[0, 0, -0.15]}>
        <primitive object={planeGeo} />
        <meshBasicMaterial map={texture} transparent depthWrite={false} />
      </mesh>

      <ambientLight intensity={0.8} />
      <directionalLight position={[3, 4, 5]} intensity={1.2} />
      <directionalLight position={[-3, -2, -4]} intensity={0.5} color="#a5b4fc" />
    </group>
  );
}

export function HeroAvatarCanvas({ initials }: { initials: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [frameloop, setFrameloop] = useState<"always" | "never">("always");

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let inView = true;
    let pageVisible = !document.hidden;
    const update = () =>
      setFrameloop(inView && pageVisible ? "always" : "never");

    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        update();
      },
      { threshold: 0.05 }
    );
    io.observe(el);

    const onVisibility = () => {
      pageVisible = !document.hidden;
      update();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div ref={containerRef} style={{ width: "100%", height: "100%", contain: "layout paint" }}>
      <Canvas
        frameloop={frameloop}
        gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
        dpr={[1, 1.25]}
        camera={{ position: [0, 0, 3.8], fov: 45 }}
        style={{ width: "100%", height: "100%" }}
      >
        <AvatarMesh initials={initials} />
      </Canvas>
    </div>
  );
}
