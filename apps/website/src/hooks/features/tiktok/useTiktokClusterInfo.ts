import { useQuery } from "@tanstack/react-query";

const useTiktokClusterInfo = (payload: {
  date?: string;
  window?: number;
  cluster?: string;
}) => {
  return useQuery({
    queryKey: [
      "tiktok",
      "globa-cluster",
      "info",
      payload.date,
      payload.window,
      payload.cluster,
    ],
    queryFn: async () => {
      const response = await fetch(
        `/api/v2/tiktok/cluster/${payload.cluster}?date=${payload.date}&window=${payload.window}`
      );
      const data: ClusterInfoData = await response.json();
      const chart: { tag: string; value: number }[] =
        data.hashtags.hashtags.map((tag, index) => ({
          tag,
          value: data.hashtags.value[index],
        }));

      return { data, chart };
    },
    enabled: !!payload.cluster && !!payload.date,
  });
};

export type ClusterInfoData = {
  hashtags: {
    hashtags: string[];
    value: number[];
  };
  videos: {
    id: string;
    desc: string;
    published_at: string; // <= unix timestamp
    author_id: string;
    author_name: string;
    view: number;
    like: number;
    comment: number;
    share: number;
  }[];
};

export default useTiktokClusterInfo;
