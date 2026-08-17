import { Montserrat } from "next/font/google";
import "./globals.css";

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
