export async function POST(request: Request) {
  const { type, project, since, until, string } = await request.json();
  const response = await fetch(
    "http://192.168.1.90:2225/api/v1/project/graphs",
    {
      method: "POST",
      body: JSON.stringify({
        type,
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
