import ColorScanSection from "@/components/ColorScanSection";

import PageHeader from "@/components/PageHeader";

function page() {
  return (
    <div className="p-4 flex flex-col gap-10">
      <PageHeader
        title={"Extrcat colors from your image"}
        description={"Upload an image and discover the dominant colors"}
      />
      <ColorScanSection />
    </div>
  );
}

export default page;
