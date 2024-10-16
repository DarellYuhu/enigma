export default async function getExportComments(payload: {
  id: string;
  keywords: string;
}) {
  const response = await fetch("/api/v1/export/comments", {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.blob();
  return data;
}
