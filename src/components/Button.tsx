"use client";

export default function ButtonComponent({
  label,
  handle,
}: {
  label: string;
  handle: () => void;
}) {
  return (
    <button
      className="bg-white py-2.5 px-5 rounded-[4px] opacity-90 hover:opacity-100 transition-all max-sm:rounded-sm max-sm:text-sm max-sm:py-2 max-sm:px-3"
      onClick={() => handle()}
      type="button"
    >
      <span className="text-main text-[14px]">{label}</span>
    </button>
  );
}
