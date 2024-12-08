"use client";

import useTwitterHashtagEvo from "@/hooks/useTwitterHashtagEvo";
import dynamic from "next/dynamic";
import useHashtagStore from "../store/hashtag-config-store";
import adjustDateByFactor from "@/utils/adjustDateByFactor";
import dateFormatter from "@/utils/dateFormatter";
import useProjectInfo from "@/hooks/features/useProjectInfo";
import { useEffect } from "react";

const SankeyChartJs = dynamic(
  () => import("@/components/charts/SankeyChartJs")
);

const HashtagEvoSankey = ({ projectId }: { projectId: string }) => {
  const { data: projectInfo } = useProjectInfo("TWITTER", projectId);
  const { date, setDate } = useHashtagStore();
  const { data } = useTwitterHashtagEvo({
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
  return (
    <div className="w-full h-80 shadow-inner">
      {data && <SankeyChartJs item={data} />}
    </div>
  );
};

export default HashtagEvoSankey;
