import { Brush, CartesianGrid, Line, LineChart, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";
import { format } from "date-fns";

type Props = {
  config: { dataKey: string; labelKey: string; label: string; color: string }[];
  data: { [key: string]: string | number }[];
  tickFormatter?: (value: any, index: number) => string;
};
const RechartMultiLine = ({
  config,
  data,
  tickFormatter = (value) =>
    value ? format(new Date(value), "yyyy-MM-dd") : "",
}: Props) => {
  return (
    <ChartContainer
      className="h-full w-full"
      config={
        config.reduce((acc: Record<string, object>, curr) => {
          acc[curr.dataKey] = { label: curr.label, color: curr.color };
          return acc;
        }, {}) satisfies ChartConfig
      }
    >
      <LineChart
        accessibilityLayer
        data={data}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <Brush height={20} dataKey={config[0].labelKey} travellerWidth={8} />
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey={config[0].labelKey}
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={tickFormatter}
        />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        {config.map((item, index) => (
          <Line
            key={index}
            dataKey={item.dataKey}
            type="monotone"
            stroke={item.color}
            strokeWidth={2}
            dot={false}
          />
        ))}
      </LineChart>
    </ChartContainer>
  );
};

export default RechartMultiLine;
