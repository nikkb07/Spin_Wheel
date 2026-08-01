"use client";

import ResultModal from "@/components/popup/ResultModal";
import Celebration from "@/components/common/Celebration";
import { useSpinStore } from "@/store/spinStore";
import Wheel from "@/components/wheel/wheel";

export default function Home() {
  const { showCelebration, celebrationKey } = useSpinStore();

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 px-4 py-8 sm:px-6 lg:px-8">
      <Celebration
        show={showCelebration}
        celebrationKey={celebrationKey}
      />

      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl flex-col items-center justify-center">
        <h1 className="text-center text-3xl font-extrabold text-white sm:text-4xl md:text-5xl lg:text-6xl">
          🎉 Lucky Spin Wheel
        </h1>

        <p className="mt-3 text-center text-sm text-slate-300 sm:text-base md:text-lg">
          Spin the wheel and win exciting rewards!
        </p>

        <div className="mt-10">
          <Wheel />
        </div>

        <ResultModal />
      </div>
    </main>
  );
}