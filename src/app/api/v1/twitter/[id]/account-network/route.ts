import { getTwitterApi } from "@/app/api/utils";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const searchParams = request.nextUrl.searchParams;
  const string = searchParams.get("string");

  const response = await fetch(
    `${await getTwitterApi()}/api/v2/project/graphs`,
    {
      method: "POST",
      body: JSON.stringify({
        type: "accountNetwork",
        project: params.id,
        window: "7d",
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
