"use client";

import ImageUploadSection from "@/components/ImageUploadSection";
import PaletteSection from "@/components/PaletteSection";
import { useImageContext } from "@/context/ImageContext";

function ColorScanSection() {
  const { palette, paletteId, setPalette, setPaletteId } = useImageContext();

  return (
    <section className="p-0 flex flex-col gap-2 md:gap-4">
      <ImageUploadSection setPalette={setPalette} setPaletteId={setPaletteId} />

      {palette && <PaletteSection palette={palette} paletteId={paletteId} />}
    </section>
  );
}

export default ColorScanSection;
