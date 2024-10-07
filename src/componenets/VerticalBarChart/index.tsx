import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Props = {
  data: any[];
  labelKey: string;
  dataKey: string;
  height?: number;
};

const VerticalBarChart = ({ data, dataKey, labelKey, height = 300 }: Props) => {
  return (
    <ResponsiveContainer width={"100%"} height={height}>
      <BarChart data={data} layout="vertical">
        <XAxis type="number" />
        <YAxis type="category" hide dataKey={labelKey} />
        <Tooltip />
        <CartesianGrid strokeDasharray="3 3" />
        <Legend />
        <Bar dataKey={dataKey} fill="#8884d8">
          <LabelList
            dataKey={labelKey}
            position="insideLeft"
            style={{ fill: "#fff", fontSize: "14px" }}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default VerticalBarChart;
