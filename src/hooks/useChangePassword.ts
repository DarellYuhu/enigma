import { changePassword } from "@/api/userApi";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export function useChangePassword() {
  return useMutation({
    mutationFn: changePassword,
    onSuccess() {
      toast.success("Password changed successfully", { duration: 5000 });
    },
    onError(error) {
      toast.error(error.message ?? "Something went wrong", { duration: 5000 });
    },
  });
}
