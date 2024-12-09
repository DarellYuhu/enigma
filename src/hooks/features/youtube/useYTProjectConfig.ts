import { useQuery } from "@tanstack/react-query";

export function useYTProjectConfig(payload: { item: YoutubeProject }) {
  return useQuery({
    enabled: !!payload.item.projectID,
    queryKey: ["youtube", "projects", payload.item.projectID],
    queryFn: async () => {
      const response = await fetch(
        `/api/v1/youtube/projects/${payload.item.projectID}/config`
      );
      const data: YoutubeProjectConfig = await response.json();
      return data;
    },
  });
}
