"use client";

import React from "react";
import ButtonDropDown from "./Button";
import ContentDropDown from "./Content";
import useClickOutside from "@/hooks/useClickOutside";

interface Props {
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
  options: string[];
  minW?: string;
}

export default function DropDownComponent({
  state,
  setState,
  options,
  minW = "w-32 max-sm:w-28",
}: Props) {
  const [isOpen, setIsOpen, dropdownRef] = useClickOutside<HTMLDivElement>();

  return (
    <div className="relative" ref={dropdownRef}>
      <ButtonDropDown
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        state={state}
        minW={minW}
      />

      <ContentDropDown
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        state={state}
        setState={setState}
        options={options}
        minW={minW}
      />
    </div>
  );
}
