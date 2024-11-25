import { create } from "zustand";

type ClusterState = {
  hashtag?: string;
  account?: string;
};

type ClusterAction = {
  setHashtag: (hashtag: ClusterState["hashtag"]) => void;
  setAccount: (account: ClusterState["account"]) => void;
};

const useClusterStore = create<ClusterState & ClusterAction>((set) => ({
  hashtag: undefined,
  account: undefined,
  setHashtag(hashtag) {
    set({ hashtag });
  },
  setAccount(account) {
    set({ account });
  },
}));

export default useClusterStore;
