import { create } from "zustand";

type ConfigState = {
  date: Date;
};

type ConfigAction = {
  setDate: (date?: ConfigState["date"]) => void;
};

const useConfigStore = create<ConfigState & ConfigAction>((set) => ({
  date: new Date(new Date().setHours(0, 0, 0, 0)),
  setDate(date) {
    set({ date });
  },
}));

export default useConfigStore;
