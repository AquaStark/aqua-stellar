import { useEffect, useState } from "react";

// Tracks device orientation and mobile detection for the orientation overlay.
const useOrientationLock = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isPortrait, setIsPortrait] = useState(false);

  useEffect(() => {
    const evaluate = () => {
      const mobileRegex =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
      setIsMobile(mobileRegex.test(window.navigator.userAgent));
      setIsPortrait(window.innerHeight >= window.innerWidth);
    };

    evaluate();
    window.addEventListener("resize", evaluate);
    window.addEventListener("orientationchange", evaluate);

    return () => {
      window.removeEventListener("resize", evaluate);
      window.removeEventListener("orientationchange", evaluate);
    };
  }, []);

  return { isMobile, isPortrait };
};

export default useOrientationLock;

