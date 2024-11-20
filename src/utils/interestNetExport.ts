import { InterestNetwork2 } from "@/hooks/useTiktokInterestNet2";

const interestNetExport = (
  since: Date,
  until: Date,
  interestNet: {
    nodes: InterestNetwork["network"]["nodes"];
    edges: InterestNetwork["network"]["edges"];
  }
) => {
  const sanitizeStr = (s: string) => {
    let i;
    if (s) {
      i = s.replace(/(\r\n|\n|\r|\s+|\t|&nbsp;)/gm, " ");
      i = i.replace(/"/g, '""');
      i = i.replace(/ +(?= )/g, "");
    } else {
      i = "";
    }
    return i;
  };

  const nodedef =
    "nodedef>name VARCHAR,label VARCHAR,publishedAt INT,desc VARCHAR,play INT,like INT,share INT,comment INT\r\n";
  const edgedef =
    "\r\nedgedef>node1 VARCHAR,node2 VARCHAR,weight INT,directed BOOLEAN\r\n";
  const nodes = interestNet.nodes
    .map((r) =>
      [
        r.id,
        r.author_name,
        r.published_at,
        "'" + sanitizeStr(r.desc) + "'",
        r.play,
        r.digg,
        r.share,
        r.comment,
      ].join(",")
    )
    .join("\r\n");
  const edges = interestNet.edges
    .map((r) => [r.from, r.to, r.value, 0].join(","))
    .join("\r\n");
  const res = nodedef + nodes + edgedef + edges;
  const h = document.createElement("a");

  h.setAttribute(
    "href",
    window.URL.createObjectURL(new Blob([res], { type: "gdf" }))
  );
  h.setAttribute(
    "download",
    [since, until, "InterestNetwork"].join("_") + ".gdf"
  );
  h.click();
  h.remove();
};

const interestNetExport2 = (
  since: Date,
  until: Date,
  interestNet: {
    nodes: InterestNetwork2["network"]["nodes"];
    edges: InterestNetwork2["network"]["edges"];
  }
) => {
  const sanitizeStr = (s: string) => {
    let i;
    if (s) {
      i = s.replace(/(\r\n|\n|\r|\s+|\t|&nbsp;)/gm, " ");
      i = i.replace(/"/g, '""');
      i = i.replace(/ +(?= )/g, "");
    } else {
      i = "";
    }
    return i;
  };

  const nodedef =
    "nodedef>name VARCHAR,label VARCHAR,publishedAt INT,desc VARCHAR,play INT,like INT,share INT,comment INT\r\n";
  const edgedef =
    "\r\nedgedef>node1 VARCHAR,node2 VARCHAR,weight INT,directed BOOLEAN\r\n";
  const nodes = interestNet.nodes
    .map((r) =>
      [
        r.id,
        r.author_name,
        r.published_at,
        "'" + sanitizeStr(r.desc) + "'",
        r.play,
        r.like,
        r.share,
        r.comment,
      ].join(",")
    )
    .join("\r\n");
  const edges = interestNet.edges
    .map((r) => [r.from, r.to, r.value, 0].join(","))
    .join("\r\n");
  const res = nodedef + nodes + edgedef + edges;
  const h = document.createElement("a");

  h.setAttribute(
    "href",
    window.URL.createObjectURL(new Blob([res], { type: "gdf" }))
  );
  h.setAttribute(
    "download",
    [since, until, "InterestNetwork"].join("_") + ".gdf"
  );
  h.click();
  h.remove();
};

export { interestNetExport, interestNetExport2 };
