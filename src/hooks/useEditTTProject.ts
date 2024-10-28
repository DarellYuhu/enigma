import { editProject } from "@/api/tiktokApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useEditTTProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editProject,
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
  });
}
