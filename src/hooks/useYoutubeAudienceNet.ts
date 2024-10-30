import { getAudienceNetwork } from "@/api/youtubeApi";
import { useQuery } from "@tanstack/react-query";

export function useYoutubeAudienceNet({
  params,
  from,
  to,
}: {
  params: { projectId: string };
  from?: Date;
  to?: Date;
}) {
  return useQuery({
    queryKey: ["youtube", "projects", params.projectId, "audience-network"],
    queryFn: () =>
      getAudienceNetwork({
        projectId: params.projectId,
        since: from,
        until: to,
        string: "",
      }),
  });
}
