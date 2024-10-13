import normalizeInterestNetwork from "@/utils/normalizeInterestNetwork";
import normalizeTagRelation from "@/utils/normalizeTagRelation";

export default async function getGraphs(payload: GetGraphsPayload) {
  const response = await fetch("/api/v1/project/graphs", {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data: TagRelationNetwork | InterestNetwork = await response.json();
  if (payload.type === "interestNet") {
    return normalizeInterestNetwork(data as InterestNetwork);
  } else {
    return normalizeTagRelation(data as TagRelationNetwork);
  }
}
