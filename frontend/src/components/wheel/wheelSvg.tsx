"use client";

import { memo, useMemo } from "react";
import { WheelSegment } from "@/types/reward";
import { describeArc, getTextPosition } from "./wheelUtils";
import WheelBorder from "./wheelBorder";
import { feMerge } from "framer-motion/m";
import WheelCenter from "./wheelCenter";

interface WheelSvgProps {
  wheel: WheelSegment[];
  wheelSize: number;
  radius: number;
  center: number;
  segmentAngle: number;
  winningIndex: number | null;
}

function WheelSvg({
  wheel,
  wheelSize,
  radius,
  center,
  segmentAngle,
  winningIndex,
}: WheelSvgProps) {
  const renderedSegments = useMemo(() => {
    return wheel.map((segment, index) => {
      const startAngle = index * segmentAngle;
      const endAngle = startAngle + segmentAngle;

      const text = getTextPosition(
        index,
        segmentAngle,
        radius,
        center
      );

      const labelRotation =
        text.rotation > 90 && text.rotation < 270
          ? text.rotation + 180
          : text.rotation;

      return (
        <g key={
          segment.color === "#6EC065"
            ? "url(#greenSegment)"
            : segment.color === "#4564D6"
            ? "url(#blueSegment)"
            : segment.color === "#CF4F96"
            ? "url(#pinkSegment)"
            : segment.color === "#F0A83A"
            ? "url(#orangeSegment)"
            : "url(#graySegment)" 
        }>
          <path
            d={describeArc(
              center,
              center,
              radius,
              startAngle,
              endAngle
            )}
            fill={segment.color}
            filter={
              winningIndex === index
                ? "url(#glow)"
                : undefined
            }
            stroke="#1A1A1A"
            strokeWidth={4}
          />
          
          <text
            x={text.x}
            y={text.y}
            fill="#FFFFFF"
            fontSize={wheel.length > 8 ? 15 : 20}
            fontWeight="900"
            textAnchor="middle"
            style={{
              textShadow: "0px 2px 6px rgba(0,0,0,.45)",
            }}
            dominantBaseline="middle"
            transform={`rotate(${labelRotation} ${text.x} ${text.y})`}
          >
            {segment.label}
          </text>
          opacity={0.98}
        </g>
      );
    });
  }, [
    wheel,
    center,
    radius,
    segmentAngle,
    winningIndex,
  ]);

  return (
    <svg
      viewBox={`0 0 ${wheelSize} ${wheelSize}`}
      className="h-full w-full drop-shadow-[0_0_40px_rgba(34,211,238,0.25)]"
    >
      <defs>
            <filter id="glow">
                <feGaussianBlur
                    stdDeviation="7"
                    result="coloredBlur"
                />

                <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                </feMerge>
            </filter>

            <filter id="bulbGlow">
                <feGaussianBlur
                    stdDeviation="3"
                    result="blur"
                />

                <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                </feMerge>
            </filter>

            <radialGradient
                id="centerGradient"
                cx="35%"
                cy="30%"
            >
                <stop
                    offset="0%"
                    stopColor="#374151"
                />

                <stop
                    offset="55%"
                    stopColor="#111827"
                />

                <stop
                    offset="100%"
                    stopColor="#000000"
                />
            </radialGradient>
            <linearGradient
              id="greenSegment"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#93E07C" />
              <stop offset="100%" stopColor="#4CAF50" />
            </linearGradient>

            <linearGradient
              id="blueSegment"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#5B8BFF" />
              <stop offset="100%" stopColor="#2454D3" />
            </linearGradient>

            <linearGradient
              id="pinkSegment"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#FF6CB6" />
              <stop offset="100%" stopColor="#C2185B" />
            </linearGradient>

            <linearGradient
              id="orangeSegment"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#FFC44D" />
              <stop offset="100%" stopColor="#F57C00" />
            </linearGradient>

<linearGradient
  id="graySegment"
  x1="0%"
  y1="0%"
  x2="100%"
  y2="100%"
>
  <stop offset="0%" stopColor="#9097A8" />
  <stop offset="100%" stopColor="#626D82" />
</linearGradient>
        </defs>
      <WheelBorder
        center={center}
        radius={radius}
      />

      {renderedSegments}

      <WheelCenter
            center={center}
      />
    </svg>
  );
}

export default memo(WheelSvg);