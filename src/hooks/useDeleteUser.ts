import { deleteUserAccount } from "@/api/userApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function useDeleteUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteUserAccount,
    onSuccess() {
      toast.success("User delete successfully");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError() {
      toast.error("Fail delete user account");
    },
  });
}
