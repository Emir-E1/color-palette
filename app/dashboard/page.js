import ColorScanSection from "@/components/ColorScanSection";
import ImageUploadSection from "@/components/ImageUploadSection";
import PageHeader from "@/components/PageHeader";
import PaletteSection from "@/components/PaletteSection";

function page() {
  return (
    <div className="p-4  flex flex-col ">
      <PageHeader
        title={"Extrcat colors from your image"}
        description={"Upload an image and discover the dominant colors"}
      />
      <ColorScanSection />
    </div>
  );
}

export default page;
