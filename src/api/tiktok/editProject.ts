export default async function editProject(payload: EditProjectPayload) {
  const response = await fetch("/api/v1/project/edit", {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
}
