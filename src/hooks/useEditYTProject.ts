import YoutubeSchema from "@/schemas/youtube";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { z } from "zod";

export function useEditYTProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: z.infer<typeof YoutubeSchema.update>) => {
      const response = await fetch(
        `/api/v1/youtube/projects/${payload.projectId}/config`,
        {
          method: "PATCH",
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        if (response.status === 403) {
          throw new Error("You don't have permission to update project config");
        }
        throw new Error("Failed to update project config");
      }
      const data = await response.json();
      return data;
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["youtube", "projects"] });
      toast.success("Project updated!", {
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
  });
}
