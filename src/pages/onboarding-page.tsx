import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import BubblesBackground from "../components/common/bubbles-background";
import FishCard from "../components/ui/fish-card";
import OrientationLock from "../components/ui/orientation-lock";
import OnboardingFooter from "../components/onboarding/onboarding-footer";
import OnboardingHeader from "../components/onboarding/onboarding-header";
import PrimaryButton from "../components/ui/primary-button";
import useBubbles from "../hooks/use-bubbles";
import useOnboardingFlow from "../hooks/use-onboarding-flow";
import useOnboardingState from "../hooks/use-onboarding-state";

// Recreates the onboarding flow with a welcome step and fish selection step.
const OnboardingPage = () => {
  const navigate = useNavigate();
  const bubbles = useBubbles({ initialCount: 10, maxBubbles: 22 });
  const { currentStep, nextStep, previousStep } = useOnboardingFlow();
  const { fishCatalog, selectedFishIds, toggleFishSelection, resetSelection } =
    useOnboardingState();

  const canContinue = useMemo(() => selectedFishIds.length === 2, [selectedFishIds]);

  const handleStart = () => {
    nextStep();
  };

  const handleFinish = () => {
    navigate("/game");
  };

  const handleReset = () => {
    resetSelection();
  };

  return (
    <OrientationLock forcePortrait>
      <div className="relative min-h-screen overflow-hidden bg-[#021830] text-white">
        <div className="absolute inset-0">
          <img
            src="/backgrounds/initaial-background.webp"
            alt="Ocean backdrop"
            className="h-full w-full object-cover"
            draggable={false}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#001a2e]/80 via-[#021d3b]/85 to-[#000d1a]/90" />
        </div>
        <BubblesBackground bubbles={bubbles} className="z-10" />

        <div className="relative z-20 flex min-h-screen flex-col">
          <OnboardingHeader
            title={currentStep === 1 ? "Start Your Journey" : "Choose Your Companions"}
            subtitle={
              currentStep === 1
                ? "Connect with the Aqua Stellar universe"
                : "Pick two fish to begin your aquarium"
            }
          />

          <main className="flex flex-1 flex-col gap-8 px-4 py-10 sm:px-8">
            {currentStep === 1 ? (
              <div className="mx-auto flex max-w-4xl flex-col-reverse items-center justify-center gap-10 rounded-3xl border border-blue-400/30 bg-blue-900/60 p-8 text-center shadow-2xl backdrop-blur-lg lg:flex-row lg:text-left">
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold">Hello, Explorer! 👋</h2>
                  <p className="text-blue-100/80">
                    Welcome to Aqua Stellar. In this prototype you can preview the onboarding
                    experience without connecting to StarkNet. Continue to pick your starter fish
                    and preview the in-game aquarium.
                  </p>
                  <div className="rounded-2xl border border-cyan-400/40 bg-cyan-500/10 p-4 text-sm text-cyan-100/80">
                    • Create your nickname · • Unlock a starter aquarium · • Receive two fish to care for
                  </div>
                  <div className="flex flex-col items-center gap-3 sm:flex-row">
                    <PrimaryButton
                      variant="accent"
                      className="rounded-xl px-6 py-3"
                      onClick={handleStart}
                    >
                      Begin onboarding
                    </PrimaryButton>
                    <PrimaryButton
                      variant="secondary"
                      className="rounded-xl px-6 py-3"
                      onClick={() => navigate("/")}
                    >
                      Back to landing
                    </PrimaryButton>
                  </div>
                </div>
                <img
                  src="/fish/fish2.png"
                  alt="Friendly fish"
                  className="h-48 w-auto drop-shadow-2xl"
                  draggable={false}
                />
              </div>
            ) : (
              <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
                <div className="flex flex-col items-start justify-between gap-4 rounded-3xl border border-blue-400/30 bg-blue-900/60 p-6 shadow-2xl backdrop-blur-lg sm:flex-row sm:items-center">
                  <div>
                    <h2 className="text-2xl font-bold">Pick two companions</h2>
                    <p className="text-sm text-blue-100/80">
                      Your selection defines the mood of your first aquarium. Hover to learn more
                      about each species.
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <PrimaryButton variant="secondary" className="rounded-lg px-4 py-2" onClick={handleReset}>
                      Reset
                    </PrimaryButton>
                    <span className="rounded-full border border-cyan-300/40 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-100/80">
                      Selected {selectedFishIds.length}/2
                    </span>
                  </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {fishCatalog.map(fish => (
                    <FishCard
                      key={fish.id}
                      fish={fish}
                      selected={selectedFishIds.includes(fish.id)}
                      onClick={() => toggleFishSelection(fish.id)}
                    />
                  ))}
                </div>
              </div>
            )}
          </main>

          <OnboardingFooter
            continueLabel={currentStep === 1 ? "Continue" : "Enter Aquarium"}
            onContinue={currentStep === 1 ? handleStart : handleFinish}
            onBack={currentStep === 2 ? previousStep : undefined}
            continueDisabled={currentStep === 2 && !canContinue}
          />
        </div>
      </div>
    </OrientationLock>
  );
};

export default OnboardingPage;

