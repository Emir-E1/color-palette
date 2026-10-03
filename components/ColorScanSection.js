"use client";

import ImageUploadSection from "@/components/ImageUploadSection";
import PaletteSection from "@/components/PaletteSection";
import { useImageContext } from "@/context/ImageContext";

function ColorScanSection() {
  const { palette, paletteId, setPalette, setPaletteId } = useImageContext();

  return (
    <section className="flex flex-col gap-8 rounded-3xl border border-stone-200 bg-white p-5 shadow-sm md:p-8">
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-semibold tracking-tight">
          1. Upload an image
        </h2>
        <p className="text-sm text-stone-500">
          PNG or JPG. We will find the colors that appear the most.
        </p>
      </div>

      <ImageUploadSection setPalette={setPalette} setPaletteId={setPaletteId} />

      {palette && (
        <div className="border-t border-stone-200 pt-8">
          <PaletteSection palette={palette} paletteId={paletteId} />
        </div>
      )}
    </section>
  );
}

export default ColorScanSection;
