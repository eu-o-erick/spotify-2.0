"use client";

import ButtonDropDown from "./Button";
import ContentDropDown from "./Content";
import useClickOutside from "@/hooks/useClickOutside";

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
  const [isOpen, setIsOpen, dropdownRef] = useClickOutside<HTMLDivElement>();

  return (
    <div className="relative" ref={dropdownRef}>
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
