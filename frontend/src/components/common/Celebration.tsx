"use client";

import Confetti from "react-confetti";
import { useWindowSize } from "@/hooks/useWindowSize";

interface Props {
  show: boolean;
  celebrationKey: number;
}

export default function Celebration({
  show,
  celebrationKey,
}: Props) {
  const { width = 0, height = 0 } = useWindowSize();

  if (!show) return null;

  return (
    <Confetti
      key={celebrationKey}
      width={width}
      height={height}
      recycle={false}
      numberOfPieces={450}
      gravity={0.35}
    />
  );
}