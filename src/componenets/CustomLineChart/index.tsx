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
  return (
    // <ResponsiveContainer width="100%" height={300}>
    //   <LineChart data={data}>
    //     <CartesianGrid strokeDasharray="3 3" />
    //     <XAxis dataKey={labelKey} />
    //     <YAxis />
    //     <Tooltip />
    //     <Legend />
    //     <Line
    //       type="monotone"
    //       dataKey={dataKey}
    //       stroke="#8884d8"
    //       activeDot={{ r: 8 }}
    //     />
    //   </LineChart>
    // </ResponsiveContainer>
    <Area {...config} />
  );
};

export default CustomLineChart;
