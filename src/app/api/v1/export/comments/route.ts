import { getTiktokApi } from "@/app/api/utils";

export async function POST(request: Request) {
  const { id, keywords } = await request.json();
  const response = await fetch(
    `${await getTiktokApi()}/api/v1/export/comments`,
    {
      method: "POST",
      body: JSON.stringify({ id, keywords }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const blob = await response.blob();
  return new Response(blob, {
    headers: {
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    },
  });
}
