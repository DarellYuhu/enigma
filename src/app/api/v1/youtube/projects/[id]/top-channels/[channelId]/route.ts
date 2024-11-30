import { getYoutubeApi } from "@/app/api/utils";
import { format } from "date-fns";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string; channelId: string } }
) {
  const searchParams = request.nextUrl.searchParams;
  const since = searchParams.get("since");
  const until = searchParams.get("until");
  const string = searchParams.get("string");

  const response = await fetch(`${await getYoutubeApi()}/api/v1/project/data`, {
    method: "POST",
    body: JSON.stringify({
      type: "channel-videos",
      projectId: params.id,
      since: format(new Date(since || ""), "yyyy-MM-dd"),
      until: format(new Date(until || ""), "yyyy-MM-dd"),
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
