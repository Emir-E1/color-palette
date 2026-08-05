"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, History, Heart, Settings } from "lucide-react";

import Logo from "./Logo";
import {
  Sidebar,
  SidebarContent,
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
  { title: "Favorites", url: "/favorite", icon: Heart },
  { title: "Settings", url: "/settings", icon: Settings },
];

function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader className="px-3 py-4">
        <div className="flex w-full items-center justify-center gap-2">
          <Logo />
        </div>
      </SidebarHeader>

      <SidebarContent className="bg-background px-2 pt-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="items-center gap-4">
              {navItems.map((item) => {
                const isActive = pathname === item.url;
                const Icon = item.icon;

                return (
                  <SidebarMenuItem key={item.title} className="w-full">
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={item.title}
                      className="h-12 rounded-xl px-4 text-gray-500 hover:bg-primary/10 hover:text-primary"
                    >
                      <Link
                        href={item.url}
                        className="w-full flex items-center gap-4"
                      >
                        <Icon className="size-5 shrink-0" />
                        <span className="font-medium">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

export default AppSidebar;
