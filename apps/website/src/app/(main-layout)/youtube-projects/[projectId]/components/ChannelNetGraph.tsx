"use client";

import VisGraph from "@/components/VisGraph";
import useYoutubeChannelNet from "@/hooks/features/youtube/useYoutubeChannelNet";
import { useEffect, useState } from "react";
import useSelectedChannelStore from "../store/selected-channel-store";
import { DataSet } from "vis-data";
import useConfigStore from "../store/config-store";
import dateFormatter from "@/utils/dateFormatter";
import useProjectInfo from "@/hooks/features/useProjectInfo";
import adjustDateByFactor from "@/utils/adjustDateByFactor";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { Download, Expand } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { exportNetwork } from "@/utils/exportNetwork";

const ChannelNetGraph = ({ projectId }: { projectId: string }) => {
  const [label, setLabel] = useState(true);
  const { date, setDate } = useConfigStore();
  const { setChannel } = useSelectedChannelStore();
  const { data: projectInfo } = useProjectInfo("YOUTUBE", projectId);
  const { data, isPending } = useYoutubeChannelNet({
    projectId: projectId,
    window: 5,
    date: dateFormatter("ISO", date),
  });

  useEffect(() => {
    if (data) {
      setChannel(
        data.data.network.nodes.sort(
          (a, b) => b.centrality_pr - a.centrality_pr
        )[0].id
      );
    }
  }, [data]);

  useEffect(() => {
    if (projectInfo?.lastUpdate) {
      setDate(adjustDateByFactor(-1, new Date(projectInfo.lastUpdate)));
    }
  }, [projectInfo?.lastUpdate]);

  if (isPending) return <Skeleton className="w-full h-full" />;

  if (!data) return null;

  return (
    <>
      <VisGraph
        data={data.normalized}
        type="tagRelation"
        options={{ nodes: { font: { color: !label ? "#00000000" : "" } } }}
        events={{
          click: (event) => {
            const nodes = new DataSet(data.normalized.nodes);
            const node: any = nodes.get(event.nodes[0]);
            if (node && !Array.isArray(node)) {
              setChannel(node.data.id);
            }
          },
        }}
      />
      <div className="absolute top-2 right-2 flex gap-2 items-center">
        <Dialog>
          <DialogTrigger>
            <Button size={"icon"} variant={"outline"}>
              <Expand size={14} />
            </Button>
          </DialogTrigger>
          <DialogContent className="min-w-[90%] h-[90%]">
            <VisGraph
              data={data.normalized}
              type="tagRelation"
              options={{
                nodes: { font: { color: !label ? "#00000000" : "" } },
              }}
              events={{
                click: (event) => {
                  const nodes = new DataSet(data.normalized.nodes);
                  const node: any = nodes.get(event.nodes[0]);
                  if (node && !Array.isArray(node)) {
                    setChannel(node.data.id);
                  }
                },
              }}
            />
          </DialogContent>
        </Dialog>
        <Button
          size={"icon"}
          variant={"outline"}
          onClick={() =>
            exportNetwork(date, data?.data.network, "Channel Network")
          }
        >
          <Download />
        </Button>
        <Toggle
          pressed={label}
          onPressedChange={setLabel}
          className={buttonVariants({ variant: "outline" })}
        >
          Show Label
        </Toggle>
      </div>
    </>
  );
};

export default ChannelNetGraph;
