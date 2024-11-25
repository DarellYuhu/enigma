import adjustDateByFactor from "@/utils/adjustDateByFactor";
import { create } from "zustand";

type BoardConfigState = {
  from: Date;
  to: Date;
  string: string;
};

type BoardConfigAction = {
  setDate: (date: Omit<BoardConfigState, "string">) => void;
  setString: (string: Pick<BoardConfigState, "string">) => void;
  reset: () => void;
};

const useBoardConfigStore = create<BoardConfigState & BoardConfigAction>(
  (set) => ({
    from: adjustDateByFactor(-3, new Date(Date.now())),
    to: new Date(Date.now()),
    string: "",
    setDate(date) {
      set(date);
    },
    setString(string) {
      set(string);
    },
    reset() {
      set({
        from: adjustDateByFactor(-3, new Date(Date.now())),
        to: new Date(Date.now()),
        string: "",
      });
    },
  })
);

export default useBoardConfigStore;
