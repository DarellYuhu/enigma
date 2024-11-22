import { useQuery } from "@tanstack/react-query";

export function useTiktokBoards(paylaod: {
  projectId: string;
  from?: Date;
  to?: Date;
  string: string;
}) {
  return useQuery({
    queryKey: ["tiktok", "boards", paylaod.projectId],
    enabled: false,
    queryFn: async () => {
      const response = await fetch(
        `/api/v1/tiktok/${paylaod.projectId}/boards?since=${
          paylaod.from?.toISOString().split("T")[0]
        }&until=${paylaod.to?.toISOString().split("T")[0]}&string=${
          paylaod.string
        }`
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
