import { getAllUsers } from "@/api/userApi";
import { useQuery } from "@tanstack/react-query";

export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });
}
