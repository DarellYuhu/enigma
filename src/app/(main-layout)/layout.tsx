"use client";

import { ChartNoAxesCombined, FolderOpenDot } from "lucide-react";
import Sidebar from "@/components/sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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
      <div className="flex flex-row w-screen h-screen">
        <Sidebar menus={menus} />
        <div
          className={
            "flex flex-col p-4 w-full h-full overflow-y-auto bg-slate-100 dark:bg-slate-800"
          }
        >
          {children}
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
