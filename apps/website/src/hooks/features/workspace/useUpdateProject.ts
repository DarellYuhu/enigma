import { UpdateProject } from "@/schemas/project";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type Payload = {
  changedFields: Partial<keyof UpdateProject>[];
  values: UpdateProject;
  workspaceId: string;
  projectId: string;
};

export default function useUpdateProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      changedFields,
      values,
      workspaceId,
      projectId,
    }: Payload) => {
      const formData = new FormData();
      changedFields.forEach((field) => {
        switch (field) {
          case "image":
            formData.append("file", values.image);
            break;
          case "links":
            formData.append("links", JSON.stringify(values.links));
            break;
          default:
            formData.append(field, values[field]!);
        }
      });

      const response = await fetch(
        `/api/workspace/${workspaceId}/project/${projectId}`,
        { method: "PATCH", body: formData }
      );

      const data = await response.json();
      return data;
    },
    onSuccess(_, variables) {
      toast.success("Project updated successfully");
      queryClient.invalidateQueries({
        queryKey: ["workspace", variables.workspaceId],
      });
    },
    onError(err) {
      toast.error(err.message ?? "Something went wrong");
    },
  });
}
