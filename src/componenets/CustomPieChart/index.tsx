import React from "react";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

type Props = {
  data: any[];
  dataKey: string;
};

const CustomPieChart = ({ data, dataKey }: Props) => {
  return (
    <ResponsiveContainer width={"100%"} height={300}>
      <PieChart>
        <Pie
          data={data}
          innerRadius={50}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey={dataKey}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} />
          ))}
        </Pie>
        <Legend layout="vertical" align="center" verticalAlign="bottom" />
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CustomPieChart;
