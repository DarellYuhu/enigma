import YoutubeSchema from "@/schemas/youtube";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { z } from "zod";

export function useCreateYTProject({ closeRef }: { closeRef: any }) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: z.infer<typeof YoutubeSchema.create>) => {
      const response = await fetch("/api/v1/youtube/projects", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        if (response.status === 403) {
          throw new Error("You don't have permission to create project");
        }
        throw new Error("Failed to create project");
      }

      const data = await response.json();
      return data;
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["youtube", "projects"] });
      toast.success("Project created!", {
        position: "bottom-right",
        duration: 4000,
      });
      closeRef?.current?.click();
    },
    onError(e) {
      toast.error(e.message ?? "Something went wrong!", {
        position: "bottom-right",
        duration: 5000,
      });
    },
  });
}
