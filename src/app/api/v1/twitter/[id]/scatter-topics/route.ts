import { getTwitterApi } from "@/app/api/utils";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const searchParams = request.nextUrl.searchParams;
  const date = searchParams.get("date");

  const response = await fetch(
    `${await getTwitterApi()}/api/v2/project/topics`,
    {
      method: "POST",
      body: JSON.stringify({
        type: "topics",
        project: params.id,
        date: new Date(date || "").toISOString().split("T")[0],
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const data = await response.json();
  return Response.json(data);
}
