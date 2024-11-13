"use client";

import Graph from "@/components/Graph";
import { Button } from "@/components/ui/button";
import useTiktokInterestNet2 from "@/hooks/useTiktokInterestNet2";
import useGraphDateStore from "@/store/graph-date-store";
import { interestNetExport2 } from "@/utils/interestNetExport";
import Link from "next/link";
import React, { useState } from "react";

const InterestGraph = ({ projectId }: { projectId: string }) => {
  const [node, setNode] = useState<any>(null);
  const { from, to } = useGraphDateStore();
  const { data } = useTiktokInterestNet2({
    projectId,
    window: 3,
  });

  if (!data) return null;

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
      <Button
        variant={"outline"}
        onClick={() => interestNetExport2(from!, to!, data.data.network)}
        className="absolute top-2 right-2"
      >
        Export (.gdf)
      </Button>
    </>
  );
};

export default InterestGraph;
