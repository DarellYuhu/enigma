import ServiceSchema from "@/schemas/service";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { z } from "zod";

export function usePutService() {
  return useMutation({
    mutationFn: async (payload: z.infer<typeof ServiceSchema.putServices>) => {
      const normalized = Object.values(payload);
      const response = await fetch("/api/v1/services", {
        method: "PUT",
        body: JSON.stringify(normalized),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        if (response.status === 403) {
          throw new Error("You don't have permission to update services");
        }
        throw new Error("Failed to update services");
      }
      const data = await response.json();
      return data;
    },
    onSuccess() {
      toast.success("Data updated successfully", {
        position: "bottom-right",
        duration: 4000,
      });
    },
    onError(e) {
      toast.error(e.message ?? "Something went wrong!", {
        position: "bottom-right",
        duration: 4000,
      });
    },
  });
}
