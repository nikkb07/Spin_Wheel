"use client";

import { useEffect, useMemo, useState,memo } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

import { useWheel } from "@/hooks/useWheel";
import { spinWheel } from "@/services/spin.service";
import { useSpinStore } from "@/store/spinStore";
import { spinSound,winSound,loseSound } from "@/utils/sounds";
import Loading from "@/components/common/loading";

import WheelSvg from "./wheelSvg";
import WheelPointer from "./wheelPointer";


function Wheel() {
  const { wheel, loading } = useWheel();

  const {
    setResult,
    startCelebration,
    openModal,
    isSpinning,
    setIsSpinning,        
  } = useSpinStore();

  const [rotation, setRotation] = useState(0);
  const [winningIndex, setWinningIndex] = useState<number | null>(null);

  const wheelSize = 520;
  const radius = 240;
  const center = wheelSize / 2;

  const segmentAngle = useMemo(() => {
    if (!wheel.length) return 0;
    return 360 / wheel.length;
  }, [wheel]);


  
  const handleSpin = async () => {
    if (isSpinning) return;

    if(!wheel.length) return;
    
    setWinningIndex(null);

    spinSound.play();

   
    try {
      setIsSpinning(true);

      const response = await spinWheel();

      const wheelWinningIndex = response.wheelIndex;
      
     

      /**
       * Pointer is fixed at top (0°)
       *
       * Segment center:
       * index * angle + angle/2
       *
       * Need opposite rotation because wheel rotates clockwise.
       */

      const targetAngle =
        360 -
        (wheelWinningIndex * segmentAngle + segmentAngle/2);
      
      const extraSpins = 6 * 360;

      // Current wheel angle (0–359)
      const currentAngle = rotation % 360;

      // Clockwise delta needed to reach the target
      const delta = (targetAngle - currentAngle + 360) % 360;

      // Always move forward by 6 full spins + the required delta
      const finalRotation = rotation + extraSpins + delta;

      setRotation(finalRotation);

      setTimeout(() => {

        setWinningIndex(wheelWinningIndex);

        setResult(response);

        spinSound.stop();

        if(response.result === "WIN"){
          startCelebration();
          winSound.play();
        }else{
          loseSound.play();
        }

        openModal();

        setIsSpinning(false);
      }, 6200);
      console.log("Winning Index:", wheelWinningIndex);
      console.log("Winning Reward:", response.reward);

    } catch (error) {
      spinSound.stop();

      console.error(error);

      setIsSpinning(false);
    }
  };

  useEffect(() => {
    if (wheel.length){
      setRotation(0);
    }    
  }, [wheel]);

  
  if (loading) {
    return <Loading />;
  }

  if (!wheel.length) {
    return (
      <div className="text-center text-red-400 text-lg">
        Failed to load wheel.
      </div>
    );
  }
  
  
  return (
    <div className="relative
            mx-auto
            flex
            w-full
             max-w-[320px]
            flex-col
            items-center
            sm:max-w-[420px]
            md:max-w-[520px]
            lg:max-w-[600px]">

      {/* Pointer */}
      <div className="absolute -top-10 z-40">
        <WheelPointer />
      </div>

      <motion.div
        animate={{
          rotate: rotation,
        }}
        transition={{
          duration: 6,
          ease: [0.22, 1, 0.36, 1],
        }}
      
      >    
        <WheelSvg
          wheel={wheel}
          wheelSize={wheelSize}
          radius={radius}
          center={center}
          segmentAngle={segmentAngle}
          winningIndex={winningIndex}
        />
      </motion.div>

      <button
        onClick={handleSpin}
        disabled={loading || isSpinning}
        aria-label="Spin Wheel"
        className={`
          mt-8 sm:mt-10
          inline-flex
          items-center
          gap-3
          rounded-full
          px-8
          py-4
          text-lg
          font-bold
          transition-all
          duration-300
          shadow-xl
          focus:outline-none
          focus:ring-4
        focus:ring-cyan-500/40
          ${
            isSpinning
              ? "cursor-not-allowed bg-slate-700 text-slate-400"
              : "bg-cyan-500 hover:bg-cyan-400 hover:scale-105 active:scale-95 text-white shadow-cyan-500/40"
          }
        `}
      >
        <Play size={20} />

        {isSpinning ? "Spinning..." : "Spin Now"}
      </button>

      {/* Glow Background */}
      <div
        className="
          absolute
          -z-10
          h-[350px]
          w-[350px]
          sm:h-[450px]
          sm:w-[450px]
          md:h-[620px]
          md:w-[620px]
          rounded-full
         bg-yellow-400/15
          blur-[170px]
        "
      />
    </div>
  );
}
export default memo(Wheel);