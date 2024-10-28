import { getYoutubeApi } from "@/app/api/utils";
import { auth } from "@/lib/auth";
import YoutubeSchema from "@/schemas/youtube";
import { z } from "zod";

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const response = await fetch(`${await getYoutubeApi()}/api/v1/project/cat`, {
    method: "POST",
    body: JSON.stringify({ type: "getProjectConfig", projectId: params.id }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return Response.json(data);
}

export const PATCH = auth(async function PATCH(req) {
  const {
    APIs,
    getDetailsAfter,
    keywords,
    languageCode,
    monitorTopVideosEvery,
    projectId,
    regionCode,
    runEvery,
    status,
  }: z.infer<typeof YoutubeSchema.update> = await req.json();
  if (req.auth?.user.role === "USER")
    return Response.json({ message: "Unauthorized" }, { status: 403 });
  const response = await fetch(`${await getYoutubeApi()}/api/v1/project/edit`, {
    method: "POST",
    body: JSON.stringify({
      APIs,
      getDetailsAfter,
      keywords,
      languageCode,
      monitorTopVideosEvery,
      projectId,
      regionCode,
      runEvery,
      status: status ? "active" : "inactive",
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return Response.json(data);
});
