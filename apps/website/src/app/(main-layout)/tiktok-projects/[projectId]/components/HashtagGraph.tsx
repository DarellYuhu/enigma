"use client";

import TagInformation from "@/components/TagInformation";
import { Button } from "@/components/ui/button";
import VisGraph from "@/components/VisGraph";
import { useTiktokHashtagNet } from "@/hooks/features/tiktok/useTiktokHashtagNet";
import { useQueryFilterStore } from "@/store/query-filter-store";
import tagRelationExport from "@/utils/tagRelationExport";
import { useEffect, useState } from "react";
import { DataSet } from "vis-data";
import useGraphConfigStore from "../store/graph-config-store";
import useProjectInfo from "@/hooks/features/useProjectInfo";
import adjustDateByFactor from "@/utils/adjustDateByFactor";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Expand } from "lucide-react";

const HashtagGraph = ({ projectId }: { projectId: string }) => {
  const [tagNode, setTagNode] = useState(null);
  const { from, to, setTo } = useGraphConfigStore();
  const { query } = useQueryFilterStore();
  const projectInfo = useProjectInfo("TIKTOK", projectId);
  const { data, isPending } = useTiktokHashtagNet({
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

  if (isPending)
    return (
      <div className="p-4 w-full h-full">
        <Skeleton className="w-full h-full" />
      </div>
    );

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
      <div className="absolute top-2 right-2 justify-items-center flex gap-2">
        <Dialog>
          <DialogTrigger>
            <Button size={"icon"} variant={"ghost"}>
              <Expand size={14} />
            </Button>
          </DialogTrigger>
          <DialogContent className="min-w-[90%] h-[90%]">
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
          </DialogContent>
        </Dialog>
        <Button
          variant={"outline"}
          onClick={() => tagRelationExport(from!, to!, data.data.relation)}
        >
          Export (.gdf)
        </Button>
      </div>
    </>
  );
};

export default HashtagGraph;
