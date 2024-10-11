export async function POST(request: Request) {
  const payload: {
    type: "listAllProjects" | "listActiveProjects" | "getProjectInfo";
    projectId?: string;
  } = await request.json();
  const response = await fetch("http://192.168.1.90:2225/api/v1/project/cat", {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  return Response.json(data);
}
