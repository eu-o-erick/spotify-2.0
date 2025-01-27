import { useState, useEffect, useRef } from "react";

const useClickOutside = <T extends HTMLElement>(): [
  boolean,
  React.Dispatch<React.SetStateAction<boolean>>,
  React.RefObject<T | null>
] => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const ref = useRef<T | null>(null);

  const handleClickOutside = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return [isOpen, setIsOpen, ref];
};

export default useClickOutside;
