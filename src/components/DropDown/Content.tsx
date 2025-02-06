"use client";

import { cn } from "@/lib/cn";
import { useTranslations } from "next-intl";
import SeparatorComponent from "../Separator";

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
  options: string[];
}

export default function ContentDropDown({
  isOpen,
  setIsOpen,
  state,
  setState,
  options,
}: Props) {
  const t = useTranslations("DropDown");

  function handlerClick(option: string) {
    setIsOpen(false);
    setState(option);
  }

  return (
    <div
      className={cn(
        "absolute right-0 top-full z-10 bg-secondary shadow-sm w-full transition-all min-w-32",
        {
          "opacity-0 pointer-events-none": !isOpen,
        }
      )}
    >
      <SeparatorComponent className="bg-primary" />
      <ul className="flex flex-col py-1 max-sm:gap-0">
        {options.map((option, i) => (
          <li key={i} className="text-sm max-sm:text-xs">
            {option !== state && (
              <button
                type="button"
                onClick={() => handlerClick(option)}
                className="text-end w-full py-2 px-5 hover:bg-primary max-sm:px-3 font-extralight"
              >
                <span>{t(option)}</span>
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
