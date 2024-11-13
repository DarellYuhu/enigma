import { getTiktokApi } from "@/app/api/utils";
import { auth } from "@/lib/auth";

export const PATCH = auth(async function PATCH(
  request,
  { params }: { params?: { id?: string } }
) {
  if (request.auth?.user.role === "USER")
    return Response.json({ message: "Unauthorized" }, { status: 403 });

  const projectId = params?.id;
  const { keywords, status } = await request.json();
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

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const projectId = params.id;
  const response = await fetch(`${await getTiktokApi()}/api/v1/project/cat`, {
    method: "POST",
    body: JSON.stringify({
      type: "getProjectInfo",
      projectId: projectId,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  return Response.json(data);
}
