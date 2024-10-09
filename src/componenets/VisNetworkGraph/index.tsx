import { statistics } from "@/datas/statistics";
import { useEffect, useRef } from "react";
import { Network, Options } from "vis-network/standalone/esm/vis-network";

const VisNetworkGraph = () => {
  const networkRef = useRef(null);

  useEffect(() => {
    // Define nodes and edges data
    const nodes = statistics.relation.nodes;

    const edges = statistics.relation.edges;

    const data = { nodes, edges };
    const options: Options = {
      layout: {
        improvedLayout: false,
      },
      physics: {
        enabled: false,
        stabilization: {
          iterations: 500, // Change this to whatever is convenient for you
        },
      },
      nodes: {
        shape: "dot",
        size: 15,
        font: {
          size: 12,
          color: "#000",
        },
      },
      edges: {
        width: 5,
        color: {
          color: "#848484",
          highlight: "#848484",
          hover: "#848484",
        },
      },
      interaction: { hover: true },
    };

    // Initialize the network
    const network = new Network(networkRef.current, data, options);

    // Optional: Clean up function
    return () => {
      network.destroy();
    };
  }, []);

  return <div ref={networkRef} style={{ height: 300 }} />;
};

export default VisNetworkGraph;
