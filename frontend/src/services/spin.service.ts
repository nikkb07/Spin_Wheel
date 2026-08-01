import api from "./api";

import { ApiResponse } from "@/types/api";
import { SpinResponse } from "@/types/spin";

export const spinWheel = async (): Promise<SpinResponse> => {
  const response = await api.post<ApiResponse<SpinResponse>>("/spin");

  return response.data.data;
};