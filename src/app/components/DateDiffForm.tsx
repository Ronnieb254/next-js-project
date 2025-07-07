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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-100 py-12 px-4 md:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-3xl p-10 md:p-12 space-y-10 border border-blue-100">
        <header className="text-center space-y-2">
          <h1 className="text-4xl font-extrabold text-blue-700">📅 Date Range Diff Tool</h1>
          <p className="text-gray-600 text-lg">Understand and visualize how two date ranges differ</p>
        </header>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
          {/* OUTER RANGE */}
          <fieldset className="bg-gray-50 border border-gray-200 p-6 rounded-lg shadow-sm">
            <legend className="text-base font-semibold text-gray-700">🟦 Outer Range</legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div>
                <label className="block text-sm text-gray-700 mb-2">Start Date</label> 
                <input
                  type="date"
                  {...register("outerStart", { required: true })}
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                {errors.outerStart && <p className="text-red-500 text-sm mt-1">Required</p>}
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">End Date</label>
                <input
                  type="date"
                  {...register("outerEnd", { required: true })}
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                {errors.outerEnd && <p className="text-red-500 text-sm mt-1">Required</p>}
              </div>
            </div>
          </fieldset>

          {/* INNER RANGE */}
          <fieldset className="bg-gray-50 border border-gray-200 p-6 rounded-lg shadow-sm">
            <legend className="text-base font-semibold text-gray-700">🟨 Inner Range</legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div>
                <label className="block text-sm text-gray-700 mb-2">Start Date</label>
                <input
                  type="date"
                  {...register("innerStart", { required: true })}
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                {errors.innerStart && <p className="text-red-500 text-sm mt-1">Required</p>}
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">End Date</label>
                <input
                  type="date"
                  {...register("innerEnd", { required: true })}
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                {errors.innerEnd && <p className="text-red-500 text-sm mt-1">Required</p>}
              </div>
            </div>
          </fieldset>

          {/* SUBMIT */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-2.5 px-8 rounded-full shadow-md transition-all"
            >
              ✨ Calculate Difference
            </button>
          </div>
        </form>

        {/* RESULT SECTION */}
        {result.length > 0 && (
          <section className="border-t border-gray-200 pt-8 space-y-8">
            <div className="px-2">
              <RangeDisplay ranges={result} />
            </div>
            <div className="pt-4 px-2">
              <h3 className="text-lg font-semibold text-gray-800 text-center">📊 Timeline Visualization</h3>
              <div className="overflow-x-auto max-w-full">
                <TimelineChart ranges={result} />
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
