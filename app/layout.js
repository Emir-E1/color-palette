import { Montserrat } from "next/font/google";
import "./globals.css";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body
        className={`${montserrat.variable} min-h-screen  bg-background text-foreground overflow-hidden`}
      >
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <SidebarTrigger />
            {children}
          </SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  );
}
