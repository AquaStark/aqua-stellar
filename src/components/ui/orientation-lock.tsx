import { RotateCcw } from "lucide-react";
import type { PropsWithChildren } from "react";
import useOrientationLock from "../../hooks/use-orientation-lock";

interface OrientationLockProps extends PropsWithChildren {
  className?: string;
  forcePortrait?: boolean;
}

// Restricts gameplay to a given orientation and shows a friendly overlay otherwise.
const OrientationLock = ({
  children,
  className,
  forcePortrait = false
}: OrientationLockProps) => {
  const { isMobile, isPortrait } = useOrientationLock();
  const shouldShowContent = forcePortrait ? isPortrait : !isPortrait;

  if (!isMobile || shouldShowContent) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-800">
      <div className="relative mx-auto max-w-sm rounded-2xl bg-white/10 p-8 text-center shadow-2xl backdrop-blur-md">
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <RotateCcw
              size={80}
              className="animate-spin text-white"
              style={{ animationDuration: "2.4s" }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-white/20 border-t-white" />
            </div>
          </div>
        </div>
        <h1 className="mb-4 text-2xl font-bold text-white">
          {forcePortrait ? "Rotate to portrait" : "Rotate your device"}
        </h1>
        <p className="mb-6 text-white/90">
          {forcePortrait
            ? "For the best experience, hold your device vertically."
            : "Turn your device sideways to dive into the full aquarium view."}
        </p>
        <div className="rounded-xl border border-white/20 bg-white/10 p-4 text-sm text-white/80">
          {forcePortrait ? "📱 → 📱 Keep it upright!" : "📱 → 📱 Rotate 90 degrees."}
        </div>
      </div>
    </div>
  );
};

export default OrientationLock;

