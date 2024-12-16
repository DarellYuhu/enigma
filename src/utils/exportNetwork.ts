import { VisData } from "@/components/VisGraph";
import { toast } from "sonner";

type DefObject = Record<string, string | number | boolean>;

export const exportNetwork = (date: Date, network: VisData, name: string) => {
  try {
    const nodeDef = `nodedef>${createDefHelper(network.nodes[0])}\r\n`;
    const edgeDef = `\r\nedgedef>${createDefHelper(network.edges[0])}\r\n`;

    const nodes = network.nodes
      .map((item) =>
        [...Object.values(item)]
          .map((item) => {
            if (
              typeof item === "string" &&
              /(\r\n|\n|\r|\s+|\t|&nbsp;|")/.test(item)
            )
              return sanitizeStr(item);
            else return item;
          })
          .join(",")
      )
      .join("\r\n");
    const edges = network.edges
      .map((item) => [...Object.values(item)].join(","))
      .join("\r\n");

    const payload = nodeDef + nodes + edgeDef + edges;

    const h = document.createElement("a");

    h.setAttribute(
      "href",
      window.URL.createObjectURL(new Blob([payload], { type: "gdf" }))
    );
    h.setAttribute("download", [date, name].join("_") + ".gdf");
    h.click();
    h.remove();
  } catch {
    toast.error("Fail export network");
  }
};

const createDefHelper = (obj: DefObject) => {
  return Object.entries(obj)
    .map(([key, value]) => {
      let type: string = "";
      switch (typeof value) {
        case "string":
          type = "VARCHAR";
          break;
        case "number":
          type = "INT";
          break;
        case "boolean":
          type = "BOOLEAN";
          break;

        default:
          type = "UNKOWN_TYPE";
          break;
      }
      return `${key} ${type}`;
    })
    .join(",");
};

const sanitizeStr = (s: string) => {
  let i;
  if (s) {
    i = s.replace(/(\r\n|\n|\r|\s+|\t|&nbsp;)/gm, " ");
    i = i.replace(/"/g, '""');
    i = i.replace(/ +(?= )/g, "");
  } else {
    i = "";
  }
  return "'" + i + "'";
};
