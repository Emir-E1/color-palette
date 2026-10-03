"use client";

import { useEffect, useState, useTransition } from "react";
import { Check, Copy, Heart } from "lucide-react";

import { rgbToHex } from "@/_utils/rgbToHex";
import { favoriteAction } from "@/lib/action";

// Lisible sur n'importe quelle couleur : icône sombre sur fond clair, claire sur fond foncé
const isLight = ([r, g, b]) => (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.6;

function PaletteSection({
  palette,
  paletteId,
  initialIsFavorite = false,
  title = "Dominant palette",
  showFavorite = true,
}) {
  const [copied, setCopied] = useState(null);
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);
  const [error, setError] = useState(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setIsFavorite(initialIsFavorite);
  }, [initialIsFavorite, paletteId]);

  if (!palette) return null;

  const swatches = Object.entries(palette);

  const handleCopy = async (hex, name) => {
    try {
      await navigator.clipboard.writeText(hex);
      setCopied(name);
      setTimeout(() => setCopied(null), 1500);
    } catch (error) {
      console.error("Impossible de copier la couleur :", error);
    }
  };

  const handleFavorite = () => {
    if (!paletteId || isPending) return;
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
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-col gap-0.5">
          <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
          <p className="text-sm text-stone-500">
            Click a color to copy its hex code.
          </p>
        </div>

        {showFavorite && (
          <button
            type="button"
            onClick={handleFavorite}
            disabled={isPending || !paletteId}
            aria-pressed={isFavorite}
            className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition
              focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-900
              disabled:cursor-not-allowed disabled:opacity-50
              ${
                isFavorite
                  ? "border-red-200 bg-red-50 text-red-600"
                  : "border-stone-300 bg-white text-stone-700 hover:border-stone-400 hover:bg-stone-50"
              }`}
          >
            <Heart size={16} fill={isFavorite ? "currentColor" : "none"} />
            {isPending ? "Saving…" : isFavorite ? "Saved" : "Save palette"}
          </button>
        )}
      </div>

      {error && (
        <p
          role="alert"
          className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600"
        >
          {error}
        </p>
      )}

      {/* Les couleurs forment une seule bande : c'est l'élément fort de la page */}
      <div className="flex w-full">
        {swatches.map(([name, swatch], i) => {
          const [r, g, b] = swatch.rgb;
          const hex = rgbToHex(r, g, b);
          const light = isLight(swatch.rgb);
          const isCopied = copied === name;
          const radius =
            (i === 0 ? "rounded-l-2xl " : "") +
            (i === swatches.length - 1 ? "rounded-r-2xl" : "");

          return (
            <button
              key={name}
              type="button"
              onClick={() => handleCopy(hex, name)}
              aria-label={`Copy ${hex}`}
              className="group flex min-w-0 flex-1 flex-col gap-2 focus-visible:outline-none"
            >
              <span
                className={`flex h-32 items-start justify-end p-2 transition-[flex-grow] md:h-48 md:p-3
                  group-focus-visible:ring-2 group-focus-visible:ring-stone-900 group-focus-visible:ring-inset ${radius}`}
                style={{ backgroundColor: `rgb(${r}, ${g}, ${b})` }}
              >
                <span
                  className={`rounded-full p-1.5 opacity-0 transition group-hover:opacity-100 group-focus-visible:opacity-100 ${
                    isCopied ? "opacity-100" : ""
                  } ${
                    light
                      ? "bg-black/10 text-black/70"
                      : "bg-white/20 text-white"
                  }`}
                >
                  {isCopied ? <Check size={14} /> : <Copy size={14} />}
                </span>
              </span>
              <span className="truncate text-center text-xs font-medium tabular-nums text-stone-600 md:text-sm">
                {isCopied ? "Copied" : hex}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default PaletteSection;
