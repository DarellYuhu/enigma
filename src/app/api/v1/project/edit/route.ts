export async function POST(request: Request) {
  const { projectId, keywords, status } = await request.json();
  const response1 = fetch("http://192.168.1.90:2225/api/v1/project/edit", {
    method: "POST",
    body: JSON.stringify({ projectId, keywords }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const response2 = fetch(
    "http://192.168.1.90:2225/api/v1/project/activation",
    {
      method: "POST",
      body: JSON.stringify({ projectId, status }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const [data1, data2] = await Promise.all([response1, response2]);
  const data = {
    ...(await data1.json()),
    ...(await data2.json()),
  };
  return Response.json(data);
}
