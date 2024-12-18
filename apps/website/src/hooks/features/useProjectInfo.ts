import { Type } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

export default function useProjectInfo(type: Type, id: string) {
  return useQuery({
    queryKey: ["project-info", type, id],
    queryFn: async () => {
      const response = await fetch(
        `/api/v2/project-info?projectId=${id}&projectType=${type}`
      );
      const data: Data = await response.json();
      return data;
    },
  });
}

type Data = {
  lastUpdate: string; // <-- datetime
};
