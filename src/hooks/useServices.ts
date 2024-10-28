import { getServices } from "@/api/serviceApi";
import { useQuery } from "@tanstack/react-query";

export function useServices() {
  return useQuery({
    queryKey: ["services"],
    queryFn: getServices,
  });
}
