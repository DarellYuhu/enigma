"use client";

import AreaChart2 from "@/components/charts/AreaChart2";
import { useTiktokTrends } from "@/hooks/useTiktokTrends";
import useCategoryStore from "@/store/category-store";
import { useQueryFilterStore } from "@/store/query-filter-store";
import useStatisticDateStore from "@/store/statistic-date-store";

const Monthly = ({ projectId }: { projectId: string }) => {
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
    <AreaChart2
      data={data?.monthly || []}
      dataKey={category}
      label="Comments"
      labelKey="date"
    />
  );
};

export default Monthly;
