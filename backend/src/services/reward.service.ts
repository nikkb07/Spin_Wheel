import prisma from "../config/prisma";

export const getRewards = async () => {
  return prisma.reward.findMany({
    orderBy: {
      id: "asc",
    },
  });
};

export const getWheelSegments = async () => {
  return prisma.wheelSegment.findMany({
    orderBy: {
      position: "asc",
    },
    select: {
      position: true,
      label: true,
      color: true,
    },
  });
};