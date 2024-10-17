export default async function getProjects(
  payload: GetProjectsPayload
): Promise<GetProjectsResult> {
  const response = await fetch("/api/v1/project/cat", {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
}
