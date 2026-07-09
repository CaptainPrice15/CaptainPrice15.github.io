// @disable-react-compiler
"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

/**
 * HeroAvatarCanvas (WebGL)
 * Liquid-glass avatar: initials + rotating conic-gradient ring baked into a
 * texture, warped by a flowing noise distortion shader with a mouse-driven
 * specular highlight + tilt. Kept in its own module so `three` is code-split.
 */

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;
  uniform sampler2D uTex;
  uniform float uTime;
  uniform vec2 uMouse;
  varying vec2 vUv;

  // Ashima 2D simplex noise
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }
  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
    m = m * m; m = m * m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vec2 uv = vUv;
    float n = snoise(uv * 2.5 + uTime * 0.15);
    float n2 = snoise(uv * 4.0 - uTime * 0.1);
    vec2 disp = vec2(n, n2) * 0.02;
    vec2 suv = uv + disp;

    vec4 tex = texture2D(uTex, suv);

    float d = distance(uv, vec2(0.5));
    float rim = smoothstep(0.40, 0.5, d) * (1.0 - smoothstep(0.5, 0.52, d));
    vec3 rimColor = vec3(0.15, 0.6, 1.0);

    vec2 hl = vec2(0.5) + uMouse * 0.15;
    float spec = smoothstep(0.34, 0.0, distance(uv, hl)) * 0.22;

    vec3 color = tex.rgb + rim * rimColor * 0.7 + spec;
    gl_FragColor = vec4(color, tex.a);
  }
`;

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
  const meshRef = useRef<THREE.Mesh>(null);
  const mouseRef = useRef(new THREE.Vector2(0, 0));
  const texture = useMemo(() => makeAvatarTexture(initials), [initials]);

  const uniforms = useMemo(
    () => ({
      uTex: { value: texture },
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
    }),
    [texture]
  );

  useEffect(() => () => texture.dispose(), [texture]);

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

  useFrame((state) => {
    uniforms.uTime.value = state.clock.elapsedTime;
    uniforms.uMouse.value.lerp(mouseRef.current, 0.08);
    if (meshRef.current) {
      const targetX = mouseRef.current.y * 0.3;
      const targetY = mouseRef.current.x * 0.3;
      meshRef.current.rotation.x += (targetX - meshRef.current.rotation.x) * 0.08;
      meshRef.current.rotation.y += (targetY - meshRef.current.rotation.y) * 0.08;
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2.4, 2.4]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}

export function HeroAvatarCanvas({ initials }: { initials: string }) {
  return (
    <Canvas
      gl={{ alpha: true, antialias: true }}
      dpr={[1, 2]}
      camera={{ position: [0, 0, 4], fov: 45 }}
      style={{ width: "100%", height: "100%" }}
    >
      <AvatarMesh initials={initials} />
    </Canvas>
  );
}
