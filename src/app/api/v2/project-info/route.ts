import { Type } from "@prisma/client";
import { NextRequest } from "next/server";
import { getTiktokApi, getTwitterApi, getYoutubeApi } from "../../utils";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const projectId: string | null = searchParams.get("projectId");
  const projectType: Type | null = searchParams.get("projectType") as Type;

  let BASE_URL: string | undefined;

  switch (projectType) {
    case Type.YOUTUBE:
      BASE_URL = await getYoutubeApi();
      break;
    case Type.TWITTER:
      BASE_URL = await getTwitterApi();
      break;
    case Type.TIKTOK:
      BASE_URL = await getTiktokApi();
      break;
  }

  const response = await fetch(`${BASE_URL}/api/v1/project/cat`, {
    method: "POST",
    body: JSON.stringify({ type: "getProjectInfo", projectId }),
    headers: { "Content-Type": "application/json" },
  });

  const data = await response.json();

  return Response.json(data);
}
