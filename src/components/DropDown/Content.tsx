"use client";

import { cn } from "@/utils/cn";
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
        "absolute bg-secondary px-6 py-3 shadow-strong rounded-md transition-all",
        {
          "opacity-100 -right-4 top-8": isOpen,
          "opacity-0 -right-1 pointer-events-none scale-75 top-4": !isOpen,
        }
      )}
    >
      <RiArrowDropUpFill className="absolute !-top-7 right-px text-secondary !text-[50px] pointer-events-none" />

      <ul className="flex flex-col gap-4 items-end min-w-28">
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
