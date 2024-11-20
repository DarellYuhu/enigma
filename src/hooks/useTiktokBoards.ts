import { useQuery } from "@tanstack/react-query";

export function useTiktokBoards({
  projectId,
  from,
  to,
  string,
}: {
  projectId: string;
  from?: Date;
  to?: Date;
  string: string;
}) {
  return useQuery({
    queryKey: ["boards", projectId],
    queryFn: async () => {
      const response = await fetch(
        `/api/v1/tiktok/${projectId}/boards?since=${
          from?.toISOString().split("T")[0]
        }&until=${to?.toISOString().split("T")[0]}&string=${string}`
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
