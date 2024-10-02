import { useEffect, useRef } from "react";
import { Network } from "vis-network/standalone/esm/vis-network";

const VisNetworkGraph = () => {
  const networkRef = useRef(null);

  useEffect(() => {
    // Define nodes and edges data
    const nodes = [
      { id: 1, label: "Node 1" },
      { id: 2, label: "Node 2" },
      { id: 3, label: "Node 3" },
      { id: 4, label: "Node 4" },
      { id: 5, label: "Node 5" },
    ];

    const edges = [
      { from: 1, to: 2 },
      { from: 1, to: 3 },
      { from: 2, to: 4 },
      { from: 2, to: 5 },
    ];

    const data = { nodes, edges };
    const options = {
      nodes: {
        shape: "dot",
        size: 20,
        font: {
          size: 15,
          color: "#000",
        },
      },
      edges: {
        width: 2,
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
