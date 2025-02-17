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
      console.error("erro adsense:", err);
    }
  }, []);

  return (
    <div
      className={cn("absolute top-0 w-44 h-full bg-red-900 z-50", {
        "left-10": side === "left",
        "right-10": side === "right",
      })}
    >
      <div
        className={cn("sticky top-44 w-44 h-96 bg-black z-50", {
          "left-10": side === "left",
          "right-10": side === "right",
        })}
      >
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client={dataAdClient}
          data-ad-slot={dataAdSlot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
      </div>
    </div>
  );
}
