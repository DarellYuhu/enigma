import WorkspaceSchema from "@/schemas/workspace";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { z } from "zod";

export default function useCreateWorkspace() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: z.infer<typeof WorkspaceSchema.create>) => {
      const response = await fetch("/api/workspace", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        if (response.status === 403) {
          throw new Error("You don't have permission to create workspace");
        }
        throw new Error("Failed to create workspace");
      }
      const data = await response.json();
      return data;
    },

    onSuccess() {
      toast.success("Workspace created successfully", { duration: 5000 });
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
    },
    onError(error) {
      toast.error(error.message ?? "Something went wrong", { duration: 5000 });
    },
  });
}
