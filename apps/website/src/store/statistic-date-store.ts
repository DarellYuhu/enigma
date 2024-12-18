import { create } from "zustand";

type StatisticDateState = {
  from?: Date;
  to?: Date;
};

type StatisticDateActions = {
  setFrom: (from?: Date) => void;
  setTo: (to?: Date) => void;
  reset: () => void;
};

type StatisticDateStore = StatisticDateState & StatisticDateActions;

const initialState: StatisticDateState = {
  from: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
  to: new Date(Date.now() + 1000 * 60 * 60 * 24 * 1),
};

const useStatisticDateStore = create<StatisticDateStore>((set) => ({
  from: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
  to: new Date(Date.now() + 1000 * 60 * 60 * 24 * 1),
  setFrom: (from) => set({ from }),
  setTo: (to) => set({ to }),
  reset: () => set(initialState),
}));

export default useStatisticDateStore;
