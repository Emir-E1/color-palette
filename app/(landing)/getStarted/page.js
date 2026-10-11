import Affiliate from "@/components/Affiliate";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonial";
import NavBar from "@/components/NavBar";
import { connectDB } from "@/db/mongodb";
import PaletteRoulette from "@/components/PaletteRoulette";
import Palette from "@/db/models/Palette";
export default async function Page() {
  await connectDB();
  const palettes = await Palette.aggregate([{ $sample: { size: 5 } }]);
  const colors = palettes.map(({ colors }) => colors);
  return (
    <div className="w-full flex flex-col justify-center gap-8">
      <NavBar />

      <Hero />
      {/*  <Affiliate />*/}
      <PaletteRoulette palettes={colors} />
      <Features />
      <HowItWorks />
      <Testimonials />
      <Footer />
    </div>
  );
}
