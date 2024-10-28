import { editProject } from "@/api/youtubeApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useEditYTProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editProject,
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
