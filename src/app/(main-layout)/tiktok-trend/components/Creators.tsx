"use client";

import ReavizPie from "@/components/ReavizPie";
import { useTiktokTrends } from "@/hooks/useTiktokTrends";
import useCategoryStore from "@/store/category-store";
import { useQueryFilterStore } from "@/store/query-filter-store";
import useStatisticDateStore from "@/store/statistic-date-store";
import React from "react";

const Creators = ({ projectId }: { projectId: string }) => {
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
