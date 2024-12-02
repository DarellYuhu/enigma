import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";

type Payload = {
  projectId: string;
  date: string;
  window: number;
  cluster?: string;
};
export default function useTwitterHashtageClusterInfo(payload: Payload) {
  return useQuery({
    queryKey: ["twitter", "hashtag-cluster", payload],
    queryFn: async () => {
      const response = await fetch(
        `/api/v2/twitter/${
          payload.projectId
        }/hashtag-cluster-info?date=${format(
          payload.date,
          "yyyy-MM-dd"
        )}&window=${payload.window}&cluster=${payload.cluster}&cluster=${
          payload.cluster
        }`
      );
      const data: ClusterInfo = await response.json();
      const normalized = data.hashtags.hashtags.map((hashtag, index) => ({
        hashtag,
        value: data.hashtags.value[index],
      }));
      return { data, normalized };
    },
    enabled: !!payload.cluster,
  });
}

export type ClusterInfo = {
  authors: {
    user_id: string;
    user_screen_name: string;
    view_count: number;
  }[];
  hashtags: {
    hashtags: string[];
    value: number[];
  };
};
