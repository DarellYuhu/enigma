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
    `${await getTiktokApi()}/api/v2/project/graphs`,
    {
      method: "POST",
      body: JSON.stringify({
        type: "interestNet",
        project: params.id,
        window,
        date,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const data = await response.json();
  return Response.json(data);
}
