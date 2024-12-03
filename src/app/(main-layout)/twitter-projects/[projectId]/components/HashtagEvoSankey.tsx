"use client";

import useTwitterHashtagEvo from "@/hooks/useTwitterHashtagEvo";
import dynamic from "next/dynamic";
import useHashtagStore from "../store/hashtag-config-store";
import adjustDateByFactor from "@/utils/adjustDateByFactor";
import dateFormatter from "@/utils/dateFormatter";

const SankeyChartJs = dynamic(() => import("@/components/SankeyChartJs"));

const HashtagEvoSankey = ({ projectId }: { projectId: string }) => {
  const { date } = useHashtagStore();
  const { data } = useTwitterHashtagEvo({
    project: projectId,
    string: "",
    since: dateFormatter("ISO", adjustDateByFactor(-3, date)),
    until: dateFormatter("ISO", date),
  });
  return (
    <div className="w-full h-80 shadow-inner">
      {data && <SankeyChartJs item={data} />}
    </div>
  );
};

export default HashtagEvoSankey;
