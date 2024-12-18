import adjustDateByFactor from "@/utils/adjustDateByFactor";
import { create } from "zustand";

type BoardConfigState = {
  from: Date;
  to: Date;
  string: string;
};

type BoardConfigAction = {
  setFrom: (from?: Date) => void;
  setTo: (to?: Date) => void;
  setString: (string: Pick<BoardConfigState, "string">) => void;
};

const useBoardConfigStore = create<BoardConfigState & BoardConfigAction>(
  (set) => ({
    from: adjustDateByFactor(-3, new Date()),
    to: new Date(),
    string: "",
    setFrom(from) {
      set({ from });
    },
    setTo(to) {
      set({ to });
    },

    setString(string) {
      set(string);
    },
  })
);

export default useBoardConfigStore;
