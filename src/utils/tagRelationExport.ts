const tagRelationExport = (
  since: Date,
  until: Date,
  tagRelation: {
    nodes: TagRelationNetwork["relation"]["nodes"];
    edges: TagRelationNetwork["relation"]["edges"];
  }
) => {
  const nodedef =
    "nodedef>name VARCHAR,label VARCHAR,videoCount INT,authorCount INT\r\n";
  const edgedef =
    "\r\nedgedef>node1 VARCHAR,node2 VARCHAR,weight INT,directed BOOLEAN\r\n";
  const nodes = tagRelation.nodes
    .map((r) => [r.id, r.id, r.videoCount, r.authorCount].join(","))
    .join("\r\n");
  const edges = tagRelation.edges
    .map((r) => [r.from, r.to, r.value, 0].join(","))
    .join("\r\n");
  const res = nodedef + nodes + edgedef + edges;
  const h = document.createElement("a");

  h.setAttribute(
    "href",
    window.URL.createObjectURL(new Blob([res], { type: "gdf" }))
  );
  h.setAttribute("download", [since, until, "HashtagMap"].join("_") + ".gdf");
  h.click();
  h.remove();
};

export default tagRelationExport;
