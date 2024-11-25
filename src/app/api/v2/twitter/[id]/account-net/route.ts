import { getTwitterApi } from "@/app/api/utils";
import { NextRequest } from "next/server";

export async function GET(
  _request: NextRequest
  // { params }: { params: { id: string } }
) {
  // const searchParams = request.nextUrl.searchParams;
  // const date = searchParams.get("date");
  // const window = searchParams.get("window");
  const response = await fetch(
    `${await getTwitterApi()}/api/v2/project/graphs`,
    {
      method: "POST",
      body: JSON.stringify({
        type: "accountNetwork",
        // project: params.id,
        // date,
        // window,
        project: "KZEELiFRNTQhfNB",
        date: "2024-11-23",
        window: 1,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  return Response.json(data);
}
