import { CloudUpload, Palette, Download } from "lucide-react";

const steps = [
  {
    order: 1,
    icon: CloudUpload,
    title: "Upload an image",
    description:
      "Drag and drop or upload any image in JPG, PNG, or WebP format.",
  },
  {
    order: 2,
    icon: Palette,
    title: "Generate your palette",
    description:
      "Let our AI analyze your image and generate a beautiful color palette.",
  },
  {
    order: 3,
    icon: Download,
    title: "Export your colors",
    description:
      "Download your palette and use your colors anywhere in your creative workflow.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="flex w-full flex-col gap-14 px-6 py-4 lg:px-12"
    >
      {/* Header */}
      <div className="flex w-full justify-center">
        <div className="flex max-w-2xl flex-col gap-5 text-center">
          <h1 className="text-h1 font-bold leading-tight text-foreground">
            How It <span className="text-primary">Works</span>
          </h1>

          <p className="text-body leading-relaxed text-secondary">
            Get your color palette in 3 simple steps.
          </p>
        </div>
      </div>

      {/* Steps */}
      <div className="flex w-full justify-center px-2 sm:px-6">
        <div className="relative w-full">
          {/* Desktop connector */}
          <svg
            className="pointer-events-none absolute inset-x-0 top-1/2 z-0 hidden h-24 w-full -translate-y-1/2 lg:block"
            viewBox="0 0 1000 100"
            preserveAspectRatio="none"
            fill="none"
          >
            <path
              d="M 250 50 C 300 0, 370 0, 420 50 S 540 100, 580 50 S 700 0, 750 50"
              stroke="var(--primary)"
              strokeWidth="2"
              strokeDasharray="8 8"
              strokeLinecap="round"
              opacity="0.35"
            />
          </svg>

          <div className="relative z-10 grid w-full grid-cols-1 gap-6 lg:grid-cols-3">
            {steps.map((step) => {
              const Icon = step.icon;

              return (
                <article
                  key={step.order}
                  className="relative flex w-full items-start gap-5 rounded-2xl p-6"
                >
                  {/* Step number */}
                  <div className="absolute -left-1 -top-1 flex size-9 items-center justify-center rounded-full bg-primary text-sm font-bold text-white shadow-[0_0_18px_var(--primary)]">
                    {step.order}
                  </div>

                  {/* Icon */}
                  <div className="flex size-16 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Icon className="size-7 text-primary" />
                  </div>

                  {/* Content */}
                  <div className="flex flex-col gap-3">
                    <h3 className="text-h3 font-semibold text-foreground">
                      {step.title}
                    </h3>

                    <p className="text-body leading-relaxed text-secondary">
                      {step.description}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
