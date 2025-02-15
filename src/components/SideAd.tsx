"use client";

import { cn } from "@/lib/cn";
import { useEffect } from "react";

export default function SideAd({
  dataAdClient,
  dataAdSlot,
  side,
}: {
  dataAdClient: string;
  dataAdSlot: string;
  side: "left" | "right";
}) {
  useEffect(() => {
    try {
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push(
        {}
      );
    } catch (err) {
      console.log("erro adsense:", err);
    }
  }, []);

  return (
    <ins
      className={cn("adsbygoogle sticky top-0 left-0 w-44 h-96 bg-black", {
        "left-0": side === "left",
        "right-0": side === "right",
      })}
      style={{ display: "block" }}
      data-ad-client={dataAdClient}
      data-ad-slot={dataAdSlot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  );
}
