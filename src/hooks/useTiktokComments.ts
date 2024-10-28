import { exportComments } from "@/api/tiktokApi";
import { useMutation } from "@tanstack/react-query";

export function useTiktokComments() {
  return useMutation({
    mutationFn: exportComments,
    onSuccess(data) {
      const h = document.createElement("a");
      h.setAttribute("href", window.URL.createObjectURL(data));
      h.click();
      h.remove();
    },
  });
}
