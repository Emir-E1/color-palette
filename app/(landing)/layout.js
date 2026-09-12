import NavBar from "@/components/NavBar";

export default function Landinglayout({ children }) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-marketing">
      {/* Premium background */}
      <div className="pointer-events-none fixed inset-0 z-0">
        {/* Soft pink glow */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(
                circle at 50% 0%,
                rgba(255, 255, 255, 0.9) 0%,
                rgba(255, 255, 255, 0.45) 20%,
                transparent 55%
              )
            `,
          }}
        />

        {/* Grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(
                rgba(214, 45, 126, 0.13) 1px,
                transparent 1px
              ),
              linear-gradient(
                90deg,
                rgba(214, 45, 126, 0.13) 1px,
                transparent 1px
              )
            `,
            backgroundSize: "48px 48px",
            maskImage:
              "radial-gradient(ellipse 80% 70% at 50% 20%, black 20%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 70% at 50% 20%, black 20%, transparent 100%)",
          }}
        />

        {/* Bottom fade */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(
                to bottom,
                transparent 55%,
                rgba(240, 204, 239, 0.8) 100%
              )
            `,
          }}
        />
      </div>

      {/* Content */}
      <div className="w-full relative z-10">{children}</div>
    </div>
  );
}
