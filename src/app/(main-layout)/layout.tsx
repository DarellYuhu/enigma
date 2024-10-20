"use client";

import {
  ArrowLeftToLine,
  ChartNoAxesCombined,
  FolderOpenDot,
} from "lucide-react";
import Sidebar from "@/components/sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import useSidebarStore from "@/store/sidebar-store";
import { Toaster } from "@/components/ui/sonner";

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
  const { isSidebarOpen, setIsSidebarOpen } = useSidebarStore();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-row w-screen h-screen">
        <Sidebar menus={menus} />
        <div
          className={
            "relative flex flex-col p-4 w-full h-full overflow-y-auto bg-slate-100 dark:bg-slate-800"
          }
        >
          <div>
            <button
              className="flex items-center bg-slate-200 p-2 rounded-md hover:bg-slate-300"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <ArrowLeftToLine
                width={18}
                height={18}
                className={`transition-all duration-300 ${
                  !isSidebarOpen ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>
          {children}
          <Toaster />
        </div>
      </div>
    </QueryClientProvider>
  );
}

const menus: Menus = [
  {
    title: "Tiktok",
    menus: [
      {
        label: "Trend",
        link: "/tiktok-trend",
        icon: <ChartNoAxesCombined width={18} height={18} />,
      },
      {
        label: "Projects",
        link: "/tiktok-projects",
        icon: <FolderOpenDot width={18} height={18} />,
      },
    ],
  },
  {
    title: "Youtube",
    menus: [
      {
        label: "Trend",
        link: "/youtube-trend",
        icon: <ChartNoAxesCombined width={18} height={18} />,
      },
      {
        label: "Projects",
        link: "/youtube-projects",
        icon: <FolderOpenDot width={18} height={18} />,
      },
    ],
  },
];
