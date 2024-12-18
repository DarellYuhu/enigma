import { Section } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

export default function useSections(workspaceId: string) {
  return useQuery({
    queryKey: ["sections"],
    queryFn: async () => {
      const response = await fetch(`/api/workspace/${workspaceId}/section`);
      const data: Section[] | undefined = await response.json();
      return data;
    },
  });
}
