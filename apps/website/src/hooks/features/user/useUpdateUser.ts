import { User } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      payload: Omit<User, "updatedAt" | "createdAt" | "password">
    ) => {
      const response = await fetch(`/api/v1/users/${payload.id}`, {
        method: "PATCH",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        switch (response.status) {
          case 403:
            throw new Error("You are not authorized to perform this action");
          default:
            throw new Error("Something went wrong!");
        }
      }
      const data: Omit<User, "password"> = await response.json();
      return data;
    },
    onSuccess() {
      toast.success("Data updated successfully");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError() {
      toast.error("Update fail!");
    },
  });
}
