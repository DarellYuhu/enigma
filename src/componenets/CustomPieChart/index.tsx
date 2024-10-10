import { Pie, PieConfig } from "@ant-design/charts";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

type Props = {
  data: any[];
  dataKey: string;
  labelKey: string;
};

const CustomPieChart = ({ data, dataKey, labelKey }: Props) => {
  const { theme } = useTheme();
  const [color, setColor] = useState("");

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
      stroke: color,
      inset: 1,
    },
  };

  useEffect(
    () => (theme === "dark" ? setColor("#475569") : setColor("#ffffff")),
    [theme]
  );

  return <Pie {...config} />;
};

export default CustomPieChart;
