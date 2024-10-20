import { YOUTUBE_BASE_API_URL } from "@/constants";
import createYoutube from "@/schemas/createYoutube";
import { z } from "zod";

export async function POST(request: Request) {
  const {
    APIs,
    backtrackSince,
    getDetailsAfter,
    keywords,
    languageCode,
    monitorTopVideosEvery,
    projectName,
    regionCode,
    runEvery,
  }: z.infer<typeof createYoutube> = await request.json();
  const response = await fetch(
    `${YOUTUBE_BASE_API_URL}/api/v1/project/create`,
    {
      method: "POST",
      body: JSON.stringify({
        APIs,
        backtrackSince,
        getDetailsAfter,
        keywords,
        languageCode,
        monitorTopVideosEvery,
        projectName,
        regionCode,
        runEvery,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  return Response.json(data);
}

export async function GET(_request: Request) {
  const response = await fetch(`${YOUTUBE_BASE_API_URL}/api/v1/project/cat`, {
    method: "POST",
    body: JSON.stringify({ type: "listAllProjects" }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  return Response.json(data);
}
