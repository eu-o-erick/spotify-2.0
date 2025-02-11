"use client";

import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

export default function RatingInput({
  trackNumber,
  rating,
  setRating,
}: {
  trackNumber: number;
  rating: string | number;
  setRating: React.Dispatch<React.SetStateAction<string | number>>;
}) {
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = parseFloat(e.target.value);
    if (value < 0) value = 0;
    if (value > 5) value = 5;
    setRating(value);
  };

  const handleIncrement = () => {
    setRating((prev) => {
      const newValue = Math.min(5, (typeof prev === "string" ? 0 : prev) + 0.1);
      return parseFloat(newValue.toFixed(1));
    });
  };

  const handleDecrement = () => {
    setRating((prev) => {
      const newValue = Math.max(0, (typeof prev === "string" ? 0 : prev) - 0.1);
      return newValue === 0 ? "" : parseFloat(newValue.toFixed(1));
    });
  };

  const startContinuousAction = (action: () => void) => {
    action();
    const id = setInterval(action, 150);
    setIntervalId(id);
  };

  const stopContinuousAction = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const allowedKeys = [
      "Backspace",
      "Tab",
      "Enter",
      "ArrowLeft",
      "ArrowRight",
      "Delete",
    ];
    const isNumber = /^[0-9.]$/.test(e.key);

    if (!isNumber && !allowedKeys.includes(e.key)) {
      e.preventDefault();
    }

    if (e.key === "Enter") {
      e.preventDefault();

      const inputs = document.querySelectorAll("input[type='number']");
      const index = Array.from(inputs).indexOf(e.currentTarget);

      if (index !== -1 && index < inputs.length - 1) {
        (inputs[index + 1] as HTMLInputElement).focus();
      }
    }
  };

  return (
    <div className="flex items-center">
      <input
        type="number"
        step="0.1"
        min="0"
        max="5"
        value={rating}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        id={`track${trackNumber}`}
        className="
          w-10 text-center focus:outline-none bg-secondary rounded-md p-1 shadow-sm
          placeholder:opacity-20 md:group-hover:bg-primary md:group-hover:shadow-none
          [&::-webkit-inner-spin-button]:appearance-none 
          [&::-webkit-outer-spin-button]:appearance-none
        "
        placeholder="0"
      />

      <div className="flex flex-col mx-2">
        <button
          onMouseDown={() => startContinuousAction(handleIncrement)}
          onTouchStart={() => startContinuousAction(handleIncrement)}
          onMouseUp={stopContinuousAction}
          onMouseLeave={stopContinuousAction}
          onTouchEnd={stopContinuousAction}
          className="flex justify-center items-center text-zinc-400 active:text-zinc-500 transition-all"
        >
          <IoIosArrowUp />
        </button>

        <button
          onMouseDown={() => startContinuousAction(handleDecrement)}
          onTouchStart={() => startContinuousAction(handleDecrement)}
          onMouseUp={stopContinuousAction}
          onMouseLeave={stopContinuousAction}
          onTouchEnd={stopContinuousAction}
          className="flex justify-center items-center text-zinc-400 active:text-zinc-500 transition-all"
        >
          <IoIosArrowDown />
        </button>
      </div>
    </div>
  );
}
