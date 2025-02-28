"use client";

import { cn } from "@/lib/cn";
import { ImSpinner2 } from "react-icons/im";

export default function ButtonComponent({
  children,
  label,
  handle,
  className = "",
  isLoading,
}: {
  children?: React.ReactNode;
  label: string;
  handle: () => void;
  className?: string;
  isLoading?: boolean;
}) {
  return (
    <button
      className={cn(
        `
          relative bg-zinc-300 py-2.5 px-5 rounded-full text-[14px] text-main hover:bg-white active:bg-white
          max-md:hover:bg-zinc-300 max-md:active:bg-white transition-all max-sm:text-sm max-sm:py-2 max-sm:px-3
        `,
        className,
        {
          "cursor-not-allowed": isLoading,
        }
      )}
      onClick={() => handle()}
      type="button"
    >
      <div
        className={cn("flex flex-center justify-center gap-1", {
          "opacity-0": isLoading,
        })}
      >
        {children}
        <span>{label}</span>
      </div>

      <div
        className={cn(
          "absolute top-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2",
          {
            hidden: !isLoading,
          }
        )}
      >
        <ImSpinner2 className="w-4 h-4 animate-spin" />
      </div>
    </button>
  );
}
