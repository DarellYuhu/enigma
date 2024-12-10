import ProjectSchema from "@/schemas/project";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { z } from "zod";

export default function useCreateProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: z.infer<typeof ProjectSchema.create>) => {
      const formData = new FormData();
      formData.append("workspaceId", payload.workspaceId);
      formData.append("title", payload.title);
      formData.append("description", payload.description);
      formData.append("sectionId", payload.sectionId);
      formData.append("file", payload.image);
      if (payload.gradientBgColor)
        formData.append("gradientBgColor", payload.gradientBgColor);
      if (payload.textColor) formData.append("textColor", payload.textColor);
      formData.append("links", JSON.stringify(payload.links));
      const response = await fetch(
        `/api/workspace/${payload.workspaceId}/project`,
        { method: "POST", body: formData }
      );
      if (!response.ok) {
        if (response.status === 403) {
          throw new Error("You don't have permission to create project");
        }
        throw new Error("Failed to create project");
      }
      const data = await response.json();
      return { data, workspaceId: payload.workspaceId };
    },
    onSuccess(data) {
      queryClient.invalidateQueries({
        queryKey: ["workspace", data.workspaceId],
      });
      toast.success("Project created successfully", {
        duration: 5000,
      });
    },
    onError(error) {
      toast.error(error.message ?? "Something went wrong", {
        duration: 5000,
      });
    },
  });
}
