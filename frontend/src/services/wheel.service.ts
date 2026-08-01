import api from "./api";

import { ApiResponse } from "@/types/api";
import { WheelSegment } from "@/types/reward";

export const getWheel = async () => {
  const response = await api.get<ApiResponse<WheelSegment[]>>(
    "/rewards/wheel"
  );

  return response.data.data;
};