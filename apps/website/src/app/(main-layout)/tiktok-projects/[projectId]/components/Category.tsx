"use client";

import useCategoryStore from "@/store/category-store";
import CategoryButton from "@/components/CategoryButton";
import { Heart, MessageSquareMore, MonitorPlay, Share2 } from "lucide-react";
import { useTiktokTrends } from "@/hooks/features/tiktok/useTiktokTrends";
import useStatisticDateStore from "@/store/statistic-date-store";
import { useQueryFilterStore } from "@/store/query-filter-store";
import { Skeleton } from "@/components/ui/skeleton";

type categoryValue = "play" | "like" | "comment" | "share";

const Category = ({ projectId }: { projectId: string }) => {
  const { from, to } = useStatisticDateStore();
  const { category, setCategory } = useCategoryStore();
  const { query } = useQueryFilterStore();
  const { data, isPending } = useTiktokTrends({
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

  if (isPending)
    return (
      <div className="grid grid-cols-12 gap-3 w-full">
        <Skeleton className="w-full h-full col-span-6" />
        <Skeleton className="w-full h-full col-span-6" />
        <Skeleton className="w-full h-full col-span-6" />
        <Skeleton className="w-full h-full col-span-6" />
      </div>
    );
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
