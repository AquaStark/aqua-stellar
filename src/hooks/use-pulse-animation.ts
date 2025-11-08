import { useCallback, useEffect, useState } from "react";

interface UsePulseAnimationOptions {
  duration?: number;
}

// Controls a temporary pulse animation flag that auto-resets after a delay.
const usePulseAnimation = ({ duration = 3000 }: UsePulseAnimationOptions = {}) => {
  const [isPulsing, setIsPulsing] = useState(false);

  const triggerPulse = useCallback(() => {
    setIsPulsing(true);
  }, []);

  useEffect(() => {
    if (!isPulsing) {
      return;
    }

    const timer = window.setTimeout(() => {
      setIsPulsing(false);
    }, duration);

    return () => window.clearTimeout(timer);
  }, [duration, isPulsing]);

  return { isPulsing, triggerPulse };
};

export default usePulseAnimation;

