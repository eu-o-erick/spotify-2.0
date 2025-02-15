import { FaStar } from "react-icons/fa";
import { useState } from "react";

export default function RatingStars({
  rating,
  setRating,
}: {
  rating: string | number;
  setRating: React.Dispatch<React.SetStateAction<string | number>>;
}) {
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  const handleStarClick = (starIndex: number) => {
    setRating(starIndex + 1);
  };

  const getRatingColor = (value: number) => {
    const colors = {
      1: [239, 68, 68],
      2: [234, 179, 8],
      3: [163, 230, 53],
      4: [34, 197, 94],
      5: [16, 185, 129],
    };

    const lowerPoint = Math.floor(value);
    const upperPoint = Math.min(Math.ceil(value), 5);

    if (lowerPoint === upperPoint) {
      const rgb = colors[lowerPoint as keyof typeof colors] || colors[1];
      return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
    }

    const factor = value - lowerPoint;

    const lowerColor = colors[lowerPoint as keyof typeof colors] || colors[1];
    const upperColor = colors[upperPoint as keyof typeof colors] || colors[1];

    const r = Math.round(
      lowerColor[0] + (upperColor[0] - lowerColor[0]) * factor
    );
    const g = Math.round(
      lowerColor[1] + (upperColor[1] - lowerColor[1]) * factor
    );
    const b = Math.round(
      lowerColor[2] + (upperColor[2] - lowerColor[2]) * factor
    );

    return `rgb(${r}, ${g}, ${b})`;
  };

  return (
    <div className="mr-14 max-md:mr-4">
      <div className="flex items-center max-md:hidden">
        {[...Array(5)].map((_, i) => {
          const currentRating =
            hoverRating !== null
              ? hoverRating
              : typeof rating === "string"
              ? 0
              : rating;
          const starFill = Math.min(Math.max(currentRating - i, 0), 1) * 100;

          return (
            <div
              key={i}
              className="relative w-4 h-4 cursor-pointer p-0.5"
              onClick={() => handleStarClick(i)}
              onMouseEnter={() => setHoverRating(i + 1)}
              onMouseLeave={() => setHoverRating(null)}
            >
              <FaStar className="absolute top-0 left-0 w-[calc(100%-2px)] h-[calc(100%-2px)] text-secondary md:group-hover:text-main transition-all" />

              <FaStar
                className="absolute top-0 left-0 w-[calc(100%-2px)] h-[calc(100%-2px)] pointer-events-none transition-colors"
                style={{
                  color: getRatingColor(currentRating),
                  maskImage: `linear-gradient(90deg, #000 ${starFill}%, transparent ${starFill}%)`,
                  WebkitMaskImage: `linear-gradient(90deg, #000 ${starFill}%, transparent ${starFill}%)`,
                }}
              />
            </div>
          );
        })}
      </div>

      <div className="relative w-4 h-4 md:hidden">
        <FaStar
          className="absolute top-0 left-0 w-full h-full text-secondary transition-colors"
          style={{
            color: rating
              ? getRatingColor(typeof rating === "string" ? 0 : rating)
              : undefined,
          }}
        />
      </div>
    </div>
  );
}
