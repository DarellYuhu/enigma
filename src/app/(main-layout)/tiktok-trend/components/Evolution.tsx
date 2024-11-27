"use client";

import useGlobalEvolution from "@/hooks/features/tiktok/useGlobalEvolution";
import adjustDateByFactor from "@/utils/adjustDateByFactor";
import dynamic from "next/dynamic";
import useConfigStore from "../hooks/config-store";

const SankeyChartJs = dynamic(() => import("@/components/SankeyChartJs"));

const Evolution = () => {
  const { date } = useConfigStore();
  const { data } = useGlobalEvolution({
    since: adjustDateByFactor(-1, date),
    until: date,
  });
  return <div className="h-full">{data && <SankeyChartJs item={data} />}</div>;
};

export default Evolution;
