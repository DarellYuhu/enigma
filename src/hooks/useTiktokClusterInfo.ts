import { useQuery } from "@tanstack/react-query";

const useTiktokClusterInfo = (payload: {
  date?: Date;
  window?: number;
  cluster?: string;
}) => {
  return useQuery({
    queryKey: [
      "tiktok-global-cluster",
      payload.date,
      payload.window,
      payload.cluster,
    ],
    queryFn: async () => {
      const response = await fetch(
        `/api/v2/tiktok/cluster/${
          payload.cluster
        }?date=${payload.date?.toISOString()}&window=${payload.window}`
      );
      const data: ClusterInfoData = await response.json();
      const chart: { tag: string; value: number }[] =
        data.hashtags.hashtags.map((tag, index) => ({
          tag,
          value: data.hashtags.value[index],
        }));

      return { data, chart };
    },
    throwOnError: true,
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
