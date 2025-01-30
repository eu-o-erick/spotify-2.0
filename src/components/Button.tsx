"use client";

import { cn } from "@/lib/cn";

export default function ButtonComponent({
  label,
  handle,
  className = "",
}: {
  label: string;
  handle: () => void;
  className?: string;
}) {
  return (
    <button
      className={cn(
        "bg-white py-2.5 px-5 rounded-[4px] text-[14px] opacity-90 hover:opacity-100 transition-all max-sm:rounded-sm max-sm:text-sm max-sm:py-2 max-sm:px-3",
        className
      )}
      onClick={() => handle()}
      type="button"
    >
      <span className="text-main text-[14px]">{label}</span>
    </button>
  );
}
