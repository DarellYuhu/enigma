import { create } from "zustand";

type QueryFilterState = {
  query: string;
};

type QueryFilterActions = {
  setQuery: (query: string) => void;
  reset: () => void;
};

export const useQueryFilterStore = create<
  QueryFilterState & QueryFilterActions
>((set) => ({
  query: "",
  setQuery: (query) => set({ query }),
  reset: () => set({ query: "" }),
}));
