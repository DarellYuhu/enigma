import extractAgeLabel from "@/utils/extractAgeLabel";
import { useQuery } from "@tanstack/react-query";

export function useTiktokTagInfo(payload: {
  tagNode: TagRelationNetwork["relation"]["nodes"][number];
}) {
  return useQuery({
    queryKey: ["tagInformation", payload.tagNode.id],
    enabled: !!payload.tagNode.id,
    queryFn: async () => {
      const response = await fetch(
        `/api/v1/tiktok/hashtags?hashtag=${payload.tagNode.id}`
      );
      const data: TagInformation = await response.json();

      return {
        ...data,
        audienceAges: Object.values(data.audienceAges).map((value, index) => ({
          age: extractAgeLabel(Object.keys(data.audienceAges)[index]),
          value: value,
        })),
      };
    },
  });
}
