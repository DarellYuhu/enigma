import { getTiktokApi } from "@/app/api/utils";
import { auth } from "@/lib/auth";

export const POST = auth(async function POST(request) {
  if (request.auth?.user.role === "USER")
    return Response.json({ message: "Unauthorized" }, { status: 403 });
  const { projectId, keywords, status } = await request.json();
  const response1 = fetch(`${await getTiktokApi()}/api/v1/project/edit`, {
    method: "POST",
    body: JSON.stringify({ projectId, keywords }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const response2 = fetch(`${await getTiktokApi()}/api/v1/project/activation`, {
    method: "POST",
    body: JSON.stringify({ projectId, status }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const [data1, data2] = await Promise.all([response1, response2]);
  const data = {
    ...(await data1.json()),
    ...(await data2.json()),
  };
  return Response.json(data);
});
