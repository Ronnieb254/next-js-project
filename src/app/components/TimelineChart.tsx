// components/TimelineChart.tsx
import { Bar } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, BarElement, Tooltip, Title } from "chart.js";

Chart.register(CategoryScale, LinearScale, BarElement, Tooltip, Title);

export default function TimelineChart({ ranges }: { ranges: string[] }) {
  const labels = ranges.map((r, i) => `Segment ${i + 1}`);
  const durations = ranges.map(r => {
    const [start, end] = r.replace(/\[|\]|\(|\)/g, "").split(",");
    const diff = (new Date(end).getTime() - new Date(start).getTime()) / (1000 * 60 * 60 * 24);
    return Math.max(diff, 1); // Ensure at least 1 day
  });

  const data = {
    labels,
    datasets: [
      {
        label: "Duration (days)",
        data: durations,
        backgroundColor: "rgba(59, 130, 246, 0.5)",
        borderColor: "rgba(59, 130, 246, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // allows fixed height
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="w-full max-w-lg h-100 mx-auto">
      <Bar data={data} options={options} />
    </div>
  );
}
