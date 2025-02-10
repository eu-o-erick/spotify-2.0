"use client";

import { cn } from "@/lib/cn";
import { useTranslations } from "next-intl";
import { IoIosArrowDown } from "react-icons/io";

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  state: string;
  children?: React.ReactNode;
  minW?: string;
}

export default function ButtonDropDown({
  isOpen,
  setIsOpen,
  state,
  children,
  minW,
}: Props) {
  const t = useTranslations("DropDown");

  return (
    <button
      onClick={() => setIsOpen(!isOpen)}
      className={cn(
        "flex items-center justify-end gap-4 py-2 px-5 max-sm:px-3 text-zinc-400",
        {
          "bg-secondary": isOpen,
          "min-w-32": !minW,
        },
        minW
      )}
    >
      {children}

      <span className="font-extralight text-sm">{t(state)}</span>
      <IoIosArrowDown
        className={cn("w-4 h-4 transition-all", {
          "rotate-180": isOpen,
        })}
      />
    </button>
  );
}
