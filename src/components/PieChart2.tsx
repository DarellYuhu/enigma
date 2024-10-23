import React from "react";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "./ui/chart";
import { Cell, Legend, Pie, PieChart } from "recharts";
import { Stalinist_One } from "next/font/google";

type Props<T = unknown> = {
  data: { [key: string]: T }[];
  dataKey: string;
  label: string;
  labelKey: string;
};

const PieChart2 = ({ data, dataKey, label, labelKey }: Props) => {
  const config: Record<string, { label: string; color: string }> = {};
  return (
    <ChartContainer
      config={config}
      className="mx-auto aspect-square max-h-[250px]"
    >
      <PieChart>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Legend />
        <Pie data={data} dataKey={dataKey} nameKey={labelKey} innerRadius={60}>
          {data.map((entry, index) => (
            <Cell
              fill={`#${Math.floor(Math.random() * 0xffffff)
                .toString(16)
                .padEnd(6, "0")}`}
            />
          ))}
        </Pie>
      </PieChart>
    </ChartContainer>
  );
};

export default PieChart2;
