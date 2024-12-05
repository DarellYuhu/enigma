import dateFormatter from "@/utils/dateFormatter";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";

export function useTiktokBoards(paylaod: {
  projectId: string;
  from?: Date;
  to?: Date;
  string: string;
}) {
  return useQuery({
    queryKey: [
      "tiktok",
      "boards",
      paylaod.projectId,
      paylaod.to && dateFormatter("ISO", paylaod.to),
    ],
    enabled: false,
    queryFn: async () => {
      const response = await fetch(
        `/api/v1/tiktok/${paylaod.projectId}/boards?since=${format(
          paylaod.from!,
          "yyyy-MM-dd"
        )}&until=${format(paylaod.to!, "yyyy-MM-dd")}&string=${paylaod.string}`
      );
      const data: BoardsData = await response.json();
      const normalize = {
        ...data,
        top: {
          ...data.top,
          like: data.top.digg,
        },
        trending: {
          ...data.trending,
          like: data.trending.digg,
        },
      };
      return normalize;
    },
  });
}
