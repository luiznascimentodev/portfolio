import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const title =
    searchParams.get("title") ?? "Luiz Felippe — Desenvolvedor Full Stack";
  const description =
    searchParams.get("description") ??
    "Portfolio e blog de desenvolvimento web";
  const type = searchParams.get("type") ?? "website"; // "website" | "post"

  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        backgroundColor: "#0a0a0a",
        padding: "60px 72px",
        fontFamily: "sans-serif",
        position: "relative",
      }}
    >
      {/* Background accent */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            "radial-gradient(ellipse at 20% 50%, rgba(16,185,129,0.15) 0%, transparent 60%)",
        }}
      />

      {/* Top bar accent */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "4px",
          background: "linear-gradient(90deg, #10b981, #34d399)",
        }}
      />

      {/* Content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
          zIndex: 1,
        }}
      >
        {/* Badge */}
        {type === "post" && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "rgba(16,185,129,0.15)",
              border: "1px solid rgba(16,185,129,0.3)",
              borderRadius: "8px",
              padding: "6px 16px",
              width: "fit-content",
              color: "#10b981",
              fontSize: "16px",
              fontWeight: 600,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            Blog Post
          </div>
        )}

        {/* Title */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            flex: 1,
            justifyContent: "center",
          }}
        >
          <div
            style={{
              fontSize: title.length > 50 ? "44px" : "56px",
              fontWeight: 800,
              color: "#f9fafb",
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              maxWidth: "860px",
            }}
          >
            {title}
          </div>
          {description && (
            <div
              style={{
                fontSize: "22px",
                color: "#9ca3af",
                lineHeight: 1.5,
                maxWidth: "760px",
              }}
            >
              {description.length > 120
                ? description.slice(0, 117) + "..."
                : description}
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <div
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "50%",
                backgroundColor: "#10b981",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "18px",
                fontWeight: 700,
                color: "#fff",
              }}
            >
              LF
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "2px",
              }}
            >
              <span
                style={{
                  fontSize: "18px",
                  fontWeight: 600,
                  color: "#f3f4f6",
                }}
              >
                Luiz Felippe
              </span>
              <span style={{ fontSize: "14px", color: "#6b7280" }}>
                Desenvolvedor Full Stack
              </span>
            </div>
          </div>

          <div
            style={{
              fontSize: "18px",
              color: "#10b981",
              fontWeight: 600,
              letterSpacing: "-0.01em",
            }}
          >
            luifelippe.dev
          </div>
        </div>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
    },
  );
}
