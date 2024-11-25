import adjustDateByFactor from "@/utils/adjustDateByFactor";
import { create } from "zustand";

type GraphConfigState = {
  from: Date;
  to?: Date;
  window: string;
};

type GraphConfigAction = {
  setFrom: (value: GraphConfigState["from"]) => void;
  setTo: (value: GraphConfigState["to"]) => void;
  setWindow: (value: GraphConfigState["window"]) => void;
  reset: () => void;
};

const defaultValue = {
  from: adjustDateByFactor(-3, new Date(Date.now())),
  to: new Date(Date.now()),
  window: "3",
};

const useGraphConfigStore = create<GraphConfigState & GraphConfigAction>(
  (set) => ({
    to: new Date(Date.now()),
    from: adjustDateByFactor(-3, new Date(Date.now())),
    window: "3",
    setFrom(value) {
      set({ from: value });
    },
    setTo(value) {
      set({ to: value });
    },
    reset() {
      set(defaultValue);
    },
    setWindow(value) {
      set({ window: value });
    },
  })
);

export default useGraphConfigStore;
