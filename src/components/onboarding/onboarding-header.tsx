import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface OnboardingHeaderProps {
  title: string;
  subtitle: string;
}

// Provides the translucent header bar for the onboarding views.
const OnboardingHeader = ({ title, subtitle }: OnboardingHeaderProps) => (
  <header className="flex items-center justify-between border-b border-blue-400/30 bg-blue-900/60 px-4 py-4 text-white backdrop-blur-md">
    <Link
      to="/"
      className="flex items-center gap-2 text-sm text-blue-100/80 transition-colors hover:text-white"
    >
      <ArrowLeft size={18} />
      Back Home
    </Link>
    <div className="text-center">
      <h1 className="text-lg font-semibold sm:text-xl">{title}</h1>
      <p className="text-xs text-blue-100/70 sm:text-sm">{subtitle}</p>
    </div>
    <div className="h-8 w-8 rounded-full border border-white/20 bg-white/10" />
  </header>
);

export default OnboardingHeader;

