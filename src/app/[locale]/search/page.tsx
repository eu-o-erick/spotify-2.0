"use client";

import { useSearchParams } from "next/navigation";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");

  return (
    <main className="flex-1 container my-10">
      <h1 className="">{query}</h1>
    </main>
  );
}
