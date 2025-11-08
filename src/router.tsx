import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./components/layout/app-layout";
import OnboardingPage from "./pages/onboarding-page";
import StartPage from "./pages/start-page";
import LoadingPage from "./pages/loading-page";
import GamePage from "./pages/game-page";

// Sets up the central routing table for the frontend prototype.
const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <StartPage />
      },
      {
        path: "loading",
        element: <LoadingPage />
      },
      {
        path: "game",
        element: <GamePage />
      },
      {
        path: "onboarding",
        element: <OnboardingPage />
      }
    ]
  }
]);

export default router;

