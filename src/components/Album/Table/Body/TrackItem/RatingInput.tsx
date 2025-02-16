export default function RatingInput({
  trackNumber,
  rating,
  setRating,
  inputRef,
}: {
  trackNumber: number;
  rating: string | number;
  setRating: React.Dispatch<React.SetStateAction<string | number>>;
  inputRef: React.RefObject<HTMLInputElement | null>;
}) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.replace(",", ".");
    let value = parseFloat(inputValue);

    if (isNaN(value)) {
      setRating("");
      return;
    }

    if (value < 0) value = 0;
    if (value > 5) value = 5;

    value = Math.round(value * 10) / 10;
    setRating(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const allowedKeys = [
      "Backspace",
      "Tab",
      "Enter",
      "ArrowLeft",
      "ArrowRight",
      "Delete",
      ",",
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
    <div
      className="
        flex items-end justify-center gap-0.5 bg-zinc-500 bg-opacity-5 rounded-md px-2 py-1.5
        md:group-hover:bg-zinc-800 md:group-hover:bg-opacity-20 cursor-pointer
      "
      onClick={() => inputRef.current?.focus()}
    >
      <input
        ref={inputRef}
        type="number"
        step="0.1"
        min="0"
        max="5"
        value={rating}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        id={`track${trackNumber}`}
        className="
          text-end focus:outline-none leading-3 bg-transparent w-6 placeholder:opacity-20 cursor-pointer
          [&::-webkit-inner-spin-button]:appearance-none 
          [&::-webkit-outer-spin-button]:appearance-none
        "
        placeholder="0"
      />

      <div className="text-xs leading-3 font-semibold text-zinc-500 realative mb-1">
        /5
      </div>
    </div>
  );
}
