import getColorVariable from "@/utils/getColorVariable";
import { Area, AreaConfig, LineConfig } from "@ant-design/charts";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Props = {
  data: { [key: string]: any }[];
  labelKey: string;
  dataKey: string;
  height?: number;
};

const CustomLineChart = ({ data, labelKey, dataKey, height }: Props) => {
  const color = getColorVariable("--indigo-9");
  console.log(color);
  const config: AreaConfig = {
    data,
    xField: labelKey,
    yField: dataKey,
    style: {
      fill: `linear-gradient(-90deg, white 0%, ${getColorVariable(
        "--indigo-9"
      )} 100%)`,
      padding: 0,
    },
    shapeField: "smooth",
    axis: {
      y: { label: false, grid: false, line: false, tick: false },
      x: {
        label: false,
      },
    },
    line: {
      shapeField: "smooth",
      style: {
        stroke: getColorVariable("--indigo-9"),
      },
      tooltip: false,
    },
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
    <Area height={height} padding={0} {...config} />
  );
};

export default CustomLineChart;
