"use client";

import { cn } from "@/lib/cn";
import { useTranslations } from "next-intl";
import { IoIosArrowDown } from "react-icons/io";

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  state: string;
}

export default function ButtonDropDown({ isOpen, setIsOpen, state }: Props) {
  const t = useTranslations("DropDown");

  return (
    <button
      onClick={() => setIsOpen(!isOpen)}
      className={cn(
        "flex items-center justify-end gap-4 py-3 px-5 max-sm:px-3 min-w-32",
        {
          "bg-secondary": isOpen,
        }
      )}
    >
      <span className="font-extralight text-sm text-zinc-400">{t(state)}</span>
      <IoIosArrowDown
        className={cn("w-4 h-4 transition-all text-zinc-300", {
          "rotate-180": isOpen,
        })}
      />
    </button>
  );
}
