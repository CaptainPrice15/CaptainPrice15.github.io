import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  // react-three-fiber uses imperative useFrame mutations (uniforms, refs) that
  // conflict with React Compiler's strict react-hooks rules. These WebGL canvas
  // modules are opted out of the compiler and these rules; everything else
  // (including their thin dynamic wrappers) stays strict.
  {
    files: [
      "src/components/ambient-canvas.tsx",
      "src/components/hero-avatar-canvas.tsx",
      "src/components/sections/skill-graph-canvas.tsx",
    ],
    rules: {
      "react-hooks/immutability": "off",
      "react-hooks/refs": "off",
      "react-hooks/set-state-in-effect": "off",
    },
  },
]);

export default eslintConfig;
