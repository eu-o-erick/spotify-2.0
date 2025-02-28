import { FaStar } from "react-icons/fa";

export default function RatingStars({ rating }: { rating: string | number }) {
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
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => {
        const currentRating = typeof rating === "string" ? 0 : rating;
        const starFill = Math.min(Math.max(currentRating - i, 0), 1) * 100;

        return (
          <div key={i} className="relative w-4 h-4 p-0.5">
            <FaStar className="absolute top-0 left-0 w-[calc(100%-2px)] h-[calc(100%-2px)] text-secondary" />

            <FaStar
              className="absolute top-0 left-0 w-[calc(100%-2px)] h-[calc(100%-2px)]"
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
  );
}
