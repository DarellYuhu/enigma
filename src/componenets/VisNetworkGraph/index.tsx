/* eslint-disable linebreak-style */
/* eslint-disable react/jsx-filename-extension */
import React, { useEffect, useRef } from "react";
import isEqual from "lodash/isEqual";
import differenceWith from "lodash/differenceWith";
import { DataSet } from "vis-data/peer/esm/vis-data";
import { Network } from "vis-network/peer/esm/vis-network";
import PropTypes from "prop-types";

import "vis-network/styles/vis-network.css";

const defaultOptions = {
  physics: false,
  autoResize: false,
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
  layout: {
    improvedLayout: false,
  },
};

const VisNetworkGraph = ({
  data,
  options = defaultOptions,
  events = {},
  style = { width: "100%", height: "100%" },
  getNetwork,
  getNodes,
  getEdges,
}) => {
  const nodes = useRef(new DataSet(data.nodes));
  const edges = useRef(new DataSet(data.edges));
  const network = useRef<Network>(null);
  const container = useRef<HTMLElement>(null);

  // network.current?.on("afterDrawing", () => {
  //   network.current?.setOptions({
  //     physics: {
  //       forceAtlas2Based: {
  //         theta: 0.8,
  //         avoidOverlap: 0.0,
  //         springConstant: 0.04,
  //         damping: 2.5,
  //         gravitationalConstant: -20,
  //       },
  //       solver: "forceAtlas2Based",
  //       minVelocity: 0.2,
  //       stabilization: false,
  //     },
  //   });
  // });

  useEffect(() => {
    network.current = new Network(
      container.current,
      { nodes: nodes.current, edges: edges.current },
      options
    );

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

VisNetworkGraph.propTypes = {
  data: PropTypes.object,
  options: PropTypes.object,
  events: PropTypes.object,
  style: PropTypes.object,
  getNetwork: PropTypes.func,
  getNodes: PropTypes.func,
  getEdges: PropTypes.func,
};

export default VisNetworkGraph;
