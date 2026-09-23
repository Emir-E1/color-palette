import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import Header from "@/components/Header";

import { auth } from "@/lib/auth";

export default async function DashboardLayout({ children }) {
  const session = await auth();

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background">
      <div className="pointer-events-none fixed inset-0 z-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(61, 61, 61, 0.1) 1.5px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
        />

        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 55% 35% at 50% -5%, rgba(211, 45, 90, 0.06), transparent 65%)",
          }}
        />
      </div>

      <div className="relative z-10 w-full">
        <SidebarProvider>
          <AppSidebar session={session} />

          <SidebarInset style={{ backgroundColor: "transparent" }}>
            <Header />
            {children}
          </SidebarInset>
        </SidebarProvider>
      </div>
    </div>
  );
}
