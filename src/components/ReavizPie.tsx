import {
  PieChart,
  PieArcSeries,
  ChartShallowDataShape,
  PieChartProps,
} from "reaviz";
import React from "react";

type Props = {
  data: ChartShallowDataShape[];
} & PieChartProps;

const ReavizPie = ({ data, ...props }: Props) => {
  return (
    <PieChart
      {...props}
      data={data}
      series={
        <PieArcSeries doughnut={true} colorScheme="cybertron" innerRadius={1} />
      }
    />
  );
};

export default ReavizPie;