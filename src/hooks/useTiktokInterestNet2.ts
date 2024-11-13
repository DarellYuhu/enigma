import { getInterestGraphs2 } from "@/api/tiktokApi";
import { useQuery } from "@tanstack/react-query";

const useTiktokInterestNet2 = (payload: {
  projectId: string;
  window: number;
}) => {
  return useQuery({
    queryFn: () => getInterestGraphs2(payload),
    queryKey: [
      "tiktok",
      "interest-network",
      "v2",
      payload.projectId,
      payload.window,
    ],
  });
};
export default useTiktokInterestNet2;
