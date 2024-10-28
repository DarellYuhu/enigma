import { YOUTUBE_BASE_API_URL } from "@/constants";
import { auth } from "@/lib/auth";
import YoutubeSchema from "@/schemas/youtube";
import { z } from "zod";

export const POST = auth(async function POST(request) {
  if (request.auth?.user.role === "USER")
    return Response.json({ message: "Unauthorized" }, { status: 403 });
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
  }: z.infer<typeof YoutubeSchema.create> = await request.json();
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
});

export async function GET() {
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
