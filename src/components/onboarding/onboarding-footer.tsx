import PrimaryButton from "../ui/primary-button";

interface OnboardingFooterProps {
  onContinue: () => void;
  onBack?: () => void;
  continueDisabled?: boolean;
  continueLabel?: string;
}

// Renders action buttons for onboarding navigation.
const OnboardingFooter = ({
  onContinue,
  onBack,
  continueDisabled = false,
  continueLabel = "Continue"
}: OnboardingFooterProps) => (
  <div className="flex flex-col items-center justify-between gap-3 border-t border-blue-400/30 bg-blue-900/60 px-4 py-4 text-white backdrop-blur-md sm:flex-row">
    <p className="text-xs text-blue-100/70 sm:text-sm">
      Tip: Choose two fish to start with and unlock exclusive decorations.
    </p>
    <div className="flex items-center gap-3">
      {onBack && (
        <PrimaryButton
          variant="secondary"
          className="rounded-lg px-4 py-2 text-xs sm:text-sm"
          onClick={onBack}
        >
          Back
        </PrimaryButton>
      )}
      <PrimaryButton
        variant="accent"
        className="rounded-lg px-4 py-2 text-xs sm:text-sm"
        onClick={onContinue}
        disabled={continueDisabled}
      >
        {continueLabel}
      </PrimaryButton>
    </div>
  </div>
);

export default OnboardingFooter;

