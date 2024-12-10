"use client";

import Graph from "@/components/charts/Graph";
import { Button, buttonVariants } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import useTiktokInterestNet2 from "@/hooks/features/tiktok/useTiktokInterestNet2";
import { interestNetExport2 } from "@/utils/interestNetExport";
import Link from "next/link";
import { useState } from "react";
import useGraphConfigStore from "../store/graph-config-store";
import { Skeleton } from "@/components/ui/skeleton";

const InterestGraph = ({ projectId }: { projectId: string }) => {
  const [label, setLabel] = useState(false);
  const [node, setNode] = useState<any>(null);
  const { from, to } = useGraphConfigStore();
  const { data, isPending } = useTiktokInterestNet2({
    projectId,
    window: 3,
    date: to!,
  });

  if (isPending)
    return (
      <div className="w-full h-full p-4">
        <Skeleton className="w-full h-full" />
      </div>
    );

  if (!data?.data.date) return null;

  return (
    <>
      <Graph
        data={data.normalized.network}
        onClick={(node) => {
          if (node) {
            setNode(node.data);
          } else {
            setNode(null);
          }
        }}
        showDynamicLabel={label}
      />
      {node ? (
        <div className="absolute bottom-2 left-2 h-3/5 w-64 flex flex-col gap-2 border rounded-md p-2 shadow-lg backdrop-blur-md">
          <h6 className="text-wrap">{node.author_name}</h6>
          <Link
            target="_blank"
            href={`https://www.tiktok.com/@${node.author_name}/video/${node.id}`}
            className="bg-green-300 hover:bg-green-400 rounded-md p-1.5 text-sm text-center justify-center items-center"
          >
            View Video
          </Link>
          <span className="text-xs overflow-y-auto">{node.desc}</span>
        </div>
      ) : null}
      <div className="absolute top-2 right-2 space-x-3">
        <Toggle
          pressed={label}
          onPressedChange={setLabel}
          className={buttonVariants({ variant: "outline" })}
        >
          Show Label
        </Toggle>
        <Button
          variant={"outline"}
          onClick={() => interestNetExport2(from!, to!, data.data.network)}
        >
          Export (.gdf)
        </Button>
      </div>
    </>
  );
};

export default InterestGraph;
