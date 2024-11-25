"use client";

import VisGraph from "@/components/VisGraph";
import useTwitterHashtagNet2 from "@/hooks/useTwitterHashtagNet2";
import { Edge, Node } from "vis-network/declarations/entry-esnext";
import useBoardConfigStore from "../store/board-config-store";
import { useEffect } from "react";
import useClusterStore from "../store/cluster-store";

const HashtagNetGraph = ({ projectId }: { projectId: string }) => {
  const { to } = useBoardConfigStore();
  const { setHashtag } = useClusterStore();
  // const { data } = useTwitterHashtagNet({
  //   project: projectId,
  //   string: "",
  //   since: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  //   until: new Date(),
  // });
  const { data } = useTwitterHashtagNet2({
    projectId,
    date: to!,
    window: 2,
  });

  useEffect(() => {
    if (data) {
      const firstNonEmptyClassKey = Object.keys(data.data.classes).find(
        (key) => data.data.classes[key].representation !== ""
      );
      if (firstNonEmptyClassKey) setHashtag(firstNonEmptyClassKey);
    }
  }, [data]);
  return (
    <div className="w-full h-80 shadow-inner">
      {/* <Graph
        simulationGravity={0.0}
        simulationRepulsion={1}
        simulationLinkSpring={0.4}
        data={(data as CosmographData<CosmosNode, CosmosLink>) ?? []}
        //   onClick={(node) => {
        //     if (node) {
        //       setTagNode(node.data);
        //     } else {
        //       setTagNode(null);
        //     }
        //   }}
      /> */}

      <VisGraph
        data={
          (data?.normalized.network as { nodes: Node[]; edges: Edge[] }) ?? []
        }
        type="tagRelation"
        minVelocity={0.5}
      />
    </div>
  );
};

export default HashtagNetGraph;
