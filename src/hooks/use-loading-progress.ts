import { useEffect, useMemo, useRef, useState } from "react";

interface LoadingStep {
  progress: number;
  text: string;
  duration: number;
}

interface UseLoadingProgressOptions {
  duration?: number;
  customSteps?: LoadingStep[];
  onComplete?: () => void;
}

const defaultSteps: LoadingStep[] = [
  { progress: 15, text: "Connecting to the ocean currents...", duration: 1200 },
  { progress: 32, text: "Calibrating the aquarium sensors...", duration: 1100 },
  { progress: 54, text: "Waking up your fish friends...", duration: 1200 },
  { progress: 73, text: "Arranging coral decorations...", duration: 1100 },
  { progress: 88, text: "Filling the tank with stardust water...", duration: 1000 },
  { progress: 100, text: "Preparing your Aqua Stellar journey!", duration: 1400 }
];

// Simulates a smooth loading sequence with textual steps and completion callback.
const useLoadingProgress = ({
  duration = 8000,
  customSteps,
  onComplete
}: UseLoadingProgressOptions = {}) => {
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState(defaultSteps[0].text);
  const hasCompletedRef = useRef(false);

  const steps = useMemo<LoadingStep[]>(() => {
    if (customSteps && customSteps.length > 0) {
      return customSteps;
    }

    return defaultSteps.map(step => ({
      ...step,
      duration: (duration / defaultSteps.length) * (step.duration / 1200)
    }));
  }, [customSteps, duration]);

  useEffect(() => {
    const totalDuration = steps.reduce(
      (accumulator, step) => accumulator + step.duration,
      0
    );

    const startTimestamp = performance.now();

    const update = (timestamp: number) => {
      const elapsed = timestamp - startTimestamp;
      const ratio = Math.min(elapsed / totalDuration, 1);

      let accumulated = 0;
      let activeStep = steps[0];

      for (const step of steps) {
        const stepRatio = step.duration / totalDuration;
        if (ratio <= accumulated + stepRatio) {
          activeStep = step;
          break;
        }
        accumulated += stepRatio;
      }

      const stepProgress =
        ((ratio - accumulated) / (activeStep.duration / totalDuration)) *
        activeStep.progress;
      const previousProgress = steps
        .slice(0, steps.indexOf(activeStep))
        .reduce((accumulator, step) => accumulator + step.progress, 0);

      setProgress(Math.min(previousProgress + stepProgress, 100));
      setMessage(activeStep.text);

      if (ratio < 1) {
        requestAnimationFrame(update);
      } else if (!hasCompletedRef.current) {
        hasCompletedRef.current = true;
        window.setTimeout(() => {
          onComplete?.();
        }, 600);
      }
    };

    const animationFrame = requestAnimationFrame(update);

    return () => cancelAnimationFrame(animationFrame);
  }, [onComplete, steps]);

  return { progress, message };
};

export default useLoadingProgress;

