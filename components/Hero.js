import Image from "next/image";
import Link from "next/link";
import mockup from "@/public/mockup.png";

export default function Hero() {
  return (
    <section className="mx-auto grid min-h-screen grid-cols-1 items-center gap-16 px-10 py-16  lg:grid-cols-[0.9fr_1fr]">
      {/* Colonne Texte */}
      <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
        <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-7xl">
          Extract{" "}
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            beautiful color palettes
          </span>{" "}
          from any image.
        </h1>

        <p className="mt-6 max-w-lg text-base text-secondary sm:text-lg">
          Upload an image and instantly discover the dominant colors. Perfect
          for designers, developers, and creators.
        </p>

        {/* Boutons */}
        <div className="mt-8 flex w-full flex-col justify-center gap-4 sm:w-auto sm:flex-row lg:justify-start">
          <Link
            href="/dashboard"
            className="rounded-md bg-primary px-7 py-3.5 text-center text-base font-medium text-white transition-opacity hover:opacity-90"
          >
            Get Started Free
          </Link>

          <Link
            href="#how-it-works"
            className="rounded-md border border-secondary/20 px-7 py-3.5 text-center text-base font-medium text-foreground transition-colors hover:bg-secondary/10"
          >
            See How It Works
          </Link>
        </div>

        {/* Réassurance */}
        <div className="mt-8 flex flex-wrap justify-center gap-6 text-xs text-secondary sm:text-sm lg:justify-start">
          <span>✓ Free to start</span>
          <span>✓ No credit card</span>
          <span>✓ Export in seconds</span>
        </div>
      </div>

      {/* Colonne Image */}
      <div className="flex w-full items-center justify-center">
        <Image
          src={mockup}
          alt="Color palette generator mockup"
          priority
          className="h-auto w-full max-w-4xl object-contain drop-shadow-2xl"
        />
      </div>
    </section>
  );
}
