"use client";

import React, { useState } from "react";
import ButtonDropDown from "./Button";
import ContentDropDown from "./Content";

export type DropDownItem = {
  value: string;
  label: string;
};

interface Props {
  state: DropDownItem;
  setState: React.Dispatch<React.SetStateAction<DropDownItem>>;
  options: DropDownItem[];
}

export default function DropDown({ state, setState, options }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <ButtonDropDown isOpen={isOpen} setIsOpen={setIsOpen} state={state} />

      <ContentDropDown
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        state={state}
        setState={setState}
        options={options}
      />
    </div>
  );
}
