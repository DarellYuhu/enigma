import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const useEditTWProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: EditProjectPayload) => {
      const response = await fetch(`/api/v1/twitter/${payload.projectId}`, {
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
