import ColorPickSection from "@/components/ColorPickSection";
import ColorScanSection from "@/components/ColorScanSection";
import PageHeader from "@/components/PageHeader";
import { ImageContextProvider } from "@/context/ImageContext";

function page() {
  return (
    <div className="flex w-full flex-col gap-10 px-4 py-6 md:px-8 md:py-10 lg:px-12">
      <PageHeader
        title="Extract colors from your image"
        description="Upload an image and discover its dominant colors. Then drag the dots to pick exact colors yourself."
      />
      <ImageContextProvider>
        <ColorScanSection />
        <ColorPickSection />
      </ImageContextProvider>
    </div>
  );
}

export default page;
