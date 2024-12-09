import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useEditTTProject() {
  const queryClient = useQueryClient();

  return useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Project updated successfully", {
        position: "bottom-right",
        duration: 4000,
      });
    },
    onError(e) {
      toast.error(e.message ?? "Something went wrong!", {
        position: "bottom-right",
        duration: 5000,
      });
    },
    mutationFn: async (payload: {
      projectId?: string;
      keywords?: string;
      status?: "active" | "inactive";
    }) => {
      const response = await fetch(`/api/v1/tiktok/${payload.projectId}`, {
        method: "PATCH",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        if (response.status === 403) {
          throw new Error("You don't have permission to edit project");
        }
        throw new Error("Failed to edit project");
      }
      const data = await response.json();
      return data;
    },
  });
}
