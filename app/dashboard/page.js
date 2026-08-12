import ColorPickSection from "@/components/ColorPickSection";
import ColorScanSection from "@/components/ColorScanSection";

import PageHeader from "@/components/PageHeader";
import { ImageContextProvider } from "@/context/ImageContext";

function page() {
  return (
    <div className="p-4 flex flex-col gap-10">
      <PageHeader
        title={"Extrcat colors from your image"}
        description={"Upload an image and discover the dominant colors"}
      />
      <ImageContextProvider>
        <ColorScanSection />
        <ColorPickSection />
      </ImageContextProvider>
    </div>
  );
}

export default page;
