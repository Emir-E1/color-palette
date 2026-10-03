import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import Header from "@/components/Header";

import { auth } from "@/lib/auth";

export default async function DashboardLayout({ children }) {
  const session = await auth();

  return (
    <SidebarProvider style={{ "--sidebar-width": "18rem" }}>
      <AppSidebar session={session} />
      <SidebarInset className="relative bg-stone-50">
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(
                  rgba(214, 45, 126, 0.12) 1px,
                  transparent 1px
                ),
                linear-gradient(
                  90deg,
                  rgba(214, 45, 126, 0.12) 1px,
                  transparent 1px
                )
              `,
              backgroundSize: "48px 48px",
              maskImage:
                "radial-gradient(circle at 50% 15%, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 50%, transparent 85%)",
              WebkitMaskImage:
                "radial-gradient(circle at 50% 15%, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 50%, transparent 85%)",
            }}
          />
        </div>

        <div className="relative z-10 flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
