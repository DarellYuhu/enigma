"use client";

import Graph from "@/components/Graph";
import TagInformation from "@/components/TagInformation";
import { Button } from "@/components/ui/button";
import { useTiktokHashtagNet } from "@/hooks/useTiktokHashtagNet";
import { useQueryFilterStore } from "@/store/query-filter-store";
import useStatisticDateStore from "@/store/statistic-date-store";
import tagRelationExport from "@/utils/tagRelationExport";
import React, { useState } from "react";

const HashtagGraph = ({ projectId }: { projectId: string }) => {
  const [tagNode, setTagNode] = useState(null);
  const { from, to } = useStatisticDateStore();
  const { query } = useQueryFilterStore();
  const { data } = useTiktokHashtagNet({
    params: { projectId },
    graphDate: {
      from,
      to,
    },
    graphQuery: query,
  });
  if (!data?.normalized) return null;
  return (
    <>
      <Graph
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
