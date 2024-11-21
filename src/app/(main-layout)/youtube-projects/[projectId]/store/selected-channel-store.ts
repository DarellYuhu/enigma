import { create } from "zustand";

type SelectedVideoState = {
  channelId?: string;
};

type SelectedVideoAction = {
  setChannel: (channelId: string) => void;
};

const useSelectedChannelStore = create<
  SelectedVideoState & SelectedVideoAction
>((set) => ({
  channelId: undefined,
  setChannel: (channelId) => set({ channelId }),
}));

export default useSelectedChannelStore;
