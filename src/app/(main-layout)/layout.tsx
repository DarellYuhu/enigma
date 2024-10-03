import { ChartNoAxesCombined, FolderOpenDot } from "lucide-react";
import styles from "./layout.module.css";
import Sidebar from "@/componenets/Sidebar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.main}>
      <Sidebar menus={menus} />
      <div className={styles.page}>{children}</div>
    </div>
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
