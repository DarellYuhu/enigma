import { createProject } from "@/api/tiktokApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useCreateTTProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Project created!", {
        position: "bottom-right",
        duration: 4000,
      });
    },
    onError: (e) => {
      toast.error(e.message ?? "Something went wrong!", {
        position: "bottom-right",
        duration: 5000,
      });
    },
  });
}
