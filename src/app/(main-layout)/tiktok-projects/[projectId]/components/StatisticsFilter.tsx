"use client";

import { Button } from "@/components/ui/button";
import DateRangePicker from "@/components/ui/date-range-picker";
import { Input } from "@/components/ui/input";
import { useTiktokBoards } from "@/hooks/useTiktokBoards";
import { useTiktokTrends } from "@/hooks/useTiktokTrends";
import { useQueryFilterStore } from "@/store/query-filter-store";
import useStatisticDateStore from "@/store/statistic-date-store";
import { useEffect } from "react";

const StatisticsFilter = ({ projectId }: { projectId: string }) => {
  const { query, setQuery, reset: queryReset } = useQueryFilterStore();
  const {
    from,
    to,
    setFrom,
    setTo,
    reset: dateReset,
  } = useStatisticDateStore();
  const statistics = useTiktokTrends({
    params: { projectId },
    query,
    statisticDate: { from, to },
  });
  const boards = useTiktokBoards({ projectId, string: query, from, to });

  const handleSubmit = () => {
    statistics.refetch();
    boards.refetch();
  };

  useEffect(() => {
    dateReset();
    queryReset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="flex flex-row gap-2">
      <DateRangePicker
        date={{ from, to }}
        setDate={(value) => {
          setFrom(value?.from);
          setTo(value?.to);
        }}
        className="w-fit"
      />
      <Input
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        placeholder="Filter"
      />
      <Button onClick={handleSubmit} disabled={!from || !to}>
        Submit
      </Button>
    </div>
  );
};

export default StatisticsFilter;
