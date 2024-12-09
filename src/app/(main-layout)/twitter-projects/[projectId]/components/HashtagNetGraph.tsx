"use client";

import VisGraph from "@/components/VisGraph";
import useTwitterHashtagNet2 from "@/hooks/features/twitter/useTwitterHashtagNet2";
import { Edge, Node } from "vis-network/declarations/entry-esnext";
import { useEffect } from "react";
import useClusterStore from "../store/cluster-store";
import useHashtagStore from "../store/hashtag-config-store";
import dateFormatter from "@/utils/dateFormatter";
import adjustDateByFactor from "@/utils/adjustDateByFactor";

const HashtagNetGraph = ({ projectId }: { projectId: string }) => {
  const { date } = useHashtagStore();
  const { setHashtag, setDate } = useClusterStore();
  const { data } = useTwitterHashtagNet2({
    projectId,
    date: dateFormatter("ISO", date),
    window: 2,
  });

  useEffect(() => {
    if (data) {
      const firstNonEmptyClassKey = Object.keys(data.data.classes).find(
        (key) => data.data.classes[key].representation !== ""
      );
      if (firstNonEmptyClassKey) setHashtag(firstNonEmptyClassKey);
      setDate(adjustDateByFactor(-1, new Date(data.data.date)));
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
