import { FaStar } from "react-icons/fa";

export default function RatingStars({ rating }: { rating: string | number }) {
  return (
    <div className="flex gap-1 items-center">
      {[...Array(5)].map((_, i) => {
        const starFill =
          Math.min(
            Math.max((typeof rating === "string" ? 0 : rating) - i, 0),
            1
          ) * 100;

        return (
          <div key={i} className="relative w-4 h-4">
            <FaStar className="absolute top-0 left-0 w-full h-full text-secondary md:group-hover:text-main transition-all" />

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
    </div>
  );
}
