import { getYoutubeApi } from "@/app/api/utils";

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const response = await fetch(`${await getYoutubeApi()}/api/v1/project/cat`, {
    method: "POST",
    body: JSON.stringify({ type: "getProjectInfo", projectId: params.id }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return Response.json(data);
}
