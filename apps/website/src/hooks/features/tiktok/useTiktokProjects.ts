import { useQuery } from "@tanstack/react-query";

export function useTiktokProjects() {
  return useQuery({
    queryKey: ["tiktok", "projects"],
    queryFn: async () => {
      const response = await fetch("/api/v1/tiktok");
      const data: GetProjectsResult = await response.json();
      return data;
    },
  });
}
