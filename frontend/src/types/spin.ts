export interface SpinResponse{
    reward: string;
    coupon: string | null;
    wheelIndex: number;
    result : "WIN" | "LOSE";
}