"use client";

import { SankeyController, Flow } from "chartjs-chart-sankey";
import {
  Chart,
  Tooltip,
  Legend,
  TooltipOptions,
  LinearScale,
  CategoryScale,
  ChartTypeRegistry,
  TooltipItem,
} from "chart.js";
import { Chart as ChartJs } from "react-chartjs-2";
import zoomPlugin from "chartjs-plugin-zoom";
import { HashtagEvolution } from "@/api/twitterApi";

Chart.register(
  SankeyController,
  Flow,
  Tooltip,
  Legend,
  LinearScale,
  CategoryScale,
  zoomPlugin
);

const SankeyChartJs = ({ item }: { item: HashtagEvolution }) => {
  const data = {
    labels: ["From", "To", "Flow"],
    datasets: [
      {
        label: "My sankey",
        data: item.flow,
        colorMode: "gradient",
        alpha: 0.5,
        labels: Object.fromEntries(
          Object.entries(item.thread).map(([key, item]) => [key, item.class])
        ),
        column: Object.fromEntries(
          Object.entries(item.thread).map(([key, item]) => [key, item.window])
        ),
        priority: Object.fromEntries(
          Object.entries(item.thread).map(([key, item]) => [key, item.window])
        ),
        size: "max", // or 'min' if flow overlap is preferred
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    sankey: {
      node: {
        label: {
          fontName: "Times-Roman",
          fontSize: 20,
          bold: true,
          italic: true,
        },
      },
    },
    plugins: {
      zoom: {
        pan: {
          enabled: true,
          mode: "xy",
        },
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
          mode: "xy",
        },
      },
      legend: { position: "top" as const },
      colors: {
        forceOverride: true,
      },
      tooltip: {
        usePointStyle: false,
        enabled: true,
        callbacks: {
          label: ({
            raw,
          }: TooltipItem<keyof ChartTypeRegistry> & {
            raw: HashtagEvolution["flow"][0];
          }) => {
            return [
              "From: " +
                item.thread[raw.from].class +
                " " +
                item.window[item.thread[raw.from].window],

              "To: " +
                item.thread[raw?.to].class +
                " " +
                item.window[item.thread[raw.to].window],
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

  // @ts-ignore
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
