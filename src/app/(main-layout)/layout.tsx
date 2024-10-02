import React from "react";
import Sidebar from "../componenets/Sidebar";
import styles from "./layout.module.css";
import SettingsSuggestOutlinedIcon from "@mui/icons-material/SettingsSuggestOutlined";
import FolderOpenOutlinedIcon from "@mui/icons-material/FolderOpenOutlined";

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
    title: "Dashboard",
    link: "/dashboard",
    icon: <SettingsSuggestOutlinedIcon />,
  },
  {
    title: "Projects",
    link: "/projects",
    icon: <FolderOpenOutlinedIcon />,
  },
];
