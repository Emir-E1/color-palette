"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, History, Heart, Settings } from "lucide-react";

import Logo from "./Logo";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";

const navItems = [
  { title: "Home", url: "/dashboard", icon: Home },
  { title: "History", url: "/history", icon: History },
  { title: "Favorites", url: "/dashboard/favorite", icon: Heart },
  { title: "Settings", url: "/settings", icon: Settings },
];

function AppSidebar({ session }) {
  const pathname = usePathname();
  const name = session?.user?.name;
  const isActive = (url) =>
    url === "/dashboard" ? pathname === url : pathname.startsWith(url);

  return (
    <Sidebar>
      <SidebarHeader className="px-6 pt-10 pb-8">
        <Link
          href="/dashboard"
          aria-label="Go to dashboard"
          className="flex w-full items-center justify-center rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-stone-900"
        >
          <div className="origin-center scale-125">
            <Logo />
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1.5">
              {navItems.map(({ title, url, icon: Icon }) => (
                <SidebarMenuItem key={title}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(url)}
                    tooltip={title}
                    className="h-12 rounded-xl px-4 text-stone-600 hover:bg-stone-100 hover:text-stone-900 data-[active=true]:bg-stone-900 data-[active=true]:text-white"
                  >
                    <Link href={url} className="flex items-center gap-3.5">
                      <Icon className="size-5 shrink-0" />
                      <span className="text-base font-medium">{title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-stone-200 p-5">
        <div className="flex items-center gap-3.5">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-stone-200 text-sm font-semibold uppercase text-stone-700">
            {name?.[0] ?? "?"}
          </span>
          <span className="truncate text-base font-medium text-stone-700">
            {name ?? "Guest"}
          </span>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

export default AppSidebar;
