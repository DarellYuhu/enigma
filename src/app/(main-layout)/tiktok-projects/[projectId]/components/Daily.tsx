"use client";

import BarChart2 from "@/components/charts/BarChart2";
import { Skeleton } from "@/components/ui/skeleton";
import { useTiktokTrends } from "@/hooks/features/tiktok/useTiktokTrends";
import useCategoryStore from "@/store/category-store";
import { useQueryFilterStore } from "@/store/query-filter-store";
import useStatisticDateStore from "@/store/statistic-date-store";

const Daily = ({ projectId }: { projectId: string }) => {
  const { from, to } = useStatisticDateStore();
  const { category } = useCategoryStore();
  const { query } = useQueryFilterStore();
  const { data, isPending } = useTiktokTrends({
    params: { projectId },
    statisticDate: {
      from,
      to,
    },
    query,
  });

  if (isPending)
    return (
      <div className="w-full h-full p-4">
        <Skeleton className="w-full h-full" />
      </div>
    );

  return (
    <BarChart2
      data={data?.daily || []}
      labelKey={"date"}
      dataKey={category}
      label={category}
      topLabel={false}
      brush
      fill="rgba(16,185,129,1)"
    />
  );
};

export default Daily;
