"use client";

import Graph from "@/components/charts/Graph";
import useYoutubeVideoNet, {
  NodeVideoNetwork,
} from "@/hooks/features/youtube/useYoutubeVideoNet";

import useConfigStore from "../store/config-store";
import dateFormatter from "@/utils/dateFormatter";
import Link from "next/link";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { Download, Expand } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { exportNetwork } from "@/utils/exportNetwork";

const VideoNetGraph = ({ projectId }: { projectId: string }) => {
  const [label, setLabel] = useState(false);
  const [node, setNode] = useState<NodeVideoNetwork | null>(null);
  const { date } = useConfigStore();
  const { data, isPending } = useYoutubeVideoNet({
    projectId,
    window: 5,
    date: dateFormatter("ISO", date),
  });

  if (isPending) return <Skeleton className="h-full w-full" />;

  if (!data) return null;

  return (
    <>
      <Graph
        data={data.normalized}
        showDynamicLabels={label}
        onClick={(node) => {
          if (node) {
            setNode(node.data);
          } else {
            setNode(null);
          }
        }}
      />
      {node && (
        <div className="absolute bottom-2 w-96 left-2 h-3/5 flex flex-col gap-2 border rounded-md p-2 shadow-lg backdrop-blur-md">
          <h6 className="text-wrap">{node.title}</h6>
          <Link
            target="_blank"
            href={`https://www.youtube.com/watch?v=${node.id}`}
            className="bg-green-300 hover:bg-green-400 rounded-md p-1.5 text-sm text-center justify-center items-center"
          >
            View Video
          </Link>
          <span className="text-xs overflow-y-auto">{node.desc}</span>
        </div>
      )}
      <div className="absolute top-2 right-2 flex items-center gap-2">
        <Toggle
          pressed={label}
          onPressedChange={setLabel}
          className={buttonVariants({ variant: "outline" })}
        >
          Show Label
        </Toggle>
        <Button
          size={"icon"}
          variant={"outline"}
          onClick={() =>
            exportNetwork(date, data?.data.network, "Video Network")
          }
        >
          <Download />
        </Button>
        <Dialog>
          <DialogTrigger>
            <Button size={"icon"} variant={"outline"}>
              <Expand size={14} />
            </Button>
          </DialogTrigger>
          <DialogContent className="min-w-[90%] h-[90%]">
            <Graph
              data={data.normalized}
              showDynamicLabels={label}
              onClick={(node) => {
                if (node) {
                  setNode(node.data);
                } else {
                  setNode(null);
                }
              }}
            />
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default VideoNetGraph;
