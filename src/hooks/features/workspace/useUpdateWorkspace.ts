import { UpdateWorkspace } from "@/schemas/workspace";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function useUpdateWorkspace() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      payload,
      id,
    }: {
      payload: Partial<UpdateWorkspace>;
      id: string;
    }) => {
      const response = await fetch(`/api/workspace/${id}`, {
        method: "PATCH",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();
      return data;
    },
    onSuccess(_, variables) {
      toast.success("Workspace updated successfully", { duration: 4000 });
      queryClient.invalidateQueries({ queryKey: ["workspace", variables.id] });
    },
    onError(err) {
      toast.error(err.message ?? "Something went wrong");
    },
  });
}
