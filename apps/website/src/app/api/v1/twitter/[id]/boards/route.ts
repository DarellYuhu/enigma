import { getTwitterApi } from "@/app/api/utils";
import { format } from "date-fns";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const searchParams = request.nextUrl.searchParams;
  const since = searchParams.get("since");
  const until = searchParams.get("until");
  const string = searchParams.get("string");

  const response = await fetch(
    `${await getTwitterApi()}/api/v1/project/boards`,
    {
      method: "POST",
      body: JSON.stringify({
        project: params.id,
        since: format(new Date(since || ""), "yyyy-MM-dd"),
        until: format(new Date(until || ""), "yyyy-MM-dd"),
        string,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  return Response.json(data);
}
