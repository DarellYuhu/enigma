import { createProject } from "@/api/twitterApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const useCreateTWProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createProject,
    onSuccess() {
      toast.success("Project updated successfully", {
        duration: 5000,
      });
      queryClient.invalidateQueries({ queryKey: ["projects", "twitter"] });
    },
    onError(error) {
      toast.error(error.message ?? "Fail create project", {
        duration: 5000,
      });
    },
  });
};

export default useCreateTWProject;
