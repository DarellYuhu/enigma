import { BASE_API_URL } from "@/constants";

export async function POST(request: Request) {
  const { project, since, until, string } = await request.json();
  const response = await fetch(`${BASE_API_URL}/api/v1/project/boards`, {
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
  });
  const data = await response.json();
  return Response.json(data);
}
