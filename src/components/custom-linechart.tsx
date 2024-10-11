import { Area, AreaConfig } from "@ant-design/charts";

type Props = {
  data: { [key: string]: any }[];
  labelKey: string;
  dataKey: string;
  height?: number;
};

const CustomLineChart = ({ data, labelKey, dataKey, height }: Props) => {
  const config: AreaConfig = {
    data,
    xField: labelKey,
    yField: dataKey,
    style: {
      fill: `linear-gradient(-90deg, rgba(16,185,129,0.2) 0%, rgba(16,185,129,1) 100%)`,
    },
    padding: 0,
    shapeField: "smooth",
    axis: {
      y: { label: false, grid: false, line: false, tick: false },
      x: {
        label: false,
        tickStroke: "#cbd5e1",
      },
    },
    line: {
      shapeField: "smooth",
      style: {
        stroke: "rgba(16,185,129,1)",
      },
      tooltip: false,
    },
    interaction: {
      tooltip: {
        crosshairs: false,
      },
    },
    autoFit: true,
  };
  return <Area {...config} />;
};

export default CustomLineChart;
