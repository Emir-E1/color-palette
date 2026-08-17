import Link from "next/link";
import Logo from "./Logo";

const colors = [
  "#d32d5a",
  "#e04b72",
  "#ed6f91",
  "#f39bb3",
  "#c52d63",
  "#b23b76",
  "#d45c91",
  "#e98ab0",
  "#9e3b78",
  "#c45a91",
  "#e277a7",
  "#f0aac2",
];

export default function Footer() {
  return (
    <footer className="bg-primary/5  p-6 lg:px-12">
      <div className="grid w-full grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
        {/* Left */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-[auto_1fr] sm:items-center">
          <div className="flex">
            <Logo />
          </div>

          <div className="flex max-w-xl flex-col gap-5">
            <h2 className="text-h2 font-bold leading-tight text-foreground">
              Ready to discover amazing colors?
            </h2>

            <p className="text-body leading-relaxed text-secondary">
              Join thousands of creators who use Palette every day.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/signup"
                className="rounded-full bg-primary px-6 py-3 font-medium text-white"
              >
                Get Started Free
              </Link>

              <Link
                href="#features"
                className="rounded-full border border-secondary/20 px-6 py-3 font-medium text-foreground"
              >
                Explore Features
              </Link>
            </div>
          </div>
        </div>

        {/* Color blocks */}
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
          {colors.map((color, index) => (
            <div
              key={index}
              className="h-20 rounded-2xl sm:h-24"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>
    </footer>
  );
}
