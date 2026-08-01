import { Request, Response } from "express";

import { ApiResponse } from "../utils/ApiResponse";

import * as rewardService from "../services/reward.service";

import { asyncHandler } from "../utils/asyncHandler";

export const getRewards = asyncHandler(async (_, res: Response) => {
  const rewards = await rewardService.getRewards();

  res.json(
    new ApiResponse(
      true,
      "Rewards fetched successfully",
      rewards
    )
  );
});

export const getWheel = asyncHandler(async (_, res: Response) => {
  const wheel = await rewardService.getWheelSegments();

  res.json(
    new ApiResponse(
      true,
      "Wheel configuration fetched successfully",
      wheel
    )
  );
});