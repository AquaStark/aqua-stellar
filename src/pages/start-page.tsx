import BubblesBackground from "../components/common/bubbles-background";
import FeaturedFish from "../components/start/featured-fish";
import HeroSection from "../components/start/hero-section";
import LandingFooter from "../components/start/landing-footer";
import LandingNavbar from "../components/start/landing-navbar";
import useBubbles from "../hooks/use-bubbles";
import usePulseAnimation from "../hooks/use-pulse-animation";

// Renders the landing page replica with animated background and CTA sections.
const StartPage = () => {
  const bubbles = useBubbles({
    initialCount: 12,
    maxBubbles: 25,
    minSize: 6,
    maxSize: 18,
    minDuration: 10,
    maxDuration: 22,
    interval: 900
  });
  const { isPulsing, triggerPulse } = usePulseAnimation({ duration: 2500 });

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#021830] text-white">
      <div
        className="fixed inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url("/backgrounds/initaial-background.webp")' }}
      />
      <div className="water-movement fixed inset-0" />
      <BubblesBackground bubbles={bubbles} className="z-10" />

      <div className="relative z-20 flex min-h-screen flex-col">
        <div className="relative h-20 sm:h-24">
          <LandingNavbar isPulsing={isPulsing} />
        </div>

        <main className="flex flex-1 flex-col items-center justify-start gap-6 px-4 pb-16 pt-8 sm:pt-12">
          <HeroSection onTriggerPulse={triggerPulse} />
          <FeaturedFish />
        </main>

        <LandingFooter />
      </div>
    </div>
  );
};

export default StartPage;

