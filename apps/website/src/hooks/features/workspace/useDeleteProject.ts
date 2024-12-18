import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type Payload = {
  workspaceId: string;
  projectId: string;
};
export default function useDeleteProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ workspaceId, projectId }: Payload) => {
      const response = await fetch(
        `/api/workspace/${workspaceId}/project/${projectId}`,
        { method: "DELETE" }
      );

      if (!response.ok) {
        throw new Error("Failed to delete project");
      }
    },
    onSuccess(_, variables) {
      toast.success("Project deleted successfully");
      queryClient.invalidateQueries({
        queryKey: ["workspace", variables.workspaceId],
      });
    },
    onError() {
      toast.error("Failed to delete project");
    },
  });
}
