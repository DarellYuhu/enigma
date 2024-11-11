import { PieChart, PieArcSeries, ChartShallowDataShape } from "reaviz";
import React from "react";

type Props = {
  data: ChartShallowDataShape[];
};

const ReavizPie = ({ data }: Props) => {
  return (
    <PieChart
      data={data}
      series={
        <PieArcSeries doughnut={true} colorScheme="cybertron" innerRadius={1} />
      }
    />
  );
};

export default ReavizPie;
