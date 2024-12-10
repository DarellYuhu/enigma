import create from "@/schemas/account/create";
import { User } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { z } from "zod";

export default function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      user: Omit<z.infer<typeof create>, "confirmPassword">
    ) => {
      const response = await fetch("/api/v1/users", {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data: Omit<User, "password"> = await response.json();
      return data;
    },
    onSuccess() {
      toast.success("User created successfully");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError() {
      toast.error("Fail create user account");
    },
  });
}
