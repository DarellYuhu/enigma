import { Bar, BarConfig } from "@ant-design/plots";

type Props = {
  data: { [key: string]: any }[];
  labelKey: string;
  dataKey: string;
  color: string;
};

const VerticalBarChart = ({ data, dataKey, labelKey, color }: Props) => {
  const config: BarConfig = {
    data,
    xField: labelKey,
    yField: dataKey,
    label: {
      text: labelKey,
      position: "left",
    },
    colorField: color,
    axis: {
      x: {
        tick: false,
        label: false,
      },
      y: {
        label: true,
        formatter: ".1%",
      },
    },
    tooltip: {
      field: dataKey,
      valueFormatter: (d: number) => d.toFixed(2),
    },
    autoFit: true,
  };
  return <Bar {...config} />;
};

export default VerticalBarChart;
