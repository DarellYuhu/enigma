import { createProject } from "@/api/youtubeApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useCreateYTProject({ closeRef }: { closeRef: any }) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProject,
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
