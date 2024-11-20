import { create } from "zustand";

type SelectionState = {
  type: "top" | "trending";
};

type SelectionAction = {
  setType: (type: SelectionState["type"]) => void;
};

const useSelectionStore = create<SelectionState & SelectionAction>((set) => ({
  type: "trending",
  setType(type) {
    set({ type });
  },
}));

export default useSelectionStore;
