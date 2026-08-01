"use client";

import { memo } from "react";

interface WheelCenterProps {
  center: number;
}

function WheelCenter({ center }: WheelCenterProps) {
  return (
    <>
      {/* Outer Gold Ring */}
      <circle
        cx={center}
        cy={center}
        r={60}
        fill="#B8860B"
        stroke="#FFF4C2"
        strokeWidth={4}
      />

      {/* Middle Ring */}
      <circle
        cx={center}
        cy={center}
        r={53}
        fill="#3A2A00"
        stroke="#FCD34D"
        strokeWidth={2}
      />

      {/* Main Button */}
      <circle
        cx={center}
        cy={center}
        r={46}
        fill="url(#centerGradient)"
      />

      {/* Highlight */}
      <ellipse
        cx={center}
        cy={center - 14}
        rx={20}
        ry={8}
        fill="rgba(255,255,255,0.22)"
      />

      {/* Inner Ring */}
      <circle
        cx={center}
        cy={center}
        r={44}
        fill="none"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth={1}
      />

      {/* Text */}
      <text
        x={center}
        y={center}
        fill="white"
        fontWeight="900"
        fontSize="20"
        letterSpacing="1"
        textAnchor="middle"
        dominantBaseline="middle"
        style={{
          userSelect: "none",
          textShadow: "0px 2px 6px rgba(0,0,0,0.45)",
        }}
      >
        SPIN
      </text>
    </>
  );
}

export default memo(WheelCenter);