"use client";

import ButtonDropDown from "./Button";
import ContentDropDown from "./Content";
import useClickOutside from "@/hooks/useClickOutside";

interface Props {
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
  options: string[];
}

export default function DropDownComponent({ state, setState, options }: Props) {
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
