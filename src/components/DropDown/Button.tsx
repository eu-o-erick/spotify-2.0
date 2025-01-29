"use client";

import { cn } from "@/lib/cn";
import { IoIosArrowDown } from "react-icons/io";

export type DropDownItem = {
  value: string;
  label: string;
};

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  state: DropDownItem;
}

export default function ButtonDropDown({ isOpen, setIsOpen, state }: Props) {
  return (
    <button
      onClick={() => setIsOpen(!isOpen)}
      className="flex items-center gap-1 max-lg:text-sm"
    >
      {" "}
      <span>{state.value}</span>
      <IoIosArrowDown
        className={cn(
          "w-5 h-5 max-lg:w-4 max-lg:mt-1 max-lg:h-4 transition-all",
          {
            "rotate-180": isOpen,
          }
        )}
      />
    </button>
  );
}
