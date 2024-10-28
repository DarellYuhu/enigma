import { getYoutubeApi } from "@/app/api/utils";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const searchParams = request.nextUrl.searchParams;
  const since = searchParams.get("since");
  const until = searchParams.get("until");
  const string = searchParams.get("string");

  const response = await fetch(`${await getYoutubeApi()}/api/v1/project/data`, {
    method: "POST",
    body: JSON.stringify({
      type: "audience-network",
      projectId: params.id,
      since: new Date(since || "").toISOString().split("T")[0],
      until: new Date(until || "").toISOString().split("T")[0],
      string,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.text();
  return Response.json(data);
}
