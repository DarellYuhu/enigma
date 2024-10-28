import { getProjects } from "@/api/youtubeApi";
import { useQuery } from "@tanstack/react-query";

export function useYoutubeProjects() {
  return useQuery({
    queryKey: ["youtube", "projects"],
    queryFn: getProjects,
  });
}
