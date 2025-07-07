type Props = {
    ranges: string[];
  };
  
  export default function RangeDisplay({ ranges }: Props) {
    if (ranges.length === 0) return null;
  
    return (
      <div className="mt-4 border-t pt-2">
        <h3 className="font-semibold mb-2">Resulting Ranges:</h3>
        <ul className="list-disc pl-5">
          {ranges.map((r, i) => (
            <li key={i} className="text-sm">{r}</li>
          ))}
        </ul>
      </div>
    );
  }
  