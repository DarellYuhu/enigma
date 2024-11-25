"use client";

import useTwitterClusterStats from "@/hooks/useTwitterClusterStats";
import useBoardConfigStore from "../store/board-config-store";
import BarChart2 from "@/components/BarChart2";

const ClusterStatistics = ({ projectId }: { projectId: string }) => {
  const { from, to } = useBoardConfigStore();
  const { data } = useTwitterClusterStats({
    projectId,
    since: from,
    until: to,
    string: "",
  });
  if (!data) return null;
  return (
    <BarChart2
      data={data.normalized}
      dataKey="num_clusters_gc"
      labelKey="date"
      label="Number of Clusters"
    />
  );
};

export default ClusterStatistics;
