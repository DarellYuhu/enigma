"use client";

import TagInformation from "@/components/TagInformation";
import { Button } from "@/components/ui/button";
import VisGraph from "@/components/VisGraph";
import { useTiktokHashtagNet } from "@/hooks/useTiktokHashtagNet";
import { useQueryFilterStore } from "@/store/query-filter-store";
import tagRelationExport from "@/utils/tagRelationExport";
import { useState } from "react";
import { DataSet } from "vis-data";
import useGraphConfigStore from "../store/graph-config-store";

const HashtagGraph = ({ projectId }: { projectId: string }) => {
  const [tagNode, setTagNode] = useState(null);
  const { from, to } = useGraphConfigStore();
  const { query } = useQueryFilterStore();
  const { data } = useTiktokHashtagNet({
    params: { projectId },
    graphDate: {
      to,
      from,
    },
    graphQuery: query,
  });
  if (!data?.normalized) return null;
  return (
    <>
      {/* <Graph
        linkVisibilityDistanceRange={[50, 150]}
        simulationGravity={0.0}
        simulationRepulsion={1}
        simulationLinkSpring={0.4}
        data={data.normalized}
        onClick={(node) => {
          if (node) {
            setTagNode(node.data);
          } else {
            setTagNode(null);
          }
        }}
      /> */}
      <VisGraph
        data={data.normalized ?? []}
        type="tagRelation"
        events={{
          click: (event) => {
            const nodes = new DataSet(data.data.relation.nodes);
            const node = nodes.get(event.nodes[0]);
            if (node && !Array.isArray(node)) {
              setTagNode(node);
            } else {
              setTagNode(null);
            }
          },
        }}
      />
      {tagNode ? (
        <div className="absolute p-2 h-4/5 w-fit backdrop-blur-md border rounded-md shadow-md bottom-0 left-0 m-2">
          <TagInformation tagNode={tagNode} />
        </div>
      ) : null}
      <Button
        variant={"outline"}
        onClick={() => tagRelationExport(from!, to!, data.data.relation)}
        className="absolute top-2 right-2"
      >
        Export (.gdf)
      </Button>
    </>
  );
};

export default HashtagGraph;
