import { YOUTUBE_BASE_API_URL } from "@/constants";
import updateYoutube from "@/schemas/youtube/updateProject";
import { z } from "zod";

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const response = await fetch(`${YOUTUBE_BASE_API_URL}/api/v1/project/cat`, {
    method: "POST",
    body: JSON.stringify({ type: "getProjectConfig", projectId: params.id }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return Response.json(data);
}

export async function PATCH(req: Request) {
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
  }: z.infer<typeof updateYoutube> = await req.json();
  const response = await fetch(`${YOUTUBE_BASE_API_URL}/api/v1/project/edit`, {
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
}
