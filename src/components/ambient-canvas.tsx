// @disable-react-compiler
"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useLenis } from "@/components/smooth-scroll";

/**
 * AmbientCanvas (WebGL)
 * Living, mouse-reactive field rendered with a full-screen fragment shader.
 * Kept in its own module so the heavy `three` bundle is code-split and only
 * loaded when this canvas actually mounts (see `ambient-background.tsx`).
 */

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uMouse;
  uniform float uHue;
  varying vec2 vUv;

  vec3 hsl2rgb(vec3 c) {
    vec3 rgb = clamp(abs(mod(c.x * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
    return c.z + c.y * (rgb - 0.5) * (1.0 - abs(2.0 * c.z - 1.0));
  }

  void main() {
    float aspect = uResolution.x / max(uResolution.y, 1.0);
    vec2 p = vec2((vUv.x - 0.5) * aspect, vUv.y - 0.5);

    vec3 col = vec3(0.0);
    float alpha = 0.0;

    for (int i = 0; i < 5; i++) {
      float fi = float(i);
      vec2 center = vec2(
        0.5 + 0.18 * sin(uTime * 0.08 + fi * 1.3),
        0.5 + 0.18 * cos(uTime * 0.06 + fi * 2.1)
      );
      float pf = fi < 2.0 ? 0.02 : (fi < 4.0 ? 0.04 : 0.08);
      center += uMouse * pf;
      vec2 c = vec2((center.x - 0.5) * aspect, center.y - 0.5);

      float baseR = 0.0;
      float a = 0.0;
      float hueOff = 0.0;
      if (i == 0) { baseR = 0.38; a = 0.03; hueOff = 0.0; }
      else if (i == 1) { baseR = 0.42; a = 0.025; hueOff = -15.0; }
      else if (i == 2) { baseR = 0.30; a = 0.06; hueOff = 10.0; }
      else if (i == 3) { baseR = 0.34; a = 0.05; hueOff = -5.0; }
      else { baseR = 0.22; a = 0.04; hueOff = 25.0; }

      float pulse = 0.03 * sin(uTime * 0.5 + fi);
      float r = baseR + pulse;
      float d = distance(p, c);
      float strength = smoothstep(r, 0.0, d) * a;

      alpha += strength;
      col += hsl2rgb(vec3((uHue + hueOff) / 360.0, 0.72, 0.58)) * strength;
    }

    gl_FragColor = vec4(col, clamp(alpha, 0.0, 1.0));
  }
`;

function BlobField() {
  const { size } = useThree();
  const { progress } = useLenis();
  const mouseRef = useRef(new THREE.Vector2(0, 0));
  const progressRef = useRef(progress);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(1, 1) },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uHue: { value: 200 },
    }),
    []
  );

  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -((e.clientY / window.innerHeight) * 2 - 1);
      mouseRef.current.set(nx, ny);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    uniforms.uResolution.value.set(size.width, size.height);
  }, [size, uniforms]);

  useFrame((state) => {
    uniforms.uTime.value = state.clock.elapsedTime;
    uniforms.uMouse.value.copy(mouseRef.current);
    uniforms.uHue.value = 200 + (progressRef.current ?? 0) * 95;
  });

  return (
    <mesh frustumCulled={false}>
      <planeGeometry args={[2, 2]} />
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

export function AmbientCanvas() {
  return (
    <Canvas
      gl={{ alpha: true, antialias: false, powerPreference: "low-power" }}
      dpr={[1, 1.5]}
      style={{ width: "100%", height: "100%" }}
    >
      <BlobField />
    </Canvas>
  );
}
