"use client";

import { Button } from "@/components/ui/button";
import DateRangePicker from "@/components/ui/date-range-picker";
import { Input } from "@/components/ui/input";
import { useTiktokHashtagNet } from "@/hooks/useTiktokHashtagNet";
import { useTiktokInterestNet } from "@/hooks/useTiktokInterestNet";
import { useTiktokTrends } from "@/hooks/useTiktokTrends";
import useGraphDateStore from "@/store/graph-date-store";
import { useGraphQueryStore } from "@/store/graph-query-store";
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
  const hashtags = useTiktokHashtagNet({
    params: { projectId },
    graphQuery: query,
    graphDate: { from, to },
  });

  const handleSubmit = () => {
    statistics.refetch();
    hashtags.refetch();
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
      <Button onClick={handleSubmit}>Submit</Button>
    </div>
  );
};

const GraphFilter = ({ projectId }: { projectId: string }) => {
  const { from, to, setFrom, setTo, reset: dateReset } = useGraphDateStore();
  const { query, setQuery, reset: queryReset } = useGraphQueryStore();
  const interestNet = useTiktokInterestNet({
    params: { projectId },
    graphQuery: query,
    graphDate: { from, to },
  });

  const handleSubmit = () => {
    interestNet.refetch();
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
      <Button onClick={handleSubmit}>Submit</Button>
    </div>
  );
};

export { StatisticsFilter, GraphFilter };
