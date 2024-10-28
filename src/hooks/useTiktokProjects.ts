import { getProjects } from "@/api/tiktokApi";
import { useQuery } from "@tanstack/react-query";

export function useTiktokProjects() {
  return useQuery({
    queryKey: ["projects"],
    queryFn: () => getProjects({ type: "listAllProjects" }),
  });
}
