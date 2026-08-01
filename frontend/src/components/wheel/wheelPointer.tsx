"use client";

import { memo } from "react";

function WheelPointer() {
  return (
    <svg
      width="70"
      height="90"
      viewBox="0 0 70 90"
      className="drop-shadow-[0_8px_18px_rgba(0,0,0,.45)]
                transition-transform
                duration-300"
    >
      <defs>
        <linearGradient
          id="pointerGold"
          x1="0%"
          y1="0%"
          x2="0%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#FFF6C8" />
          <stop offset="35%" stopColor="#FFD54F" />
          <stop offset="70%" stopColor="#D89A00" />
          <stop offset="100%" stopColor="#8B5A00" />
        </linearGradient>

        <radialGradient
          id="pointerCenter"
          cx="35%"
          cy="35%"
        >
          <stop offset="0%" stopColor="#FFFCE8" />
          <stop offset="100%" stopColor="#C68400" />
        </radialGradient>
      </defs>

      {/* Circle */}

      <circle
        cx="35"
        cy="20"
        r="14"
        fill="url(#pointerGold)"
        stroke="#7A4D00"
        strokeWidth="2"
      />

      <circle
        cx="35"
        cy="20"
        r="7"
        fill="url(#pointerCenter)"
      />

      {/* Pointer */}

      <path
        d="M35 82 L18 28 L52 28 Z"
        fill="url(#pointerGold)"
        stroke="#7A4D00"
        strokeWidth="2"
      />

      {/* Highlight */}

      <path
        d="M35 33 L28 30 L35 74"
        stroke="rgba(255,255,255,.45)"
        strokeWidth="2"
      />
    </svg>
  );
}

export default memo(WheelPointer);