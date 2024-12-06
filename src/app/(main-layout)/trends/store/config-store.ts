import adjustDateByFactor from "@/utils/adjustDateByFactor";
import { create } from "zustand";

type ConfigState = {
  category: string;
  level: string;
  since?: Date;
  until?: Date;
  type: "week" | "month";
  networkType: "60" | "120";
  networkDate: Date;
};

type ConfigAction = {
  setCategory: (category: ConfigState["category"]) => void;
  setLevel: (level: ConfigState["level"]) => void;
  setDate: (date: Pick<ConfigState, "since" | "until">) => void;
  setType: (type: ConfigState["type"]) => void;
  setNetworkType: (type: ConfigState["networkType"]) => void;
  setNetworkDate: (date: ConfigState["networkDate"]) => void;
};

const useConfigStore = create<ConfigState & ConfigAction>((set) => ({
  category: "2",
  level: "1",
  since: adjustDateByFactor(-360, new Date()),
  until: new Date(),
  type: "week",
  networkType: "60",
  networkDate: new Date(),
  setNetworkDate(date) {
    set({ networkDate: date });
  },
  setNetworkType(type) {
    set({ networkType: type });
  },
  setCategory(category) {
    set({ category });
  },
  setLevel(level) {
    set({ level });
  },
  setDate(date) {
    set(date);
  },
  setType(type) {
    set({ type });
  },
}));

export default useConfigStore;
