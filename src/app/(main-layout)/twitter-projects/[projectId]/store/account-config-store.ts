import { create } from "zustand";

type AccountState = {
  date: Date;
};

type AccountAction = {
  setDate: (date?: Date) => void;
};

const useAccountStore = create<AccountAction & AccountState>((set) => ({
  date: new Date(),
  setDate(date) {
    set({ date });
  },
}));

export default useAccountStore;
