export async function POST(request: Request) {
  const {
    type,
  }: { type: "listAllProjects" | "listActiveProjects" | "getProjectInfo" } =
    await request.json();
  const response = await fetch("http://192.168.1.90:2225/api/v1/project/cat", {
    method: "POST",
    body: JSON.stringify({ type }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  console.log(data, "on server");

  return Response.json(data);
}
