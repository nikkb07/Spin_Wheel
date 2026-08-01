import prisma from "../config/prisma";
import { CouponStatus } from "@prisma/client";

export const getUnusedCoupon = async (rewardId: number) => {
  return prisma.coupon.findFirst({
    where: {
      rewardId,
      status: CouponStatus.AVAILABLE,
    },
    orderBy: {
      id: "asc",
    },
  });
};