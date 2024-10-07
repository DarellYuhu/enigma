"use client";

import { ChartNoAxesCombined, FolderOpenDot } from "lucide-react";
import styles from "./layout.module.css";
import Sidebar from "@/componenets/Sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <div className={styles.main}>
        <Sidebar menus={menus} />
        <div className={styles.page}>{children}</div>
      </div>
    </QueryClientProvider>
  );
}

const menus: { title: string; link: string; icon: React.ReactNode }[] = [
  {
    title: "Trend",
    link: "/trend",
    icon: <ChartNoAxesCombined />,
  },
  {
    title: "Projects",
    link: "/projects",
    icon: <FolderOpenDot />,
  },
];
