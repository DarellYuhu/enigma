export default async function getProject(payload: {
  projectId?: string;
}): Promise<GetProjectResult> {
  const response = await fetch("/api/v1/project/cat", {
    method: "POST",
    body: JSON.stringify({ type: "getProjectInfo", ...payload }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
}
