import { getTopChannels } from "@/api/youtubeApi";
import { useQuery } from "@tanstack/react-query";

export function useYoutubeTopChannels({
  params,
  from,
  to,
  string,
}: {
  params: { projectId: string };
  from?: Date;
  to?: Date;
  string: string;
}) {
  return useQuery({
    queryKey: ["youtube", "projects", params.projectId, "top-channels"],
    queryFn: () =>
      getTopChannels({
        projectId: params.projectId,
        since: from,
        until: to,
        string,
      }),
  });
}
