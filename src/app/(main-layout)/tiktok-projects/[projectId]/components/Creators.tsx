"use client";

import ReavizPie from "@/components/charts/ReavizPie";
import { Skeleton } from "@/components/ui/skeleton";
import { useTiktokTrends } from "@/hooks/features/tiktok/useTiktokTrends";
import useCategoryStore from "@/store/category-store";
import { useQueryFilterStore } from "@/store/query-filter-store";
import useStatisticDateStore from "@/store/statistic-date-store";

const Creators = ({ projectId }: { projectId: string }) => {
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
    <ReavizPie
      data={
        data?.topUsers[category].map((item) => ({
          key: item.user,
          data: item.value,
        })) || []
      }
    />
  );
};

export default Creators;
