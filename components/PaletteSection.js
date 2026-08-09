import { useState } from "react";
import { Pipette } from "lucide-react";
import { rgbToHex } from "@/_utils/rgbToHex";

function PaletteSection({ palette }) {
  const [copied, setCopied] = useState(null);

  if (!palette) return null;

  const handleCopy = async (hex, name) => {
    try {
      await navigator.clipboard.writeText(hex);
      setCopied(name);

      setTimeout(() => {
        setCopied(null);
      }, 1500);
    } catch (error) {
      console.error("Impossible de copier la couleur :", error);
    }
  };

  return (
    <div className="flex items-center justify-center gap-4 overflow-scroll md:overflow-auto p-4">
      {Object.entries(palette).map(([name, swatch]) => {
        const [r, g, b] = swatch.rgb;
        const hex = rgbToHex(r, g, b);

        return (
          <div key={name} className="">
            <div
              className="relative w-20 h-20 md:w-30 md:h-30 rounded-full flex items-end p-2"
              style={{
                backgroundColor: `rgb(${r}, ${g}, ${b})`,
                boxShadow: `
                  0 12px 24px -4px rgba(0,0,0,0.15),
                  0 6px 12px -4px rgba(0,0,0,0.1),
                  inset 0 1px 1px rgba(255,255,255,0.4)
                `,
              }}
            >
              <button
                type="button"
                onClick={() => handleCopy(hex, name)}
                className="
                  absolute top-2 right-2
                  flex items-center justify-center
                  w-7 h-7 md:w-8 md:h-8
                  rounded-full
                  bg-white/80 backdrop-blur-sm
                  text-black/70
                  shadow-sm
                  transition-all duration-200
                  hover:bg-white hover:text-black hover:scale-105
                  active:scale-95
                "
                aria-label={`Copier ${hex}`}
                title={copied === name ? "Copié !" : `Copier ${hex}`}
              >
                <Pipette size={14} strokeWidth={2} className="md:w-4 md:h-4" />
              </button>

              <span className="text-xs text-white bg-black/40 px-1 rounded">
                {copied === name ? "Copié !" : hex}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default PaletteSection;
