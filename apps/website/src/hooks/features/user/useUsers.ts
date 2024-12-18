import { User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await fetch("/api/v1/users");
      const data: Omit<User[], "password"> = await response.json();
      return data;
    },
  });
}
