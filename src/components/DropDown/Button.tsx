"use client";

import { cn } from "@/utils/cn";
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
      onClick={() => {
        console.log("alou");
        setIsOpen(!isOpen);
      }}
      className="flex items-center gap-1"
    >
      {" "}
      <span>{state.value}</span>{" "}
      <IoIosArrowDown
        className={cn("w-5 h-5 transition-all", { "rotate-180": isOpen })}
      />
    </button>
  );
}
