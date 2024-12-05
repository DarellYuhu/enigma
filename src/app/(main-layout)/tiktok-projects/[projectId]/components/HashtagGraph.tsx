"use client";

import TagInformation from "@/components/TagInformation";
import { Button } from "@/components/ui/button";
import VisGraph from "@/components/VisGraph";
import { useTiktokHashtagNet } from "@/hooks/useTiktokHashtagNet";
import { useQueryFilterStore } from "@/store/query-filter-store";
import tagRelationExport from "@/utils/tagRelationExport";
import { useEffect, useState } from "react";
import { DataSet } from "vis-data";
import useGraphConfigStore from "../store/graph-config-store";
import useProjectInfo from "@/hooks/features/useProjectInfo";
import adjustDateByFactor from "@/utils/adjustDateByFactor";

const HashtagGraph = ({ projectId }: { projectId: string }) => {
  const [tagNode, setTagNode] = useState(null);
  const { from, to, setTo } = useGraphConfigStore();
  const { query } = useQueryFilterStore();
  const projectInfo = useProjectInfo("TIKTOK", projectId);
  const { data } = useTiktokHashtagNet({
    params: { projectId },
    graphDate: {
      to,
      from,
    },
    graphQuery: query,
  });

  useEffect(() => {
    if (projectInfo.data?.lastUpdate) {
      setTo(adjustDateByFactor(-1, new Date(projectInfo.data.lastUpdate)));
    }
  }, [projectInfo.data?.lastUpdate]);

  if (!data?.normalized) return null;

  return (
    <>
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
