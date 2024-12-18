import { getTiktokApi } from "@/app/api/utils";

export async function POST(request: Request) {
  const { project, since, until, string } = await request.json();
  const response = await fetch(
    `${await getTiktokApi()}/api/v1/project/boards`,
    {
      method: "POST",
      body: JSON.stringify({
        project,
        since,
        until,
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
