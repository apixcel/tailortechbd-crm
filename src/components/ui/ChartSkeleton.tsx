// components/ChartSkeleton.tsx
"use client";

export default function ChartSkeleton() {
  return (
    <div className="flex min-h-[300px] w-full animate-pulse flex-col justify-between rounded-2xl border border-gray-200 bg-white p-6">
      {/* Title placeholder */}
      <div className="h-6 w-48 rounded-md bg-gray-200" />

      {/* Chart area placeholder */}
      <div className="flex flex-1 items-center justify-center">
        <div className="h-[200px] w-full rounded-md bg-gray-100" />
      </div>

      {/* X-axis labels placeholder */}
      <div className="mt-6 flex justify-between">
        <div className="h-4 w-10 rounded bg-gray-200" />
        <div className="h-4 w-10 rounded bg-gray-200" />
        <div className="h-4 w-10 rounded bg-gray-200" />
        <div className="h-4 w-10 rounded bg-gray-200" />
      </div>
    </div>
  );
}
