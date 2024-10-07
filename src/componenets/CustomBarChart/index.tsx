import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Props = {
  data: any[];
  labelKey: string;
  dataKey: string;
};

const CustomBarChart = ({ data, labelKey, dataKey }: Props) => {
  return (
    <ResponsiveContainer width={"100%"} height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={labelKey} />
        <YAxis />
        <Tooltip />
        <Bar dataKey={dataKey} fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CustomBarChart;
