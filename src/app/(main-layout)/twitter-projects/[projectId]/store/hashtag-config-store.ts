import { create } from "zustand";

type HashtagState = {
  date: Date;
};

type HashtagAction = {
  setDate: (date?: Date) => void;
};

const useHashtagStore = create<HashtagAction & HashtagState>((set) => ({
  date: new Date(),
  setDate(date) {
    set({ date });
  },
}));

export default useHashtagStore;
