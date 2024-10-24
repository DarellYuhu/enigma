import { create } from "zustand";

type GraphDateState = {
  from?: Date;
  to?: Date;
};

type GraphDateActions = {
  setFrom: (from?: Date) => void;
  setTo: (to?: Date) => void;
  reset: () => void;
};

type GraphDateStore = GraphDateState & GraphDateActions;

const initialState: GraphDateState = {
  from: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
  to: new Date(),
};

const useGraphDateStore = create<GraphDateStore>((set) => ({
  from: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
  to: new Date(),
  setFrom: (from) => set({ from }),
  setTo: (to) => set({ to }),
  reset: () => set(initialState),
}));

export default useGraphDateStore;
