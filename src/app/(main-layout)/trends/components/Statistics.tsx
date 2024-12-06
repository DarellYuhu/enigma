"use client";
import useActorNetwork from "@/hooks/features/trends/useActorNetwork";
import React from "react";
import useConfigStore from "../store/config-store";
import dateFormatter from "@/utils/dateFormatter";
import RechartMultiLine from "@/components/charts/RechartMultiLine";

const Statistics = ({ details }: { details: string }) => {
  const { category, networkDate, networkType } = useConfigStore();
  const { data } = useActorNetwork({
    category,
    date: dateFormatter("ISO", networkDate),
    rid: details,
    window: parseInt(networkType),
  });

  if (!data) return null;

  return (
    <RechartMultiLine
      config={[
        {
          dataKey: "apl",
          color: "hsl(var(--chart-1))",
          label: "Average Path Length",
          labelKey: "date",
        },
        {
          dataKey: "largest_eig",
          color: "hsl(var(--chart-2))",
          label: "Eigen",
          labelKey: "date",
        },
        // {
        //   dataKey: "largest_eig_pct",
        //   color: "hsl(var(--chart-5))",
        //   label: "Largest EIG-PCT",
        //   labelKey: "date",
        // },
      ]}
      data={data.statistics}
    />
  );
};

export default Statistics;
