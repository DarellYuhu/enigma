import { BASE_API_URL } from "@/constants";

export async function POST(request: Request) {
  const { projectName, keywords } = await request.json();
  const response = await fetch(`${BASE_API_URL}/api/v1/project/create`, {
    method: "POST",
    body: JSON.stringify({ projectName, keywords }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return Response.json(data);
}
