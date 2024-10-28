import { getTopChannels } from "@/api/youtubeApi";
import { useQuery } from "@tanstack/react-query";

export function useYoutubeTopChannels({
  params,
  from,
  to,
}: {
  params: { projectId: string };
  from?: Date;
  to?: Date;
}) {
  return useQuery({
    queryKey: ["youtube", "projects", params.projectId, "top-channels"],
    queryFn: () =>
      getTopChannels({
        projectId: params.projectId,
        since: from,
        until: to,
        string: "",
      }),
  });
}
