"use client";

import useGlobalEvolution from "@/hooks/features/tiktok/useGlobalEvolution";
import adjustDateByFactor from "@/utils/adjustDateByFactor";
import dynamic from "next/dynamic";
import useConfigStore from "../hooks/config-store";
import { Skeleton } from "@/components/ui/skeleton";

const SankeyChartJs = dynamic(
  () => import("@/components/charts/SankeyChartJs")
);

const Evolution = () => {
  const { date } = useConfigStore();
  const { data, isPending } = useGlobalEvolution({
    since: adjustDateByFactor(-1, date),
    until: date,
  });

  if (isPending) return <Skeleton className="h-96 w-full" />;

  if (!Array.isArray(data?.flow)) return null;
  return <div className="h-full">{data && <SankeyChartJs item={data} />}</div>;
};

export default Evolution;
