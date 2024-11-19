import { useQuery } from "@tanstack/react-query";

type Payload = {
  project: string;
  since?: Date;
  until?: Date;
  string: string;
};

const useTwitterBoards = (payload: Payload) => {
  return useQuery({
    queryFn: async () => {
      const response = await fetch(
        `/api/v1/twitter/${
          payload.project
        }/boards?since=${payload.since?.toISOString()}&until=${payload.until?.toISOString()}&string=${
          payload.string
        }`
      );
      const data: TwitterBoards = await response.json();
      return data;
    },
    queryKey: ["twitter", "boards", payload.project, payload.string],
  });
};

export type TwitterBoardItem = {
  id: string;
  created_at: string; // 2024-11-06 05:35:11 <-- this format
  user_id: string;
  user_screen_name: string;
  user_description: string;
  num_followers: number;
  full_text: string;
  view_count: number;
  retweet_count: number;
  reply_count: number;
  favorite_count: number;
  bookmark_count: number;
};

type TwitterBoards = {
  top: {
    view_count: TwitterBoardItem[];
    retweet_count: TwitterBoardItem[];
    reply_count: TwitterBoardItem[];
    favorite_count: TwitterBoardItem[];
    bookmark_count: TwitterBoardItem[];
  };
};

export default useTwitterBoards;
