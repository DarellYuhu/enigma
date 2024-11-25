import { create } from "zustand";

type ClusterState = {
  hashtag?: string;
};

type ClusterAction = {
  setHashtag: (hashtag: ClusterState["hashtag"]) => void;
};

const useClusterStore = create<ClusterState & ClusterAction>((set) => ({
  hashtag: undefined,
  setHashtag(hashtag) {
    set({ hashtag });
  },
}));

export default useClusterStore;
