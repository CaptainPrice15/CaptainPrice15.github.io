import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export const alt = "Gourab Das — Software Engineer & Android Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #020617 0%, #0f172a 100%)",
          color: "#f1f5f9",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
            marginBottom: 24,
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 9999,
              background: "#10b981",
            }}
          />
          <div style={{ fontSize: 28, color: "#94a3b8", letterSpacing: 4 }}>
            SOFTWARE ENGINEER &amp; ANDROID DEVELOPER
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 96,
            fontWeight: 700,
            background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
            backgroundClip: "text",
            color: "transparent",
            marginBottom: 20,
          }}
        >
          Gourab Das
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 34,
            color: "#94a3b8",
          }}
        >
          Building reliable systems, Android apps &amp; modern web experiences
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: 8,
            background: "linear-gradient(90deg, #2563eb, #7c3aed, #ec4899)",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
