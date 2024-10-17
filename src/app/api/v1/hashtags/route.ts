import { TIKTOK_BASE_API_URL } from "@/constants";

export async function POST(request: Request) {
  const { hashtag } = await request.json();
  const response = await fetch(`${TIKTOK_BASE_API_URL}/api/v1/hashtags`, {
    method: "POST",
    body: JSON.stringify({ hashtag }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return Response.json(data);
}
