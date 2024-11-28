import adjustDateByFactor from "@/utils/adjustDateByFactor";
import { create } from "zustand";

type ConfigState = {
  category: string;
  level: string;
  details: string;
  since?: Date;
  until?: Date;
};

type ConfigAction = {
  setCategory: (category: ConfigState["category"]) => void;
  setLevel: (level: ConfigState["level"]) => void;
  setDetails: (details: ConfigState["details"]) => void;
  setDate: (date: Pick<ConfigState, "since" | "until">) => void;
};

const useConfigStore = create<ConfigState & ConfigAction>((set) => ({
  category: "1",
  level: "1",
  details: "PH-00",
  since: adjustDateByFactor(-360, new Date()),
  until: new Date(),
  setCategory(category) {
    set({ category });
  },
  setLevel(level) {
    set({ level });
  },
  setDetails(details) {
    set({ details });
  },
  setDate(date) {
    set(date);
  },
}));

export default useConfigStore;
