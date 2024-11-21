import { Button } from "@/components/ui/button";
import DateRangePicker from "@/components/ui/date-range-picker";
import { Input } from "@/components/ui/input";
import { useQueryFilterStore } from "@/store/query-filter-store";
import useStatisticDateStore from "@/store/statistic-date-store";
import React, { useEffect } from "react";

const Configuration = () => {
  const { query, setQuery } = useQueryFilterStore();
  const { reset, from, to, setFrom, setTo } = useStatisticDateStore();
  useEffect(() => {
    reset();
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
      <Button
      //   onClick={() => {
      //     topVideos.refetch();
      //     videoStats.refetch();
      //     audienceNetwork.refetch();
      //     channelTopVids.refetch();
      //   }}
      >
        Submit
      </Button>
    </div>
  );
};

export default Configuration;
