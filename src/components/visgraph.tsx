import React, { useEffect, useRef } from "react";
import { DataSet, DataInterface } from "vis-data/standalone/umd/vis-data";
import {
  Edge,
  Network,
  NetworkEvents,
  Node,
  Options,
} from "vis-network/standalone/umd/vis-network.min";

const defaultOptions = {
  nodes: {
    color: {
      highlight: "#00f2ea",
    },
    opacity: 0.85,
    borderWidth: 0.01,
    font: {
      strokeWidth: 0.01,
    },
  },

  edges: {
    color: {
      inherit: "both",
      opacity: 0.7,
    },
    smooth: false,
    arrows: {
      to: {
        enabled: false,
      },
    },
    width: 1,
  },

  physics: false,

  layout: {
    improvedLayout: true,
    clusterThreshold: 150,
  },

  interaction: {
    hover: false,
    navigationButtons: false,
    keyboard: false,
  },
};

interface VisGraphProps {
  type?: "interestNet" | "tagRelation";
  data: {
    nodes: Node[];
    edges: Edge[];
  };
  options?: Options;
  events?: {
    [key in NetworkEvents]?: (params: any) => void;
  };
  style?: React.CSSProperties;
  getNetwork?: (network: Network) => void;
  getNodes?: (nodes: DataSet<Node>) => void;
  getEdges?: (edges: DataSet<Edge>) => void;
}

const VisGraph = ({
  type = "interestNet",
  data,
  options = defaultOptions,
  events = {},
  style = { width: "100%", height: "100%" },
  getNetwork,
  getNodes,
  getEdges,
}: VisGraphProps) => {
  const nodes = useRef<any>(null);
  const edges = useRef<any>(null);
  const network = useRef<Network | null>(null);
  const container = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    nodes.current = new DataSet(data.nodes);
    edges.current = new DataSet(data.edges);
    network.current = new Network(
      container.current!,
      { nodes: nodes.current, edges: edges.current },
      options
    );

    network.current.on("afterDrawing", () => {
      if (type === "tagRelation") {
        network.current?.setOptions({
          physics: {
            solver: "barnesHut",
            barnesHut: {
              gravitationalConstant: -10000,
              avoidOverlap: 1,
            },
            minVelocity: 0.2,
            stabilization: false,
          },
        });
      } else {
        network.current?.setOptions({
          physics: {
            forceAtlas2Based: {
              theta: 0.8,
              avoidOverlap: 0.0,
              springConstant: 0.04,
              damping: 2.5,
              gravitationalConstant: -20,
            },
            solver: "forceAtlas2Based",
            minVelocity: 0.2,
            stabilization: false,
          },
        });
      }
    });

    if (getNetwork) {
      getNetwork(network.current);
    }

    if (getNodes) {
      getNodes(nodes.current);
    }

    if (getEdges) {
      getEdges(edges.current);
    }

    return () => {
      network.current?.destroy();
    };
  }, [data]);

  useEffect(() => {
    network.current?.setOptions(options);
  }, [options]);

  useEffect(() => {
    // Add user provied events to network
    // eslint-disable-next-line no-restricted-syntax
    for (const eventName of Object.keys(events)) {
      network.current?.on(
        eventName as NetworkEvents,
        (events as any)[eventName]
      );
    }

    return () => {
      for (const eventName of Object.keys(events)) {
        network.current?.off(
          eventName as NetworkEvents,
          (events as any)[eventName]
        );
      }
    };
  }, [events]);

  return <div ref={container} style={style} />;
};

export default VisGraph;
