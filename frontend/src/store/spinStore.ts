import {create} from "zustand";
import { WheelSegment } from "@/types/reward";
import { SpinResponse } from "@/types/spin";

interface SpinStore {
  wheel: WheelSegment[];

  loading: boolean;

  result: SpinResponse | null;

  isModalOpen: boolean;

  isSpinning: boolean;

  setWheel: (wheel: WheelSegment[]) => void;

  setLoading: (loading: boolean) => void;

  setResult: (result: SpinResponse | null) => void;

  openModal: () => void;

  closeModal: () => void;

  setIsSpinning: (isSpinning: boolean) => void;

  showCelebration: boolean;

  celebrationKey: number;

  startCelebration: () => void;

  stopCelebration: () => void;

}

export const useSpinStore = create<SpinStore>((set) => ({
    wheel: [],

    loading: false,
    
    result: null,
    
    setWheel: (wheel) => set({ wheel }),
    
    setLoading: (loading) => set({ loading }),
    
    setResult: (result) => set({ result }),

    isModalOpen: false,

    openModal: () =>
      set({
        isModalOpen: true,
      }),

    closeModal: () =>
    set({
        isModalOpen: false,
     result: null,
     }),
    
    isSpinning: false,

    setIsSpinning: (value) =>
        set({
            isSpinning: value,
        }),
    showCelebration: false,
    celebrationKey: 0,

    startCelebration: () =>
       set((state) => ({
          showCelebration: true,
          celebrationKey: state.celebrationKey + 1,
        })),

    stopCelebration: () =>
       set({ showCelebration: false }),
}));
