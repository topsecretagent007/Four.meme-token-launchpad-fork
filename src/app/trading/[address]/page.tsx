"use client";
import TradingPage from "@/components/trading";

export default function Page() {

  return (
    <div className="relative w-full h-full min-h-[calc(100vh-100px)]">
      <div className="z-20 container">
        <TradingPage />
      </div>
    </div>
  );
}
