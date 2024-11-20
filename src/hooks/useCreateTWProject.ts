import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const useCreateTWProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
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
    mutationFn: async (payload: { projectName: string; keywords: string }) => {
      const response = await fetch("/api/v1/twitter", {
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
  });
};

export default useCreateTWProject;
