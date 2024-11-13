import { create } from "zustand";

type GraphQueryState = {
  query: string;
};

type GraphQueryActions = {
  setQuery: (query: string) => void;
  reset: () => void;
};

export const useGraphQueryStore = create<GraphQueryState & GraphQueryActions>(
  (set) => ({
    query: "",
    setQuery: (query) => set({ query }),
    reset: () => set({ query: "" }),
  })
);
