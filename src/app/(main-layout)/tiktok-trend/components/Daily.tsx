"use client";

import BarChart2 from "@/components/charts/BarChart2";
import { useTiktokTrends } from "@/hooks/useTiktokTrends";
import useCategoryStore from "@/store/category-store";
import { useQueryFilterStore } from "@/store/query-filter-store";
import useStatisticDateStore from "@/store/statistic-date-store";

const Daily = ({ projectId }: { projectId: string }) => {
  const { from, to } = useStatisticDateStore();
  const { category } = useCategoryStore();
  const { query } = useQueryFilterStore();
  const { data } = useTiktokTrends({
    params: { projectId },
    statisticDate: {
      from,
      to,
    },
    query,
  });
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
