import { Star, UserRound } from "lucide-react";

const testimonials = [
  {
    comment:
      "Palette has become an essential part of my design workflow. It saved me so much time finding the right color combination.",
    name: "Emily R.",
    role: "UX Designer",
  },
  {
    comment:
      "I can go from an image to a complete color palette in seconds. It is simple, fast, and incredibly useful for my projects.",
    name: "James K.",
    role: "Brand Designer",
  },
  {
    comment:
      "The color extraction is surprisingly accurate. I use Palette almost every day when starting a new creative project.",
    name: "Sophia M.",
    role: "Creative Director",
  },
];

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="flex w-full flex-col gap-14 px-6 py-24 lg:px-12"
    >
      {/* Header */}
      <div className="flex w-full justify-center">
        <div className="flex max-w-2xl flex-col gap-5 text-center">
          <h1 className="text-h1 font-bold leading-tight text-foreground">
            Loved by <span className="text-primary">Creatives</span>
          </h1>

          <p className="text-body leading-relaxed text-secondary">
            See what our users have to say about palettes.
          </p>
        </div>
      </div>

      {/* Testimonials */}
      <div className="flex w-full justify-center px-2 sm:px-6">
        <div className="grid w-full max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.name}
              className="flex h-full w-full flex-col rounded-2xl border border-secondary/20 p-6"
            >
              {/* Stars */}
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    className="size-5 fill-primary text-primary"
                  />
                ))}
              </div>

              {/* Comment */}
              <p className="mt-6 flex-1 text-body leading-relaxed text-secondary">
                “{testimonial.comment}”
              </p>

              {/* Profile */}
              <div className="mt-8 flex items-center gap-4">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <UserRound className="size-5 text-primary" />
                </div>

                <div className="flex flex-col gap-1">
                  <h3 className="font-semibold text-foreground">
                    {testimonial.name}
                  </h3>

                  <p className="text-sm text-secondary">{testimonial.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
