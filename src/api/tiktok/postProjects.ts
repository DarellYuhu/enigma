export default async function postProjects(payload: {
  projectName: string;
  keywords: string;
}) {
  const response = await fetch("/api/v1/project/create", {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
}
