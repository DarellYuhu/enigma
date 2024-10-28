import { putServices } from "@/api/serviceApi";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export function usePutService() {
  return useMutation({
    mutationFn: putServices,
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
