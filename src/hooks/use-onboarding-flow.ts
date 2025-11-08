import { useState } from "react";

// Manages the step-by-step flow within the onboarding route.
const useOnboardingFlow = () => {
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);

  const goToStep = (step: 1 | 2) => setCurrentStep(step);
  const nextStep = () => setCurrentStep(previous => (previous === 1 ? 2 : 2));
  const previousStep = () => setCurrentStep(previous => (previous === 2 ? 1 : 1));

  return {
    currentStep,
    goToStep,
    nextStep,
    previousStep
  };
};

export default useOnboardingFlow;

