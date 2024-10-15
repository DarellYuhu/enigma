import normalizeTagRelation from "@/utils/normalizeTagRelation";

export default async function getTagRelationGraphs(payload: GetGraphsPayload) {
  const response = await fetch("/api/v1/project/graphs/tag-relation-network", {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data: TagRelationNetwork = await response.json();
  return normalizeTagRelation(data);
}
