import { create } from "zustand";

type SelectionState = {
  type:
    | "centrality"
    | "num_contents"
    | "num_authors"
    | "num_audience"
    | "total_views"
    | "total_likes"
    | "total_comments"
    | "total_shares";
};

type SelectionAction = {
  setType: (type: SelectionState["type"]) => void;
};

const useSelectionStore = create<SelectionState & SelectionAction>((set) => ({
  type: "centrality",
  setType(type) {
    set({ type });
  },
}));

export default useSelectionStore;
