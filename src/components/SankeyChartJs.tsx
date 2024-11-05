"use client";

import { SankeyController, Flow } from "chartjs-chart-sankey";
import {
  Chart,
  Tooltip,
  Legend,
  TooltipOptions,
  LinearScale,
  CategoryScale,
} from "chart.js";
import { Chart as ChartJs } from "react-chartjs-2";
import sankeyData from "@/data/sankey.json";

Chart.register(
  SankeyController,
  Flow,
  Tooltip,
  Legend,
  LinearScale,
  CategoryScale
);

const SankeyChartJs = () => {
  const data = {
    labels: ["From", "To", "Flow"],
    datasets: [
      {
        label: "My sankey",
        data: sankeyData.flow,
        // colorFrom: (c) => getColor(c.dataset.data[c.dataIndex].from),
        // colorTo: (c) => getColor(c.dataset.data[c.dataIndex].to),
        // hoverColorFrom: (c) => getHover(c.dataset.data[c.dataIndex].from),
        // hoverColorTo: (c) => getHover(c.dataset.data[c.dataIndex].to),
        colorMode: "gradient", // or 'from' or 'to'
        /* optionally override default alpha (0.5) applied to colorFrom and colorTo */
        alpha: 0.5,
        /* optional labels */
        // labels: {
        //   a: "Label A",
        //   b: "Label B",
        //   c: "Label C",
        //   d: "Label D",
        // },
        // /* optional priority */
        // priority: Object.fromEntries(
        //   Object.entries(sankeyData.thread).map(([key, item]) => [
        //     key,
        //     item.window,
        //   ])
        // ),
        // /* optional column overrides */
        column: Object.fromEntries(
          Object.entries(sankeyData.thread).map(([key, item]) => [
            key,
            item.window,
          ])
        ),
        size: "max", // or 'min' if flow overlap is preferred
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: { position: "top" as const },
      colors: {
        forceOverride: true,
      },

      tooltip: {
        usePointStyle: false,
        enabled: true,
        callbacks: {
          label: ({ raw }) => {
            return [
              "From: " +
                // @ts-ignore
                sankeyData.class[raw?.from] +
                " " +
                // @ts-ignore
                sankeyData.window[sankeyData.thread[raw.from].window],

              "To: " +
                // @ts-ignore
                sankeyData.class[raw?.to] +
                " " +
                // @ts-ignore
                sankeyData.window[sankeyData.thread[raw.to].window],
              // @ts-ignore
              "Flow: " + raw?.flow,
            ];
          },
        },
      } as TooltipOptions,
    },
    scales: {
      x: { display: false },
      y: { display: false },
    },
  };

  return <ChartJs type="sankey" data={data as any} options={options} />;
};

const generateColors = () => {
  const colors: string[] = [];
  for (let i = 0; i < 20; i++) {
    const color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    colors.push(color);
  }
  return colors;
};

export default SankeyChartJs;
