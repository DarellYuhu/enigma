import { Pie, PieConfig } from "@ant-design/charts";
import {
  Cell,
  Legend,
  // Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

type Props = {
  data: any[];
  dataKey: string;
  labelKey: string;
};

const CustomPieChart = ({ data, dataKey, labelKey }: Props) => {
  const config: PieConfig = {
    data,
    angleField: dataKey,
    colorField: labelKey,
    innerRadius: 0.6,
    label: {
      text: dataKey,
      style: {
        fontWeight: "bold",
      },
      formatter: (_: any, datum: any) =>
        Intl.NumberFormat("en-US", {
          notation: "compact",
          maximumFractionDigits: 1,
        }).format(datum[dataKey]),
    },
    legend: {
      color: {
        title: false,
        position: "bottom",
        rowPadding: 5,
      },
    },
    autoFit: true,
    style: {
      stroke: "#475569",
      inset: 1,
      radius: 10,
    },
  };
  return (
    // <ResponsiveContainer width={"100%"} height={300}>
    //   <PieChart>
    //     <Pie
    //       data={data}
    //       innerRadius={50}
    //       outerRadius={80}
    //       fill="#8884d8"
    //       paddingAngle={5}
    //       dataKey={dataKey}
    //     >
    //       {data.map((entry, index) => (
    //         <Cell key={`cell-${index}`} />
    //       ))}
    //     </Pie>
    //     <Legend layout="vertical" align="center" verticalAlign="bottom" />
    //     <Tooltip />
    //   </PieChart>
    // </ResponsiveContainer>
    <Pie {...config} />
  );
};

export default CustomPieChart;
