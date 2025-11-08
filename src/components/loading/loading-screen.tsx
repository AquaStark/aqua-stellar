import { AnimatePresence, motion } from "framer-motion";
import type { PropsWithChildren } from "react";
import BubblesBackground from "../common/bubbles-background";
import useBubbles from "../../hooks/use-bubbles";
import useLoadingProgress from "../../hooks/use-loading-progress";

interface LoadingScreenProps extends PropsWithChildren {
  onComplete?: () => void;
  duration?: number;
  showTips?: boolean;
}

const tips = [
  "💡 Keep your aquarium sparkling clean to boost happiness.",
  "🐟 Feed your fish regularly so they never get grumpy.",
  "🌊 Decorations add personality and unlock bonuses.",
  "🎮 Complete quests to discover legendary water friends.",
  "🏆 Compete with friends for the most vibrant aquarium."
];

// Displays the animated loading screen with bubbles, tips, and logo flair.
const LoadingScreen = ({
  onComplete,
  duration = 8000,
  showTips = true
}: LoadingScreenProps) => {
  const bubbles = useBubbles({
    initialCount: 14,
    maxBubbles: 28,
    minSize: 6,
    maxSize: 24,
    minDuration: 12,
    maxDuration: 28,
    interval: 600
  });
  const { progress, message } = useLoadingProgress({ duration, onComplete });
  const tipIndex = Math.min(Math.floor(progress / (100 / tips.length)), tips.length - 1);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-blue-500 to-blue-900">
      <div className="water-movement" />
      <BubblesBackground bubbles={bubbles} className="z-10" animationName="loading-float-up" />

      <main className="relative z-20 flex min-h-screen flex-col items-center justify-center px-4 py-16 text-center text-white">
        <motion.img
          src="/logo/aqua-stark.png"
          alt="Aqua Stellar"
          className="mb-6 h-28 w-auto sm:h-36 md:h-44"
          initial={{ opacity: 0, y: -40, scale: 0.85 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
        <motion.p
          key={message}
          className="mb-8 text-sm text-blue-100/90 sm:text-base md:text-lg"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3 }}
        >
          {message}
        </motion.p>

        <div className="relative flex w-full max-w-xl items-center rounded-full border border-blue-400/50 bg-blue-900/40 p-2 shadow-lg backdrop-blur">
          <motion.div
            className="relative h-6 w-full rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 shadow-inner sm:h-7"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{ x: ["-150%", "150%"] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
            />
            <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-white drop-shadow sm:text-sm">
              {Math.round(progress)}%
            </span>
          </motion.div>
        </div>

        {showTips && (
          <AnimatePresence mode="wait">
            <motion.div
              key={tipIndex}
              className="mt-8 max-w-md rounded-2xl border border-cyan-300/30 bg-blue-900/40 px-6 py-4 text-sm text-blue-100/90 backdrop-blur-xl sm:text-base"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
            >
              {tips[tipIndex]}
            </motion.div>
          </AnimatePresence>
        )}
      </main>

      <div className="absolute bottom-0 left-0 hidden w-full items-center justify-center border-t border-blue-400/30 bg-blue-900/60 py-4 text-xs text-blue-200 sm:flex">
        © {new Date().getFullYear()} Aqua Stellar
      </div>
    </div>
  );
};

export default LoadingScreen;

