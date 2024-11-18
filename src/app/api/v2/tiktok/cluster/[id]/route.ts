import { getTiktokApi } from "@/app/api/utils";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const searchParams = request.nextUrl.searchParams;
  const window = searchParams.get("window");
  const date = searchParams.get("date");

  const response = await fetch(
    `${await getTiktokApi()}/api/v2/global/clusters`,
    {
      method: "POST",
      body: JSON.stringify({
        date: new Date(date || "").toISOString().split("T")[0],
        window,
        cluster: params.id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const data = await response.json();
  return Response.json(data);
}
