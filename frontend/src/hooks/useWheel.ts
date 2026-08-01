"use client";

import { useEffect } from "react";

import { getWheel } from "@/services/wheel.service";

import { useSpinStore } from "@/store/spinStore";

export const useWheel = () => {
  const {
    wheel,
    setWheel,
    loading,
    setLoading,
  } = useSpinStore();

  useEffect(() => {
    const loadWheel = async () => {
      try {
        setLoading(true);

        const segments = await getWheel();

        setWheel(segments);
      } catch (error) {
        console.error("Failed to load wheel", error);
      } finally {
        setLoading(false);
      }
    };

    loadWheel();
  }, [setLoading, setWheel]);

  return {
    wheel,
    loading,
  };
};