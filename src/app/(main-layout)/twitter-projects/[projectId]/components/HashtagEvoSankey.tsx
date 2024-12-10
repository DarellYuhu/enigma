"use client";

import useTwitterHashtagEvo from "@/hooks/features/twitter/useTwitterHashtagEvo";
import dynamic from "next/dynamic";
import useHashtagStore from "../store/hashtag-config-store";
import adjustDateByFactor from "@/utils/adjustDateByFactor";
import dateFormatter from "@/utils/dateFormatter";
import useProjectInfo from "@/hooks/features/useProjectInfo";
import { useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const SankeyChartJs = dynamic(
  () => import("@/components/charts/SankeyChartJs")
);

const HashtagEvoSankey = ({ projectId }: { projectId: string }) => {
  const { data: projectInfo } = useProjectInfo("TWITTER", projectId);
  const { date, setDate } = useHashtagStore();
  const { data, isPending } = useTwitterHashtagEvo({
    project: projectId,
    string: "",
    since: dateFormatter("ISO", adjustDateByFactor(-3, date)),
    until: dateFormatter("ISO", date),
  });

  useEffect(() => {
    if (projectInfo?.lastUpdate) {
      setDate(adjustDateByFactor(-1, new Date(projectInfo.lastUpdate)));
    }
  }, [projectInfo?.lastUpdate]);

  if (isPending) return <Skeleton className="h-80 w-full" />;

  return (
    <div className="w-full h-80 shadow-inner">
      {data && <SankeyChartJs item={data} />}
    </div>
  );
};

export default HashtagEvoSankey;
