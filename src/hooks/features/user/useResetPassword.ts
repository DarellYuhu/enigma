import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export function useResetPassword() {
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/v1/users/${id}/reset-pass`, {
        method: "PATCH",
      });

      if (!response.ok) {
        switch (response.status) {
          case 403:
            throw new Error("You are not authorized to perform this action");
          case 404:
            throw new Error("User not found");

          default:
            throw new Error("Something went wrong!");
        }
      }

      const data = await response.json();

      return data;
    },
    onSuccess() {
      toast.success("Password reset successfully", { duration: 5000 });
    },
    onError(error) {
      toast.error(error.message ?? "Something went wrong", { duration: 5000 });
    },
  });
}
