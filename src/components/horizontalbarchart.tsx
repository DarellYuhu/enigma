import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "./ui/chart";

type Props = {
  label: string;
  labelKey: string;
  dataKey: string;
  data: { [key: string]: any }[];
  selectedId?: string;
  onBarSelect: (item: YoutubeTopChannels["tc"]["0"]) => void;
};

const HorizontalBarChart = ({
  label,
  labelKey,
  dataKey,
  data,
  selectedId,
  onBarSelect,
}: Props) => {
  return (
    <ResponsiveContainer>
      <ChartContainer
        config={{
          [labelKey]: {
            label: label,
            color: "hsl(var(--chart-1))",
          },
        }}
      >
        <BarChart
          accessibilityLayer
          data={data}
          layout="vertical"
          margin={{
            right: 16,
          }}
        >
          <CartesianGrid horizontal={false} />
          <XAxis type="number" dataKey={dataKey} hide />
          <YAxis
            dataKey={labelKey}
            type="category"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            hide
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel indicator="line" />}
          />
          <Bar dataKey={dataKey} radius={5} fill="#f87171">
            {data.map((entry, index) => (
              <Cell
                fill={selectedId === entry.channel_id ? "#ef4444" : "#f87171"}
                key={`cell-${index}`}
                onClick={() =>
                  onBarSelect(entry as YoutubeTopChannels["tc"]["0"])
                }
              />
            ))}
            <LabelList
              dataKey={labelKey}
              position="insideLeft"
              offset={8}
              className="fill-[#fff]"
              fontSize={12}
            />
          </Bar>
        </BarChart>
      </ChartContainer>
    </ResponsiveContainer>
  );
};

export default HorizontalBarChart;
