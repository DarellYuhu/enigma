import { YOUTUBE_BASE_API_URL } from "@/constants";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string; channelId: string } }
) {
  const searchParams = request.nextUrl.searchParams;
  const since = searchParams.get("since");
  const until = searchParams.get("until");
  const string = searchParams.get("string");

  const response = await fetch(`${YOUTUBE_BASE_API_URL}/api/v1/project/data`, {
    method: "POST",
    body: JSON.stringify({
      type: "channel-videos",
      projectId: params.id,
      since: new Date(since || "").toISOString().split("T")[0],
      until: new Date(until || "").toISOString().split("T")[0],
      details: params.channelId,
      string,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  return Response.json(data);
}