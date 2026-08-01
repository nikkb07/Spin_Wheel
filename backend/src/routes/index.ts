import { Router } from "express";

import rewardRoutes from "./reward.routes";

import spinRoutes from "./spin.routes";
const router = Router();

router.use("/spin", spinRoutes);

router.get("/health", (_, res) => {
  res.json({
    success: true,
    message: "API Healthy 🚀",
  });
});

router.use("/rewards", rewardRoutes);

export default router;