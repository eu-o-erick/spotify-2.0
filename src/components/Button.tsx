"use client";

import { cn } from "@/lib/cn";

export default function ButtonComponent({
  children,
  label,
  handle,
  className = "",
}: {
  children?: React.ReactNode;
  label: string;
  handle: () => void;
  className?: string;
}) {
  return (
    <button
      className={cn(
        `
          flex flex-center justify-center gap-1
          bg-zinc-300 py-2.5 px-5 rounded-full text-[14px] text-main hover:bg-white active:bg-white
          max-md:hover:bg-zinc-300 max-md:active:bg-white transition-all max-sm:text-sm max-sm:py-2 max-sm:px-3
        `,
        className
      )}
      onClick={() => handle()}
      type="button"
    >
      {children}
      <span>{label}</span>
    </button>
  );
}
