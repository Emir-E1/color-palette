import { Download, Image, Palette, Pipette } from "lucide-react";

const features = [
  {
    icon: Image,
    title: "Ai Color Extraction",
    description:
      "Upload any image and instantly discover its most dominant colorsovpefr pkfpk pkfpp",
  },
  {
    icon: Palette,
    title: "Pixel Perfect Picking",
    description:
      "Generate balanced and beautiful palettes ready to use in your projects.",
  },
  {
    icon: Pipette,
    title: "Pick your colors",
    description:
      "Fine-tune your palette and pick the exact colors you want to keep.",
  },
  {
    icon: Download,
    title: "Export in seconds",
    description:
      "Download your palette and take your colors wherever your workflow goes.",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="flex w-full flex-col gap-14 px-6 py-24 lg:px-12"
    >
      {/* Header */}
      <div className="flex w-full justify-center">
        <div className="flex max-w-2xl flex-col gap-5 text-center">
          <h1 className="text-h1 font-bold leading-tight text-foreground">
            Everything you need to find{" "}
            <span className="text-primary">the perfect color</span>
          </h1>

          <p className="text-body leading-relaxed text-secondary">
            Powerful features designed to simplify your creative workflow.
          </p>
        </div>
      </div>

      {/* Features */}
      <div className="flex w-full justify-center px-2 sm:px-6">
        <div className="grid w-full  grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <article
                key={feature.title}
                className="flex h-full w-full flex-col rounded-2xl bg-marketing border border-secondary/20 p-6"
              >
                {/* Icon */}
                <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Icon className="size-5 text-primary" />
                </div>

                {/* Content */}
                <div className="mt-6 flex flex-1 flex-col gap-3">
                  <h2 className="text-h3 font-semibold text-foreground">
                    {feature.title}
                  </h2>

                  <p className="text-body leading-relaxed text-secondary">
                    {feature.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
