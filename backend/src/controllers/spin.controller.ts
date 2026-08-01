import { Response } from "express";

import { asyncHandler } from "../utils/asyncHandler";
import { ApiResponse } from "../utils/ApiResponse";

import * as spinService from "../services/spin.service";

export const spinWheel = asyncHandler(async (_, res: Response) => {
  const result = await spinService.spinWheel();

  res.status(200).json(
    new ApiResponse(
      true,
      "Spin completed successfully",
      result
    )
  );
});