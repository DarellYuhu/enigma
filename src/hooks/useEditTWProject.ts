import { editProject } from "@/api/twitterApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const useEditTWProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: editProject,
    onSuccess() {
      toast.success("Project created successfully", {
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

export default useEditTWProject;
