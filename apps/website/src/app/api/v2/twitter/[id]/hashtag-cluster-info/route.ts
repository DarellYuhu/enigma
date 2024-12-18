import { getTwitterApi } from "@/app/api/utils";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const searchParams = request.nextUrl.searchParams;
  const date = searchParams.get("date");
  const window = searchParams.get("window");
  const cluster = searchParams.get("cluster");
  const response = await fetch(
    `${await getTwitterApi()}/api/v2/project/clusters`,
    {
      method: "POST",
      body: JSON.stringify({
        type: "hashtagNetwork",
        project: params.id,
        date,
        window,
        cluster,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  return Response.json(data);
}
