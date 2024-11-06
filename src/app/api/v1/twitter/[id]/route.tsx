import { getTwitterApi } from "@/app/api/utils";
import { auth } from "@/lib/auth";

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const response = await fetch(`${await getTwitterApi()}/api/v1/project/cat`, {
    method: "POST",
    body: JSON.stringify({ type: "getProjectInfo", projectId: params.id }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return Response.json(data);
}

export const PATCH = auth(async function PATCH(
  request,
  { params }: { params?: { id?: string } }
) {
  if (request.auth?.user.role === "USER")
    return Response.json({ message: "Unauthorized" }, { status: 403 });
  const { keywords, status } = await request.json();
  const response1 = fetch(`${await getTwitterApi()}/api/v1/project/edit`, {
    method: "POST",
    body: JSON.stringify({ projectId: params?.id, keywords }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const response2 = fetch(
    `${await getTwitterApi()}/api/v1/project/activation`,
    {
      method: "POST",
      body: JSON.stringify({ projectId: params?.id, status }),
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
});
