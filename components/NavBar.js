import Link from "next/link";
import Logo from "./Logo";
const links = [
  { label: "Features", href: "#features" },
  { label: "About the World", href: "#about" },
  { label: "Pricing", href: "#pricing" },
];

export default function NavBar() {
  return (
    <nav className="hidden md:flex fixed top-4 z-50  w-full justify-center px-4">
      <div className="relative flex w-full max-w-6xl items-center justify-between rounded-full px-6 py-3 shadow-lg backdrop-blur-md">
        <Link href="/">
          <Logo />
        </Link>

        <div className="absolute left-1/2 -translate-x-1/2 flex gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-foreground hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="text-sm font-medium text-foreground hover:text-primary"
          >
            Login
          </Link>

          <Link
            href="/dashboard"
            className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-white"
          >
            Get Started for Free
          </Link>
        </div>
      </div>
    </nav>
  );
}
