import { useQuery } from "@tanstack/react-query";

export default function useWorkspaces() {
  return useQuery({
    queryKey: ["workspaces"],
    queryFn: async () => {
      const response = await fetch("/api/workspace");
      const data: TWorkspace = await response.json();
      return data;
    },
  });
}

export type TWorkspace = {
  id: string;
  name: string;
  description: string;
  users: {
    id: number;
    displayName: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
}[];
