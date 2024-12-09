import UserSchema from "@/schemas/account";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { z } from "zod";

export function useChangePassword() {
  return useMutation({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: string;
      payload: z.infer<typeof UserSchema.changePassword>;
    }) => {
      const response = await fetch(`/api/v1/users/${id}/change-pass`, {
        method: "PATCH",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        switch (response.status) {
          case 400:
            throw new Error("Wrong password");
          case 403:

          default:
            throw new Error("Something went wrong!");
        }
      }

      const data = await response.json();

      return data;
    },
    onSuccess() {
      toast.success("Password changed successfully", { duration: 5000 });
    },
    onError(error) {
      toast.error(error.message ?? "Something went wrong", { duration: 5000 });
    },
  });
}
