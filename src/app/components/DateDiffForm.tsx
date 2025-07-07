"use client";

import { useForm } from "react-hook-form";
import { getDateDiff } from "../lib/api";
import { useState } from "react";
import RangeDisplay from "./RangeDisplay";
import TimelineChart from "./TimelineChart";

type FormData = {
  outerStart: string;
  outerEnd: string;
  innerStart: string;
  innerEnd: string;
};

export default function DateDiffForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [result, setResult] = useState<string[]>([]);

  const onSubmit = async (data: FormData) => {
    const outer = `[${data.outerStart},${data.outerEnd})`;
    const inner = `[${data.innerStart},${data.innerEnd})`;
    const ranges = await getDateDiff(outer, inner);
    setResult(ranges);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md mx-auto p-4">
      <h2 className="text-xl font-bold">Date Range Difference</h2>

      <div>
        <label className="block">Outer Range Start</label>
        <input type="date" {...register("outerStart", { required: true })} className="border p-1 w-full" />
        {errors.outerStart && <span className="text-red-500 text-sm">Required</span>}
      </div>

      <div>
        <label className="block">Outer Range End</label>
        <input type="date" {...register("outerEnd", { required: true })} className="border p-1 w-full" />
        {errors.outerEnd && <span className="text-red-500 text-sm">Required</span>}
      </div>

      <div>
        <label className="block">Inner Range Start</label>
        <input type="date" {...register("innerStart", { required: true })} className="border p-1 w-full" />
        {errors.innerStart && <span className="text-red-500 text-sm">Required</span>}
      </div>

      <div>
        <label className="block">Inner Range End</label>
        <input type="date" {...register("innerEnd", { required: true })} className="border p-1 w-full" />
        {errors.innerEnd && <span className="text-red-500 text-sm">Required</span>}
      </div>

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Submit
      </button>

      {/* <RangeDisplay ranges={result} /> */}
      {result.length > 0 && (
  <>
    <RangeDisplay ranges={result} />
    <div className="mt-6">
      <h3 className="text-lg font-medium mb-2">Timeline Visualization</h3>
      <TimelineChart ranges={result} />
    </div>
  </>
)}
    </form>
  );
}
