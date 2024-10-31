import { resetPassword } from "@/api/userApi";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export function useResetPassword() {
  return useMutation({
    mutationFn: resetPassword,
    onSuccess() {
      toast.success("Password reset successfully", { duration: 5000 });
    },
    onError(error) {
      toast.error(error.message ?? "Something went wrong", { duration: 5000 });
    },
  });
}
