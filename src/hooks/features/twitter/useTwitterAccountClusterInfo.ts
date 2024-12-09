import { useQuery } from "@tanstack/react-query";

type Payload = {
  projectId: string;
  date: string;
  window: number;
  cluster?: string;
};
export default function useTwitterAccountClusterInfo(payload: Payload) {
  return useQuery({
    queryKey: ["twitter", "account-cluster-info", payload],
    queryFn: async () => {
      const response = await fetch(
        `/api/v2/twitter/${payload.projectId}/account-cluster-info?date=${payload.date}&window=${payload.window}&cluster=${payload.cluster}`
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
    reply_count: number;
  }[];
  hashtags: {
    hashtags: string[];
    value: number[];
  };
};
