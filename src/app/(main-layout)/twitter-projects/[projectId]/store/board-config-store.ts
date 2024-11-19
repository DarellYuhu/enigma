import { create } from "zustand";

type BoardConfigState = {
  from: Date;
  to: Date;
  string: string;
};

type BoardConfigAction = {
  setDate: (date: Omit<BoardConfigState, "string">) => void;
  setString: (string: Pick<BoardConfigState, "string">) => void;
  reset: () => void;
};

const useBoardConfigStore = create<BoardConfigState & BoardConfigAction>(
  (set) => ({
    from: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    to: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    string: "",
    setDate(date) {
      set(date);
    },
    setString(string) {
      set(string);
    },
    reset() {
      set({
        from: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        to: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
        string: "",
      });
    },
  })
);

export default useBoardConfigStore;
