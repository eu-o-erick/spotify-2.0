"use client";

import { cn } from "@/lib/cn";
import { RiArrowDropUpFill } from "react-icons/ri";

export type DropDownItem = {
  value: string;
  label: string;
};

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  state: DropDownItem;
  setState: React.Dispatch<React.SetStateAction<DropDownItem>>;
  options: DropDownItem[];
}

export default function ContentDropDown({
  isOpen,
  setIsOpen,
  state,
  setState,
  options,
}: Props) {
  function handlerClick(option: DropDownItem) {
    setIsOpen(false);
    setState(option);
  }

  return (
    <div
      className={cn(
        "absolute z-10 bg-secondary -right-4 px-6 py-3 shadow-strong rounded-md max-lg:px-5 transition-all",
        {
          "opacity-100 top-8": isOpen,
          "opacity-0 -right-8 pointer-events-none scale-75 top-4": !isOpen,
        }
      )}
    >
      <RiArrowDropUpFill className="absolute -top-7 right-px text-secondary text-[50px] max-lg:-top-[22px] max-lg:right-1 max-lg:text-[40px] pointer-events-none" />

      <ul className="flex flex-col gap-4 items-end min-w-28 max-md:text-xs max-sm:gap-3 max-sm:min-w-20 max-sm:text-xs">
        <li className="opacity-50">{state.label}</li>

        {options.map((option, i) => (
          <li
            key={i}
            className={cn("", { hidden: option.value === state.value })}
          >
            <button onClick={() => handlerClick(option)} className="">
              {option.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
