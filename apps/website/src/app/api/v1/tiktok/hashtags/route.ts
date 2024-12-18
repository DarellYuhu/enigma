import { getTiktokApi } from "@/app/api/utils";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const hashtag = searchParams.get("hashtag");
  const response = await fetch(`${await getTiktokApi()}/api/v1/hashtags`, {
    method: "POST",
    body: JSON.stringify({ hashtag: hashtag }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return Response.json(data);
}
