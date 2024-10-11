import { Column, ColumnConfig } from "@ant-design/charts";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

type Props = {
  data: { [key: string]: any }[];
  labelKey: string;
  dataKey: string;
};

const CustomBarChart = ({ data, labelKey, dataKey }: Props) => {
  const { theme } = useTheme();
  const [color, setColor] = useState("");
  const config: ColumnConfig = {
    data,
    height: 300,
    xField: dataKey,
    yField: labelKey,
    // tooltip: {
    //   // Tooltip customization
    //   formatter: (datum: ) => {
    //     return { name: datum.category, value: datum.value };
    //   },
    // },
    interactions: [{ type: "active-region" }],
    slider: {
      x: {
        style: {
          selectionFill: "#14b8a6",
          selectionFillOpacity: 0.5,
          handleLabelStrokeOpacity: 1,
        },
      },
    },
    style: {
      radiusTopLeft: 2,
      radiusTopRight: 2,
      fill: "rgba(16,185,129,1)",
    },
    axis: {
      y: {
        labelFormatter: "~s",
        labelFill: color,
      },
      x: {
        labelAutoRotate: false,
        labelAutoHide: true,
        labelFill: color,
      },
    },
    autoFit: true,
  };

  useEffect(() => {
    theme === "dark" ? setColor("#f1f5f9") : setColor("#000000");
  }, [theme]);
  return <Column {...config} />;
};

export default CustomBarChart;