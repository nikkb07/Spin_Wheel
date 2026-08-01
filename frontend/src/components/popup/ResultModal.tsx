"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Copy, Gift, Frown, Check } from "lucide-react";
import { useSpinStore } from "@/store/spinStore";

export default function ResultModal() {
  const {
    result,
    isModalOpen,
    closeModal,
    isSpinning,
  } = useSpinStore();

  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!isModalOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !isSpinning) {
        closeModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen, isSpinning, closeModal]);

  useEffect(() => {
    if (!isModalOpen) {
      setCopied(false);
    }
  }, [isModalOpen]);

  const copyCoupon = async () => {
    if (!result?.coupon) return;

    try {
      await navigator.clipboard.writeText(result.coupon);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy coupon:", error);
    }
  };

  if (!result) return null;

  return (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            if (!isSpinning) {
              closeModal();
            }
          }}
        >
          <motion.div
            className="w-full max-w-sm sm:max-w-md rounded-3xl border border-slate-700/60 bg-slate-900/95 p-5 sm:p-6 md:p-8 backdrop-blur-xl shadow-[0_0_80px_rgba(37,99,235,.25)]"
            initial={{
              scale: 0.6,
              opacity: 0,
              y: 50,
            }}
            animate={{
              scale: 1,
              opacity: 1,
              y: 0,
            }}
            exit={{
              scale: 0.8,
              opacity: 0,
              y: 30,
            }}
            transition={{
              type: "spring",
              stiffness: 280,
              damping: 18,
              mass: 0.8,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {result.result === "WIN" ? (
              <>
                <div className="mb-6 flex justify-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      delay: 0.25,
                      type: "spring",
                      stiffness: 250,
                    }}
                    className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 shadow-[0_0_40px_rgba(251,191,36,.5)]"
                  >
                    <Gift className="h-12 w-12 text-white" />
                  </motion.div>
                </div>

                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  className="text-center text-3xl font-bold text-white"
                >
                  🎉 Congratulations!
                </motion.h2>

                <p className="mt-2 text-center text-slate-400">
                  You won
                </p>

                <motion.h3
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.45 }}
                  className="mt-2 text-center text-4xl font-extrabold text-blue-400"
                >
                  {result.reward}
                </motion.h3>

                {result.coupon && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 20,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay: 0.55,
                    }}
                    className="mt-8"
                  >
                    <p className="mb-2 text-center text-sm uppercase tracking-wider text-slate-400">
                      Coupon Code
                    </p>

                    <div className="flex items-center justify-between rounded-xl border border-slate-700 bg-slate-800 px-5 py-4">
                      <span className="font-mono text-lg font-semibold text-white">
                        {result.coupon}
                      </span>

                      <button
                        type="button"
                        onClick={copyCoupon}
                        aria-label="Copy coupon"
                        className="rounded-lg bg-blue-600 p-2 transition-all duration-200 hover:scale-110 hover:bg-blue-700 active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-500/40"
                      >
                        {copied ? (
                          <Check className="text-white" size={20} />
                        ) : (
                          <Copy className="text-white" size={20} />
                        )}
                      </button>
                    </div>

                    <AnimatePresence>
                      {copied && (
                        <motion.p
                          initial={{
                            opacity: 0,
                            y: 8,
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                          }}
                          exit={{
                            opacity: 0,
                            y: -8,
                          }}
                          className="mt-2 text-center text-sm font-medium text-green-400"
                        >
                          ✓ Coupon copied successfully
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}

                <motion.button
                  type="button"
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: 0.75,
                  }}
                  onClick={() => {
                    if (!isSpinning) {
                      closeModal();
                    }
                  }}
                  className="mt-8 w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3 text-lg font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(59,130,246,.45)] active:scale-[0.98]"
                >
                  Spin Again
                </motion.button>
              </>
            ) : (
              <>
                <div className="mb-6 flex justify-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      delay: 0.25,
                      type: "spring",
                      stiffness: 250,
                    }}
                    className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-rose-700 shadow-[0_0_35px_rgba(239,68,68,.45)]"
                  >
                    <Frown className="h-12 w-12 text-white" />
                  </motion.div>
                </div>

                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  className="text-center text-3xl font-bold text-white"
                >
                  Better Luck Next Time!
                </motion.h2>

                <p className="mt-4 text-center text-slate-400">
                  Don't give up. Try your luck again!
                </p>

                <motion.button
                  type="button"
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: 0.5,
                  }}
                  onClick={() => {
                    if (!isSpinning) {
                      closeModal();
                    }
                  }}
                  className="mt-10 w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3 text-lg font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(59,130,246,.45)] active:scale-[0.98]"
                >
                  Spin Again
                </motion.button>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}