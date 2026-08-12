"use client";

import { useState } from "react";
import ImageUploadSection from "@/components/ImageUploadSection";
import PaletteSection from "@/components/PaletteSection";
import { useImageContext } from "@/context/ImageContext";

function ColorScanSection() {
  const { palette, setPalette } = useImageContext();

  return (
    <section className="p-0 flex flex-col gap-2 md:gap-4 ">
      <ImageUploadSection setPalette={setPalette} />
      {palette && <PaletteSection palette={palette} />}
    </section>
  );
}

export default ColorScanSection;
