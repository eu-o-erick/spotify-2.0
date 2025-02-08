import { cn } from "@/lib/cn";
import Image from "next/image";
import { useState } from "react";

export default function ImageLoader({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [loading, setLoading] = useState(true);

  const handleLoad = () => {
    setLoading(false);
  };

  return (
    <div className="relative">
      {loading && (
        <div
          className={cn(
            "w-full aspect-square bg-secondary animate-pulse",
            className
          )}
        />
      )}

      <Image
        src={src}
        alt={alt}
        width={500}
        height={500}
        onLoadingComplete={handleLoad}
        className={cn("relative pointer-events-auto", className, {
          "absolute pointer-events-none opacity-0": loading,
        })}
      />
    </div>
  );
}
