"use client";

import {
  Chart as ChartJS,
  BarElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { parseDaterange } from "../lib/parseRange";

ChartJS.register(BarElement, LinearScale, CategoryScale, Tooltip, Legend);

type Props = {
  ranges: string[];
};

export default function TimelineChart({ ranges }: Props) {
  const parsed = ranges
    .map(parseDaterange)
    .filter(Boolean)
    .map((r, i) => {
      const start = new Date(r!.start).getTime();
      const end = new Date(r!.end).getTime();
      return {
        label: `Range ${i + 1}`,
        start,
        duration: end - start,
      };
    });

  const data = {
    labels: parsed.map((r) => r.label),
    datasets: [
      {
        label: "Start (invisible)",
        data: parsed.map((r) => r.start),
        backgroundColor: "transparent",
        stack: "stack1",
      },
      {
        label: "Duration",
        data: parsed.map((r) => r.duration),
        backgroundColor: "rgba(59, 130, 246, 0.6)",
        stack: "stack1",
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    indexAxis: "y",
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: function (context) {
            const idx = context.dataIndex;
            const start = parsed[idx].start;
            const end = parsed[idx].start + parsed[idx].duration;
            const startStr = new Date(start).toISOString().split("T")[0];
            const endStr = new Date(end).toISOString().split("T")[0];
            return `${startStr} → ${endStr}`;
          },
        },
      },
    },
    scales: {
      x: {
        type: "linear",
        ticks: {
          callback: function (val: number | string) {
            return new Date(+val).toISOString().split("T")[0];
          },
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
}
