"use client";
import Datatable from "@/components/datatable/Datatable";
import useActorNetwork from "@/hooks/features/trends/useActorNetwork";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import useConfigStore from "../store/config-store";
import BarChart2 from "@/components/charts/BarChart2";

const Statistics = ({ details }: { details: string }) => {
  const { category } = useConfigStore();
  const { data } = useActorNetwork({
    category,
    date: "",
    rid: details,
    window: 60,
  });
  if (!data) return null;
  return (
    <BarChart2
      topLabel={false}
      data={data.statistics}
      dataKey="apl"
      label="Apl"
      labelKey="date"
      xAxis={true}
    />
  );
};

export default Statistics;
