"use client";

import VisGraph from "@/components/VisGraph";
import useYoutubeChannelNet from "@/hooks/features/youtube/useYoutubeChannelNet";
import { useEffect } from "react";
import useSelectedChannelStore from "../store/selected-channel-store";
import { DataSet } from "vis-data";
import useConfigStore from "../store/config-store";
import dateFormatter from "@/utils/dateFormatter";
import useProjectInfo from "@/hooks/features/useProjectInfo";
import adjustDateByFactor from "@/utils/adjustDateByFactor";
import { Skeleton } from "@/components/ui/skeleton";

const ChannelNetGraph = ({ projectId }: { projectId: string }) => {
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
    <VisGraph
      data={data.normalized}
      type="tagRelation"
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
  );
};

export default ChannelNetGraph;
