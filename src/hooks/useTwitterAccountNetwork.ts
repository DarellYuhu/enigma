import { getAccountNetwork } from "@/api/twitterApi";
import { useQuery } from "@tanstack/react-query";

const useTwitterAccountNetwork = (payload: {
  project: string;
  window: string;
}) => {
  return useQuery({
    queryKey: ["twitter", "account-network", payload.project],
    queryFn: () => getAccountNetwork(payload),
  });
};

export default useTwitterAccountNetwork;
