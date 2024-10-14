import React, { useEffect, useRef } from "react";
import isEqual from "lodash/isEqual";
import differenceWith from "lodash/differenceWith";
import { DataSet } from "vis-data/peer/esm/vis-data";
import {
  Edge,
  Network,
  NetworkEvents,
  Node,
  Options,
} from "vis-network/peer/esm/vis-network";

import "vis-network/styles/vis-network.css";

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
  data,
  options = defaultOptions,
  events = {},
  style = { width: "100%", height: "100%" },
  getNetwork,
  getNodes,
  getEdges,
}: VisGraphProps) => {
  const nodes = useRef(new DataSet(data.nodes));
  const edges = useRef(new DataSet(data.edges));
  const network = useRef(null);
  const container = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    network.current = new Network(
      container.current,
      { nodes: nodes.current, edges: edges.current },
      options
    );

    network.current.on("afterDrawing", () => {
      network.current.setOptions({
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
  }, []);

  useEffect(() => {
    const nodesChange = !isEqual(nodes.current, data.nodes);
    const edgesChange = !isEqual(edges.current, data.edges);

    if (nodesChange) {
      const idIsEqual = (n1, n2) => n1.id === n2.id;
      const nodesRemoved = differenceWith(
        nodes.current.get(),
        data.nodes,
        idIsEqual
      );
      const nodesAdded = differenceWith(
        data.nodes,
        nodes.current.get(),
        idIsEqual
      );
      const nodesChanged = differenceWith(
        differenceWith(data.nodes, nodes.current.get(), isEqual),
        nodesAdded
      );

      nodes.current.remove(nodesRemoved);
      nodes.current.add(nodesAdded);
      nodes.current.update(nodesChanged);
    }

    if (edgesChange) {
      const edgesRemoved = differenceWith(
        edges.current.get(),
        data.edges,
        isEqual
      );
      const edgesAdded = differenceWith(
        data.edges,
        edges.current.get(),
        isEqual
      );
      const edgesChanged = differenceWith(
        differenceWith(data.edges, edges.current.get(), isEqual),
        edgesAdded
      );
      edges.current.remove(edgesRemoved);
      edges.current.add(edgesAdded);
      edges.current.update(edgesChanged);
    }

    if ((nodesChange || edgesChange) && getNetwork) {
      getNetwork(network.current);
    }

    if (nodesChange && getNodes) {
      getNodes(nodes.current);
    }

    if (edgesChange && getEdges) {
      getEdges(edges.current);
    }
  }, [data]);

  useEffect(() => {
    network.current.setOptions(options);
  }, [options]);

  useEffect(() => {
    // Add user provied events to network
    // eslint-disable-next-line no-restricted-syntax
    for (const eventName of Object.keys(events)) {
      network.current.on(eventName, events[eventName]);
    }

    return () => {
      for (const eventName of Object.keys(events)) {
        network.current.off(eventName, events[eventName]);
      }
    };
  }, [events]);

  return <div ref={container} style={style} />;
};

export default VisGraph;
