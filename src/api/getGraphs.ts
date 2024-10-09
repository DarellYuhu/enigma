type Payload = {
  type: "interestNet" | "tagRelation";
  project: string;
  since: string;
  until: string;
  string: string;
};

export default async function getGraphs(
  payload: Payload
): Promise<TNetRelation> {
  const response = await fetch("/api/v1/project/graphs", {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  });
  let data = await response.json();

  data.relation.edges = data.relation.edges
    .filter((item: any) => item.isBackbone !== 0)
    .map((item: any) => {
      const { from, to, ...rest } = item;
      return {
        ...rest,
        source: from,
        target: to,
      };
    });
  data.relation.nodes = data.relation.nodes.filter(
    (item: any) => item.isinBackbone !== 0
  );

  console.log(data.relation, "on api call");
  return data.relation;
}
