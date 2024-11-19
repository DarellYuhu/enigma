import { useQuery } from "@tanstack/react-query";

export function useYoutubeTopChannels(payload: {
  params: { projectId: string };
  from?: Date;
  to?: Date;
  string: string;
}) {
  return useQuery({
    queryKey: ["youtube", "projects", payload.params.projectId, "top-channels"],
    queryFn: async () => {
      const response = await fetch(
        `/api/v1/youtube/projects/${
          payload.params.projectId
        }/top-channels?since=${payload.from?.toISOString()}&until=${payload.to?.toISOString()}&string=${
          payload.string
        }`
      );
      const data: YoutubeTopChannels = await response.json();
      return data;
    },
  });
}
