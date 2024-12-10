"use client";

import VisGraph from "@/components/VisGraph";
import useTwitterHashtagNet2 from "@/hooks/features/twitter/useTwitterHashtagNet2";
import { Edge, Node } from "vis-network/declarations/entry-esnext";
import { useEffect } from "react";
import useClusterStore from "../store/cluster-store";
import useHashtagStore from "../store/hashtag-config-store";
import dateFormatter from "@/utils/dateFormatter";
import adjustDateByFactor from "@/utils/adjustDateByFactor";
import { Skeleton } from "@/components/ui/skeleton";

const HashtagNetGraph = ({ projectId }: { projectId: string }) => {
  const { date } = useHashtagStore();
  const { setHashtag, setDate } = useClusterStore();
  const { data, isPending } = useTwitterHashtagNet2({
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

  if (isPending) return <Skeleton className="h-80 w-full" />;

  return (
    <div className="w-full h-80 shadow-inner">
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
