import { getTagInformation } from "@/api/tiktokApi";
import { useQuery } from "@tanstack/react-query";

export function useTiktokTagInfo({
  tagNode,
}: {
  tagNode: TagRelationNetwork["relation"]["nodes"][number];
}) {
  return useQuery({
    queryKey: ["tagInformation", tagNode.id],
    enabled: !!tagNode.id,
    queryFn: () => getTagInformation({ hashtag: tagNode.id }),
  });
}
