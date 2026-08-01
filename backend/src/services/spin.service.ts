import prisma from "../config/prisma";
import { RewardType, SpinResult, CouponStatus } from "@prisma/client";
import { weightedRandom } from "../utils/weightedRandom";
import { SpinResponse } from "../types/spin";

export const spinWheel = async () => {
  // Fetch all active rewards
  const rewards = await prisma.reward.findMany({
    where: {
      isActive: true,
    },
  });

  if (rewards.length === 0) {
    throw new Error("No active rewards found.");
  }

  // Select reward using weighted probability
  const selectedReward = weightedRandom(rewards);

  return prisma.$transaction(async (tx) => {
    let finalReward = selectedReward;
    let coupon: {
      id: number;
      code: string;
    } | null = null;

    let result: SpinResult = SpinResult.WIN;

    // Better Luck reward
    if (selectedReward.type === RewardType.NO_PRIZE) {
      result = SpinResult.LOSE;
    } else {
      // Find first unused coupon
      coupon = await tx.coupon.findFirst({
        where: {
          rewardId: selectedReward.id,
          status: CouponStatus.AVAILABLE,
        },
        orderBy: {
          id: "asc",
        },
        select: {
          id: true,
          code: true,
        },
      });

      // No coupon available → fallback to Better Luck
      if (!coupon) {
        const betterLuck = await tx.reward.findFirst({
          where: {
            type: RewardType.NO_PRIZE,
            isActive: true,
          },
        });

        if (!betterLuck) {
          throw new Error("Better Luck reward not found.");
        }

        finalReward = betterLuck;
        result = SpinResult.LOSE;
      }
    }

    // Find wheel segment for the final reward
    const segments = await tx.wheelSegment.findMany({
      where: {
        rewardId: finalReward.id,
      },
      orderBy: {
        position: "asc",
      },
    });

    if (segments.length === 0) {
      throw new Error("Wheel segment not found.");
    }

    const wheelSegment =
      segments[Math.floor(Math.random() * segments.length)];

    // Mark coupon as assigned
    if (coupon) {
      await tx.coupon.update({
        where: {
          id: coupon.id,
        },
        data: {
          status: CouponStatus.ASSIGNED,
          assignedAt: new Date(),
        },
      });
    }

    // Save spin history
    await tx.spin.create({
      data: {
        rewardId: finalReward.id,
        couponId: coupon?.id,
        result,
      },
    });

    return {
      reward: finalReward.title,
      coupon: coupon?.code ?? null,
      wheelIndex: wheelSegment.position,
      result,
    } satisfies SpinResponse;
  });
};