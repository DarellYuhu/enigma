"use client";

import useTwitterHashtagEvo from "@/hooks/useTwitterHashtagEvo";
import dynamic from "next/dynamic";

const SankeyChartJs = dynamic(() => import("@/components/SankeyChartJs"));

const HashtagEvoSankey = ({ projectId }: { projectId: string }) => {
  const { data } = useTwitterHashtagEvo({
    project: projectId,
    string: "",
    since: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    until: new Date(),
  });
  return (
    <div className="w-full h-80 shadow-inner">
      {data && <SankeyChartJs item={data} />}
    </div>
  );
};

export default HashtagEvoSankey;
