import { create } from "zustand";

type SelectedVideoState = {
  video?: YoutubeProjectTopVideos["top"]["0"];
};

type SelectedVideoAction = {
  setVideo: (video: YoutubeProjectTopVideos["top"]["0"]) => void;
};

const useSelectedVideoStore = create<SelectedVideoState & SelectedVideoAction>(
  (set) => ({
    video: undefined,
    setVideo: (video) => set({ video }),
  })
);

export default useSelectedVideoStore;
