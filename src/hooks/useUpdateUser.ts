import { updateUserData } from "@/api/userApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUserData,
    onSuccess() {
      toast.success("Data updated successfully");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError() {
      toast.error("Update fail!");
    },
  });
}
