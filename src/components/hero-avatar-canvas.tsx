// @disable-react-compiler
"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, MeshTransmissionMaterial } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
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
  const sphereGeo = useMemo(() => new THREE.SphereGeometry(1, 48, 48), []);
  const planeGeo = useMemo(() => new THREE.PlaneGeometry(1.6, 1.6), []);

  useEffect(() => () => {
    sphereGeo.dispose();
    planeGeo.dispose();
    texture.dispose();
  }, [sphereGeo, planeGeo, texture]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.set(
        (e.clientX / window.innerWidth) * 2 - 1,
        -((e.clientY / window.innerHeight) * 2 - 1)
      );
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
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
        />
      </mesh>
      <mesh position={[0, 0, -0.15]}>
        <primitive object={planeGeo} />
        <meshBasicMaterial map={texture} transparent depthWrite={false} />
      </mesh>
      <Environment preset="city" />
    </group>
  );
}

export function HeroAvatarCanvas({ initials }: { initials: string }) {
  return (
    <Canvas
      gl={{ alpha: true, antialias: true }}
      dpr={[1, 2]}
      camera={{ position: [0, 0, 3.8], fov: 45 }}
      style={{ width: "100%", height: "100%" }}
    >
      <AvatarMesh initials={initials} />
    </Canvas>
  );
}
