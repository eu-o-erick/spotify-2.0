"use client";

import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

export default function ButtonsRatingInput({
  setRating,
}: {
  setRating: React.Dispatch<React.SetStateAction<string | number>>;
}) {
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

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

  return (
    <div className="flex flex-col mx-2">
      <button
        onMouseDown={() => startContinuousAction(handleIncrement)}
        onTouchStart={(e) => {
          e.preventDefault();
          startContinuousAction(handleIncrement);
        }}
        onMouseUp={stopContinuousAction}
        onMouseLeave={stopContinuousAction}
        onTouchEnd={(e) => {
          e.preventDefault();
          stopContinuousAction();
        }}
        className="flex justify-center items-center text-zinc-400 active:text-zinc-500 transition-all"
      >
        <IoIosArrowUp />
      </button>

      <button
        onMouseDown={() => startContinuousAction(handleDecrement)}
        onTouchStart={(e) => {
          e.preventDefault();
          startContinuousAction(handleDecrement);
        }}
        onMouseUp={stopContinuousAction}
        onMouseLeave={stopContinuousAction}
        onTouchEnd={(e) => {
          e.preventDefault();
          stopContinuousAction();
        }}
        className="flex justify-center items-center text-zinc-400 active:text-zinc-500 transition-all"
      >
        <IoIosArrowDown />
      </button>
    </div>
  );
}
