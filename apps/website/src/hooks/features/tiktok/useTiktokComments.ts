import { useMutation } from "@tanstack/react-query";

export function useTiktokComments() {
  return useMutation({
    onSuccess(data) {
      const h = document.createElement("a");
      h.setAttribute("href", window.URL.createObjectURL(data));
      h.click();
      h.remove();
    },
    mutationFn: async (payload: { id: string; keywords: string }) => {
      const response = await fetch(
        `/api/v1/tiktok/${payload.id}/export-comments`,
        {
          method: "POST",
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.blob();
      return data;
    },
  });
}
