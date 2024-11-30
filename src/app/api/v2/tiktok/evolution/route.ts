import { getTiktokApi } from "@/app/api/utils";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const since = searchParams.get("since");
  const until = searchParams.get("until");
  const response = await fetch(`${await getTiktokApi()}/api/v1/global/flows`, {
    method: "POST",
    body: JSON.stringify({ since, until }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  return Response.json(data);
}
