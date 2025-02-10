"use client";

import { useState } from "react";
import { FaStar } from "react-icons/fa";

export default function RatingStars() {
  const [rating, setRating] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = parseFloat(e.target.value);
    if (value < 0) value = 0;
    if (value > 5) value = 5;
    setRating(value);
  };

  return (
    <div className="flex gap-2 items-center justify-end">
      {[...Array(5)].map((_, i) => {
        const starFill = Math.min(Math.max(rating - i, 0), 1) * 100;

        return (
          <div key={i} className="relative w-4 h-4">
            <FaStar className="absolute top-0 left-0 w-full h-full text-secondary group-hover:text-main transition-all" />

            <FaStar
              className="absolute top-0 left-0 w-full h-full text-white"
              style={{
                maskImage: `linear-gradient(90deg, #000 ${starFill}%, transparent ${starFill}%)`,
                WebkitMaskImage: `linear-gradient(90deg, #000 ${starFill}%, transparent ${starFill}%)`,
              }}
            />
          </div>
        );
      })}

      <input
        type="number"
        step="0.1"
        min="0"
        max="5"
        value={rating}
        onChange={handleChange}
        className="w-16 text-center focus:outline-none bg-secondary rounded-md p-1"
      />
    </div>
  );
}
