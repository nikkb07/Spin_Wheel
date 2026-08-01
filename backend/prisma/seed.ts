import { PrismaClient, RewardType } from "@prisma/client";
import { CouponStatus } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

//----------------------- Create Rewards -----------------------------------------
  await prisma.reward.createMany({
    data: [
      {
        title: "5% OFF",
        type: RewardType.DISCOUNT,
        probability: 25,
      },
      {
        title: "10% OFF",
        type: RewardType.DISCOUNT,
        probability: 18,
      },
      {
        title: "15% OFF",
        type: RewardType.DISCOUNT,
        probability: 12,
      },
      {
        title: "₹100 Coupon",
        type: RewardType.COUPON,
        probability: 10,
      },
      {
        title: "Better Luck Next Time",
        type: RewardType.NO_PRIZE,
        probability: 35,
      },
    ],
    skipDuplicates: true,
  });

  console.log("✅ Rewards Seeded");




//----------------------- Fetch Rewards -----------------------------------------

  const rewards = await prisma.reward.findMany();

  const rewardMap = Object.fromEntries(
  rewards.map((reward) => [reward.title, reward.id])
  );

// ----------------------- Create Wheel Segments -----------------------

  await prisma.wheelSegment.createMany({
  data: [
    {
      position: 0,
      label: "5% OFF",
      color: "#2563EB",
      rewardId: rewardMap["5% OFF"],
    },
    {
      position: 1,
      label: "Better Luck",
      color: "#64748B",
      rewardId: rewardMap["Better Luck Next Time"],
    },
    {
      position: 2,
      label: "10% OFF",
      color: "#22C55E",
      rewardId: rewardMap["10% OFF"],
    },
    {
      position: 3,
      label: "5% OFF",
      color: "#2563EB",
      rewardId: rewardMap["5% OFF"],
    },
    {
      position: 4,
      label: "₹100",
      color: "#F59E0B",
      rewardId: rewardMap["₹100 Coupon"],
    },
    {
      position: 5,
      label: "Better Luck",
      color: "#64748B",
      rewardId: rewardMap["Better Luck Next Time"],
    },
    {
      position: 6,
      label: "15% OFF",
      color: "#EC4899",
      rewardId: rewardMap["15% OFF"],
    },
    {
      position: 7,
      label: "10% OFF",
      color: "#22C55E",
      rewardId: rewardMap["10% OFF"],
    },
  ],
  skipDuplicates: true,
});

console.log("✅ Wheel Segments Seeded");


// ----------------------- Generate Coupons -----------------------

function generateCoupons(prefix: string, count: number) {
  return Array.from({ length: count }, (_, index) => ({
    code: `${prefix}${String(index + 1).padStart(3, "0")}`,
  }));
}

const coupons = [
  ...generateCoupons("SAVE5-", 30).map((coupon) => ({
    ...coupon,
    rewardId: rewardMap["5% OFF"],
  })),

  ...generateCoupons("SAVE10-", 30).map((coupon) => ({
    ...coupon,
    rewardId: rewardMap["10% OFF"],
  })),

  ...generateCoupons("SAVE15-", 20).map((coupon) => ({
    ...coupon,
    rewardId: rewardMap["15% OFF"],
  })),

  ...generateCoupons("GIFT100-", 15).map((coupon) => ({
    ...coupon,
    rewardId: rewardMap["₹100 Coupon"],
  })),
];


// ----------------------- Insert Coupons -----------------------

await prisma.coupon.createMany({
  data: coupons.map((coupon) => ({
    ...coupon,
    status: CouponStatus.AVAILABLE,
  })),
});

console.log("✅ Coupons Seeded");
console.log("🎉 Database Seeded Successfully");
}
// ----------------------- Execute Seed -----------------------

main()
  .catch((error) => {
    console.error(error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });