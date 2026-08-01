export const polarToCartesian = (
  cx: number,
  cy: number,
  r: number,
  angle: number
) => {
  const rad = (angle - 90) * (Math.PI / 180);

  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad),
  };
};

export const describeArc = (
  cx: number,
  cy: number,
  r: number,
  startAngle: number,
  endAngle: number
) => {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);

  const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;

  return [
    `M ${cx} ${cy}`,
    `L ${start.x} ${start.y}`,
    `A ${r} ${r} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`,
    "Z",
  ].join(" ");
};

export const getTextPosition = (
  index: number,
  segmentAngle: number,
  radius: number,
  center: number
) => {
  const angle = index * segmentAngle + segmentAngle / 2;

  const rad = (angle - 90) * (Math.PI / 180);

  const textRadius = radius * 0.67;

  return {
    x: center + textRadius * Math.cos(rad),
    y: center + textRadius * Math.sin(rad),
    rotation: angle,
  };
};