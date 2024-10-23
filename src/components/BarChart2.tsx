import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  ResponsiveContainer,
  XAxis,
} from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "./ui/chart";

type Props<T = unknown> = {
  data: { [key: string]: T }[];
  label: string;
  labelKey: string;
  dataKey: string;
};

const BarChart2 = ({ data, dataKey, labelKey, label }: Props) => {
  return (
    <ResponsiveContainer>
      <ChartContainer
        config={{
          [dataKey]: {
            color: "#3b82f6",
            label: label,
          },
        }}
      >
        <BarChart
          accessibilityLayer
          data={data}
          margin={{
            top: 20,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey={labelKey}
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => new Date(value).toLocaleDateString()}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Bar dataKey={dataKey} fill="#3b82f6" radius={8}>
            <LabelList
              position="top"
              offset={12}
              className="fill-foreground"
              fontSize={12}
            />
          </Bar>
        </BarChart>
      </ChartContainer>
    </ResponsiveContainer>
  );
};

export default BarChart2;
