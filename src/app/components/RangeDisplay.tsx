export default function RangeDisplay({ ranges }: { ranges: string[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {ranges.map((r, i) => (
        <div
          key={i}
          className="bg-blue-50 border border-blue-200 text-blue-700 p-3 rounded-md text-center font-mono text-sm"
        >
          {r}
        </div>
      ))}
    </div>
  );
}