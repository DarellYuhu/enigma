import { auth } from "@/lib/auth";
import { getTwitterApi } from "../../utils";

export const POST = auth(async function POST(request) {
  if (request.auth?.user.role === "USER")
    return Response.json({ message: "Unauthorized" }, { status: 403 });
  const { projectName, keywords } = await request.json();
  const response = await fetch(
    `${await getTwitterApi()}/api/v1/project/create`,
    {
      method: "POST",
      body: JSON.stringify({ projectName, keywords }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  return Response.json(data);
});

export async function GET() {
  const response = await fetch(`${await getTwitterApi()}/api/v1/project/cat`, {
    method: "POST",
    body: JSON.stringify({ type: "listAllProjects", projectId: "0" }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return Response.json(data);
}
