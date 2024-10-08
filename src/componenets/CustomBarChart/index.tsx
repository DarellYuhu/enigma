import { Column, ColumnConfig } from "@ant-design/charts";

type Props = {
  data: { [key: string]: any }[];
  labelKey: string;
  dataKey: string;
};

const CustomBarChart = ({ data, labelKey, dataKey }: Props) => {
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
        labelFill: "#f1f5f9",
      },
      x: {
        labelAutoRotate: false,
        labelAutoHide: true,
        labelFill: "#f1f5f9",
      },
    },
    autoFit: true,
  };
  return (
    // <ResponsiveContainer width={"100%"} height={300}>
    //   <BarChart data={data}>
    //     <CartesianGrid strokeDasharray="3 3" />
    //     <XAxis dataKey={labelKey} />
    //     <YAxis />
    //     <Tooltip />
    //     <Bar dataKey={dataKey} fill="#8884d8" />
    //   </BarChart>
    // </ResponsiveContainer>
    <Column {...config} />
  );
};

export default CustomBarChart;
