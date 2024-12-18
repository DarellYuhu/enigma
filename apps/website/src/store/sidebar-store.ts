import { create } from "zustand";

type SidebarState = {
  isSidebarOpen: boolean;
};

type SidebarAction = {
  setIsSidebarOpen: (isSidebarOpen: boolean) => void;
};

const useSidebarStore = create<SidebarState & SidebarAction>((set) => ({
  isSidebarOpen: true,
  setIsSidebarOpen: (isSidebarOpen) => set({ isSidebarOpen }),
}));

export default useSidebarStore;
