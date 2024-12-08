import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function useDeleteSection() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/workspace/${id}/section`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete section");
      }
    },
    onSuccess() {
      toast.success("Section deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["sections"] });
    },
    onError(err) {
      toast.error(err.message ?? "Something went wrong");
    },
  });
}
