export  interface WheelSegment {
    position : number;
    label : string;
    color : string;
}

export interface Reward{
    id: number;
    title: string;
    probability: number;
    type: string;
    isActive: boolean;
}