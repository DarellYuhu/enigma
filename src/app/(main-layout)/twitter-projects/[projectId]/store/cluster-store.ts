import { create } from "zustand";

type ClusterState = {
  date?: Date;
  hashtag?: string;
  account?: string;
};

type ClusterAction = {
  setHashtag: (hashtag: ClusterState["hashtag"]) => void;
  setAccount: (account: ClusterState["account"]) => void;
  setDate: (date: ClusterState["date"]) => void;
};

const useClusterStore = create<ClusterState & ClusterAction>((set) => ({
  date: undefined,
  hashtag: undefined,
  account: undefined,
  setDate(date) {
    set({ date });
  },
  setHashtag(hashtag) {
    set({ hashtag });
  },
  setAccount(account) {
    set({ account });
  },
}));

export default useClusterStore;
