import { ChartContainer, ChartTooltip, ChartTooltipContent } from "./ui/chart";
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Line,
  XAxis,
  YAxis,
} from "recharts";

type Props = {
  labelKey: string;
  barLabel: string;
  lineLabel: string;
  barDataKey: string;
  lineDataKey: string;
  data: { [key: string]: any }[];
};

const ComposedBarLine = ({
  labelKey,
  barLabel,
  lineLabel,
  barDataKey,
  lineDataKey,
  data,
}: Props) => {
  return (
    <ChartContainer
      config={{
        [barDataKey]: {
          color: "hsl(var(--chart-1))",
          label: barLabel,
        },
        [lineDataKey]: {
          color: "hsl(var(--chart-2))",
          label: lineLabel,
        },
      }}
    >
      <ComposedChart accessibilityLayer data={data}>
        <CartesianGrid vertical={false} />
        <YAxis yAxisId={"left"} dataKey={barDataKey} type="number" />
        <YAxis
          yAxisId={"right"}
          dataKey={lineDataKey}
          type="number"
          orientation="right"
        />
        <XAxis
          dataKey={labelKey}
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value: number) =>
            new Date(value).toLocaleDateString()
          }
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Bar
          yAxisId={"left"}
          dataKey={barDataKey}
          radius={8}
          fill="hsl(var(--chart-1))"
        />
        <Line
          yAxisId={"right"}
          dataKey={lineDataKey}
          type="monotone"
          strokeWidth={2}
          dot={false}
          stroke="hsl(var(--chart-2))"
        />
      </ComposedChart>
    </ChartContainer>
  );
};

export default ComposedBarLine;
