// components/EmptyChartState.tsx
"use client";

import { ReactNode } from "react";

type EmptyChartStateProps = {
  title?: string;
  subtitle?: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: ReactNode;
  className?: string;
};

export default function ChartDataNotFound({
  title = "No data to display",
  subtitle = "Try changing the date range, filters, or data source.",
  actionLabel = "Refresh",
  onAction,
  icon,
  className = "",
}: EmptyChartStateProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`flex min-h-[300px] w-full items-center justify-center border border-gray-200 bg-white ${className}`}
    >
      <div className="mx-auto max-w-xl text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 shadow-inner">
          {icon ?? (
            <svg viewBox="0 0 24 24" className="h-8 w-8 text-primary" aria-hidden="true">
              <path
                d="M4 19h16M7 16V8m5 8V5m5 11v-6"
                stroke="currentColor"
                strokeWidth="1.6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>

        <h3 className="text-lg font-semibold text-primary">{title}</h3>

        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{subtitle}</p>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
          {onAction && (
            <button
              type="button"
              onClick={onAction}
              className="rounded-xl bg-[var(--primary,#101949)] px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:opacity-95 focus:ring-2 focus:ring-[var(--primary,#101949)] focus:ring-offset-2 focus:outline-none dark:focus:ring-offset-gray-900"
            >
              {actionLabel}
            </button>
          )}

          <details className="group">
            <summary className="cursor-pointer text-sm text-gray-500 underline-offset-4 transition select-none hover:underline dark:text-gray-400">
              Troubleshoot
            </summary>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-left text-sm text-gray-500 dark:text-gray-400">
              <li>Confirm the selected date range has activity.</li>
              <li>Remove filters that may exclude results.</li>
              <li>Try refreshing data.</li>
            </ul>
          </details>
        </div>
      </div>
    </div>
  );
}
