"use client";

import { ChartNoAxesCombined, FolderOpenDot } from "lucide-react";
import Sidebar from "@/componenets/Sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnMount: false,
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
            "flex flex-col p-3 w-full h-full overflow-y-auto bg-slate-800"
          }
        >
          {children}
        </div>
      </div>
    </QueryClientProvider>
  );
}

const menus: { title: string; link: string; icon: React.ReactNode }[] = [
  {
    title: "Trend",
    link: "/trend",
    icon: <ChartNoAxesCombined width={20} height={20} />,
  },
  {
    title: "Projects",
    link: "/projects",
    icon: <FolderOpenDot width={20} height={20} />,
  },
];
