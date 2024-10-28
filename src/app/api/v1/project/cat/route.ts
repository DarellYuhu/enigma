import { getTiktokApi } from "@/app/api/utils";

export async function POST(request: Request) {
  const payload: {
    type: "listAllProjects" | "listActiveProjects" | "getProjectInfo";
    projectId?: string;
  } = await request.json();
  const response = await fetch(`${await getTiktokApi()}/api/v1/project/cat`, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  return Response.json(data);
}
