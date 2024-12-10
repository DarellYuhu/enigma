import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function useDeleteUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      await fetch(`/api/v1/users/${id}`, {
        method: "DELETE",
      });
    },
    onSuccess() {
      toast.success("User delete successfully");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError() {
      toast.error("Fail delete user account");
    },
  });
}
