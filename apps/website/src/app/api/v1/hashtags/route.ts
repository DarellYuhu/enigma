import { getTiktokApi } from "../../utils";

export async function POST(request: Request) {
  const { hashtag } = await request.json();
  const response = await fetch(`${await getTiktokApi()}/api/v1/hashtags`, {
    method: "POST",
    body: JSON.stringify({ hashtag }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return Response.json(data);
}
