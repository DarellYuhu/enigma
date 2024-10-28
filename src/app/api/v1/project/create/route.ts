import { TIKTOK_BASE_API_URL } from "@/constants";
import { auth } from "@/lib/auth";

export const POST = auth(async function POST(request) {
  if (request.auth?.user.role === "USER")
    return Response.json({ message: "Unauthorized" }, { status: 403 });
  const { projectName, keywords } = await request.json();
  const response = await fetch(`${TIKTOK_BASE_API_URL}/api/v1/project/create`, {
    method: "POST",
    body: JSON.stringify({ projectName, keywords }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return Response.json(data);
});
