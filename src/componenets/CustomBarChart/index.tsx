import getColorVariable from "@/utils/getColorVariable";
import { Column, ColumnConfig } from "@ant-design/charts";
import {
  // Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Props = {
  data: { [key: string]: any }[];
  labelKey: string;
  dataKey: string;
};

const CustomBarChart = ({ data, labelKey, dataKey }: Props) => {
  const config: ColumnConfig = {
    data,
    height: 300,
    xField: dataKey,
    yField: labelKey,
    // tooltip: {
    //   // Tooltip customization
    //   formatter: (datum: ) => {
    //     return { name: datum.category, value: datum.value };
    //   },
    // },
    interactions: [{ type: "active-region" }],
    slider: {
      x: {},
    },
    style: {
      radiusTopLeft: 2,
      radiusTopRight: 2,
      fill: getColorVariable("--indigo-9"),
    },
    axis: {
      y: {
        labelFormatter: "~s",
      },
      x: {
        labelAutoRotate: false,
        labelAutoHide: true,
      },
    },
  };
  return (
    // <ResponsiveContainer width={"100%"} height={300}>
    //   <BarChart data={data}>
    //     <CartesianGrid strokeDasharray="3 3" />
    //     <XAxis dataKey={labelKey} />
    //     <YAxis />
    //     <Tooltip />
    //     <Bar dataKey={dataKey} fill="#8884d8" />
    //   </BarChart>
    // </ResponsiveContainer>
    <Column {...config} />
  );
};

export default CustomBarChart;
