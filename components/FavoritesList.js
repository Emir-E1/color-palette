"use client";

import { useTransition } from "react";
import { favoriteAction } from "@/lib/action";

export default function FavoritesList({ favorites }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = (paletteId) => {
    if (isPending) return;

    startTransition(async () => {
      const result = await favoriteAction(paletteId);

      if (!result?.success) {
        console.error(result?.error || "Unable to delete favorite.");
        return;
      }
    });
  };

  return (
    <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {favorites.map((palette) => (
        <div
          key={palette._id}
          className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm"
        >
          {/* Palette colors */}
          <div className="flex h-32 overflow-hidden rounded-xl">
            {palette.colors.map((color, index) => (
              <div
                key={`${palette._id}-${index}`}
                className="flex-1"
                style={{
                  backgroundColor: color,
                }}
              />
            ))}
          </div>

          {/* Palette information */}
          <div className="mt-4">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold">
                Palette #{palette._id.slice(-6)}
              </h2>

              <button
                type="button"
                onClick={() => handleDelete(palette._id)}
                disabled={isPending}
                className="text-red-500 hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isPending ? "Deleting..." : "Delete"}
              </button>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {palette.colors.map((color, index) => (
                <span
                  key={`${color}-${index}`}
                  className="rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-600"
                >
                  {color}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
