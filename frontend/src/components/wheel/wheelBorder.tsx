"use client";

import { memo } from "react";

interface WheelBorderProps {
  center: number;
  radius: number;
}

function WheelBorder({
  center,
  radius,
}: WheelBorderProps) {
  const bulbCount = 40;

  const bulbs = Array.from({ length: bulbCount }).map((_, index) => {
    const angle = (360 / bulbCount) * index;

    const rad = ((angle - 90) * Math.PI) / 180;

    const bulbRadius = radius + 6;

    const x = center + bulbRadius * Math.cos(rad);
    const y = center + bulbRadius * Math.sin(rad);

    return (
      <circle
        key={index}
        cx={x}
        cy={y}
        r={4.8}
        fill="#fff8dc"
        stroke="#FFD54A"
        strokeWidth={1.4}
        filter="url(#bulbGlow)"
      />
    );
  });

  return (
    <>
      {/* Outer Glow */}
      <circle
        cx={center}
        cy={center}
        r={radius + 22}
        fill="none"
        stroke="#FDE68A"
        strokeWidth={8}
        opacity={0.15}
      />

      {/* Outer Gold Ring */}
      <circle
        cx={center}
        cy={center}
        r={radius + 14}
        fill="#8B5A00"
        stroke="#FFE082"
        strokeWidth={5}
      />

      {/* Main Gold Ring */}
      <circle
        cx={center}
        cy={center}
        r={radius + 6}
        fill="#C98A00"
        stroke="#FFF3B0"
        strokeWidth={8}
      />

      {/* Decorative Ring */}
      <circle
        cx={center}
        cy={center}
        r={radius}
        fill="none"
        stroke="#6B4300"
        strokeWidth={3}
      />

      {bulbs}
    </>
  );
}

export default memo(WheelBorder);