import { TIKTOK_BASE_API_URL } from "@/constants";

export async function POST(request: Request) {
  const payload: {
    type: "listAllProjects" | "listActiveProjects" | "getProjectInfo";
    projectId?: string;
  } = await request.json();
  const response = await fetch(`${TIKTOK_BASE_API_URL}/api/v1/project/cat`, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  return Response.json(data);
}
