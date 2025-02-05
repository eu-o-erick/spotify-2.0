import { cn } from "@/lib/cn";

export default function SeparatorComponent({
  className,
}: {
  className?: string;
}) {
  return <div className={cn("h-px w-full bg-secondary", className)} />;
}
