import { ApiUrl } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

export function useServices() {
  return useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const response = await fetch("/api/v1/services");
      const data: ApiUrl[] = await response.json();
      if (!response.ok) {
        if (response.status === 403) {
          throw new Error("You don't have permission to update services");
        }
        throw new Error("Failed to update services");
      }
      return data;
    },
  });
}
