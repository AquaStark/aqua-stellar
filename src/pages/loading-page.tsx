import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../components/loading/loading-screen";
import OrientationLock from "../components/ui/orientation-lock";

// Shows the animated loading experience before continuing to the game view.
const LoadingPage = () => {
  const navigate = useNavigate();

  const handleComplete = useCallback(() => {
    navigate("/game");
  }, [navigate]);

  return (
    <OrientationLock forcePortrait>
      <LoadingScreen onComplete={handleComplete} />
    </OrientationLock>
  );
};

export default LoadingPage;

