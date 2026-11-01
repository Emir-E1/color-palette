import { Montserrat } from "next/font/google";
import "./globals.css";

export const metadata = {
  title: {
    default: "ColorScan",
    template: "%s | ColorScan",
  },
  description: "Extract dominant colors from your images.",
  icons: {
    icon: "/assets/Logo_2.png",
  },
};

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className={`${montserrat.variable} min-h-screen text-foreground`}>
        {children}
      </body>
    </html>
  );
}
