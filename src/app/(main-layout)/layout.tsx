"use client";

import { Clapperboard, UserCog, Youtube } from "lucide-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <SidebarProvider>
        <AppSidebar data={data} />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbPage>Engima</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          <div className="flex flex-1 flex-col p-4">
            {children}
            <Toaster />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </QueryClientProvider>
  );
}

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Tiktok",
      url: "#",
      icon: Clapperboard,
      isActive: true,
      items: [
        {
          title: "Trend",
          url: "/tiktok-trend",
        },
        {
          title: "Projects",
          url: "/tiktok-projects",
        },
      ],
    },
    {
      title: "Youtube",
      url: "#",
      icon: Youtube,
      isActive: true,
      items: [
        {
          title: "Projects",
          url: "/youtube-projects",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Accounts",
      url: "/accounts",
      icon: UserCog,
    },
  ],
};
