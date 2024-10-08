type Payload = {
  type: "interestNet" | "tagRelation";
  project: string;
  since: string;
  until: string;
  string: string;
};

export default async function getGraphs(payload: Payload) {
  const response = await fetch("/api/v1/project/graphs", {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  console.log(data, "graphs");
  return data;
}
