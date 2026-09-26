"use client";

import { useEffect, useState, useTransition } from "react";
import { Heart, Pipette } from "lucide-react";

import { rgbToHex } from "@/_utils/rgbToHex";
import { favoriteAction } from "@/lib/action";

function PaletteSection({ palette, paletteId, initialIsFavorite = false }) {
  const [copied, setCopied] = useState(null);
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);
  const [error, setError] = useState(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setIsFavorite(initialIsFavorite);
  }, [initialIsFavorite, paletteId]);

  if (!palette) {
    return null;
  }
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
  const handleFavorite = () => {
    if (!paletteId || isPending) {
      return;
    }
    setError(null);
    startTransition(async () => {
      try {
        const result = await favoriteAction(paletteId);
        if (!result?.success) {
          setError(result?.error || "Impossible de modifier les favoris.");

          return;
        }
        setIsFavorite(result.isFavorite);
      } catch (error) {
        console.error("Favorite error:", error);

        setError("Une erreur est survenue.");
      }
    });

    console.log("paletteId envoyé :", paletteId);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-lg font-semibold">Dominant Palette</h2>
      </div>

      {/* Error message */}
      {error && (
        <p role="alert" className="text-sm text-red-500">
          {error}
        </p>
      )}

      {/* Palette */}

      <div className="flex items-center justify-center gap-4 overflow-x-auto md:overflow-visible p-4">
        {/* Favorite Button */}

        {Object.entries(palette).map(([name, swatch]) => {
          const [r, g, b] = swatch.rgb;
          const hex = rgbToHex(r, g, b);

          return (
            <div key={name} className="shrink-0">
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
                {/* Copy Button */}
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
                  <Pipette
                    size={14}
                    strokeWidth={2}
                    className="md:w-4 md:h-4"
                  />
                </button>

                {/* HEX */}
                <span className="text-xs text-white bg-black/40 px-1 rounded">
                  {copied === name ? "Copié !" : hex}
                </span>
              </div>
            </div>
          );
        })}
        <button
          type="button"
          onClick={handleFavorite}
          disabled={isPending || !paletteId}
          className={`
            flex items-center justify-center
            w-14 h-14
            rounded-full
            border
            transition-all duration-200

            ${
              isFavorite
                ? "bg-red-50 border-red-200 text-red-500"
                : "bg-white border-gray-200 text-gray-500 hover:text-red-500 hover:border-red-200 hover:bg-red-50"
            }

            ${isPending ? "opacity-50 cursor-wait" : "active:scale-95"}

            disabled:cursor-not-allowed
          `}
          aria-label={
            isFavorite
              ? "Retirer la palette des favoris"
              : "Ajouter la palette aux favoris"
          }
          title={
            isPending
              ? "Modification en cours..."
              : isFavorite
              ? "Retirer des favoris"
              : "Ajouter aux favoris"
          }
        >
          <Heart
            size={30}
            strokeWidth={2}
            fill={isFavorite ? "currentColor" : "none"}
          />
        </button>
      </div>
    </div>
  );
}

export default PaletteSection;
