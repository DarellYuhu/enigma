import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function useCreateSection() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: { name: string; workspaceId: string }) => {
      const response = await fetch(
        `/api/workspace/${payload.workspaceId}/section`,
        {
          method: "POST",
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        if (response.status === 403) {
          throw new Error("You don't have permission to create section");
        }
        throw new Error("Failed to create section");
      }
      const data = await response.json();
      return data;
    },
    onSuccess() {
      toast.success("Section created successfully", {
        duration: 5000,
      });
      queryClient.invalidateQueries({ queryKey: ["sections"] });
    },
    onError(error) {
      toast.error(error.message ?? "Something went wrong", {
        duration: 5000,
      });
    },
  });
}
