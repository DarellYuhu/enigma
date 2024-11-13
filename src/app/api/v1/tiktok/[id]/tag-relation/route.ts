import { getTiktokApi } from "@/app/api/utils";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const searchParams = request.nextUrl.searchParams;
  const project = params.id;
  const since = searchParams.get("since");
  const until = searchParams.get("until");
  const string = searchParams.get("string");
  const response = await fetch(
    `${await getTiktokApi()}/api/v1/project/graphs`,
    {
      method: "POST",
      body: JSON.stringify({
        type: "tagRelation",
        project,
        since,
        until,
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
