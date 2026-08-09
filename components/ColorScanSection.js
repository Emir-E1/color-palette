"use client";

import { useState } from "react";
import ImageUploadSection from "@/components/ImageUploadSection";
import PaletteSection from "@/components/PaletteSection";

function ColorScanSection() {
  const [palette, setPalette] = useState(null);

  return (
    <>
      <ImageUploadSection onPaletteReady={setPalette} setPalette={setPalette} />
      {palette && <PaletteSection palette={palette} />}
    </>
  );
}

export default ColorScanSection;
