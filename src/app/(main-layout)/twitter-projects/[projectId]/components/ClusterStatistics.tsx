"use client";

import useTwitterClusterStats, {
  ClusterStats,
} from "@/hooks/useTwitterClusterStats";
import RechartArea from "@/components/RechartArea";
import SingleSelect from "@/components/SingleSelect";
import { useState } from "react";
import DateRangePicker from "@/components/ui/date-range-picker";
import adjustDateByFactor from "@/utils/adjustDateByFactor";

const ClusterStatistics = ({ projectId }: { projectId: string }) => {
  const [date, setDate] = useState<{ since?: Date; until?: Date }>({
    since: adjustDateByFactor(-3, new Date()),
    until: new Date(),
  });
  const [type, setType] =
    useState<keyof Omit<ClusterStats["ts"], "date">>("num_clusters_gc");
  const { data } = useTwitterClusterStats({
    projectId,
    since: date.since!,
    until: date.until!,
    string: "",
  });
  return (
    <>
      <RechartArea
        data={data?.normalized || []}
        labelKey="date"
        dataKey={type}
        label="Number of Clusters"
        xAxisHide={true}
      />
      <div className="absolute right-4 top-4 flex flex-row gap-4">
        <DateRangePicker
          date={{ from: date.since, to: date.until }}
          setDate={(value) =>
            setDate({
              since: value?.from,
              until: value?.to,
            })
          }
        />
        <SingleSelect
          selections={selections}
          value={type}
          setValue={(value) => setType(value as typeof type)}
          placeholder="Select a type"
        />
      </div>
    </>
  );
};

const selections = [
  {
    label: "Number of clusters in GC",
    value: "num_clusters_gc",
  },
  {
    label: "Number of CC",
    value: "num_cc",
  },
  {
    label: "Number of clusters",
    value: "num_clusters",
  },
];

export default ClusterStatistics;
