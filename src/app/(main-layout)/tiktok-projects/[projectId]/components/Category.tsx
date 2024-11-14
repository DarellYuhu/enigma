"use client";

import React from "react";
import useCategoryStore from "@/store/category-store";
import CategoryButton from "@/components/CategoryButton";
import { Heart, MessageSquareMore, MonitorPlay, Share2 } from "lucide-react";
import { useTiktokTrends } from "@/hooks/useTiktokTrends";
import useStatisticDateStore from "@/store/statistic-date-store";
import { useQueryFilterStore } from "@/store/query-filter-store";

type categoryValue = "play" | "like" | "comment" | "share";

const Category = ({ projectId }: { projectId: string }) => {
  const { from, to } = useStatisticDateStore();
  const { category, setCategory } = useCategoryStore();
  const { query } = useQueryFilterStore();
  const { data } = useTiktokTrends({
    params: { projectId },
    statisticDate: {
      from,
      to,
    },
    query,
  });

  const handleCategory = (value: categoryValue) => {
    setCategory(value);
  };
  return (
    <div className="flex-1 col-span-full md:col-span-2 grid grid-cols-2 gap-3">
      <CategoryButton
        categoryState={category}
        label="Play"
        value={data?.count.play || 0}
        icon={<MonitorPlay width={20} height={20} />}
        category={"play"}
        handleCategory={handleCategory}
      />
      <CategoryButton
        categoryState={category}
        label="Like"
        value={data?.count.like || 0}
        icon={<Heart width={20} height={20} />}
        category={"like"}
        handleCategory={handleCategory}
      />
      <CategoryButton
        categoryState={category}
        label="Comment"
        value={data?.count.comment || 0}
        icon={<MessageSquareMore width={20} height={20} />}
        category={"comment"}
        handleCategory={handleCategory}
      />
      <CategoryButton
        categoryState={category}
        label="Share"
        value={data?.count.share || 0}
        icon={<Share2 width={20} height={20} />}
        category={"share"}
        handleCategory={handleCategory}
      />
    </div>
  );
};

export default Category;
