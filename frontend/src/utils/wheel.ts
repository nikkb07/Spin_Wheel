export const polarToCartesian = (
  cx: number,
  cy: number,
  radius: number,
  angle: number
) => {
  const rad = ((angle - 90) * Math.PI) / 180;

  return {
    x: cx + radius * Math.cos(rad),
    y: cy + radius * Math.sin(rad),
  };
};

export const describeArc = (
  cx: number,
  cy: number,
  radius: number,
  startAngle: number,
  endAngle: number
) => {
  const start = polarToCartesian(
    cx,
    cy,
    radius,
    endAngle
  );

  const end = polarToCartesian(
    cx,
    cy,
    radius,
    startAngle
  );

  const largeArcFlag =
    endAngle - startAngle <= 180 ? 0 : 1;

  return [
    "M",
    cx,
    cy,

    "L",
    start.x,
    start.y,

    "A",
    radius,
    radius,
    0,
    largeArcFlag,
    0,
    end.x,
    end.y,

    "Z",
  ].join(" ");
};