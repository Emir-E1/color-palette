import Affiliate from "@/components/Affiliate";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonial";

export default function Page() {
  return (
    <div className="w-full flex flex-col justify-center gap-8">
      <Hero />
      {/*  <Affiliate />*/}
      <Features />
      <HowItWorks />
      <Testimonials />
      <Footer />
    </div>
  );
}
