import { create } from "zustand";

export type CategoryState = {
  category: "play" | "like" | "comment" | "share";
};

type CategoryAction = {
  setCategory: (category: CategoryState["category"]) => void;
};

const useCategoryStore = create<CategoryState & CategoryAction>((set) => ({
  category: "play",
  setCategory(category) {
    set({ category });
  },
}));

export default useCategoryStore;
