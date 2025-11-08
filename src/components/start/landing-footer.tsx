// Displays the translucent footer for the landing view.
const LandingFooter = () => (
  <footer className="relative z-30 flex items-center justify-center border-t border-blue-400/30 bg-blue-900/40 py-4 text-xs text-blue-100/80 backdrop-blur-lg sm:text-sm">
    © {new Date().getFullYear()} Aqua Stellar · Visual prototype inspired by Aqua
    Stark
  </footer>
);

export default LandingFooter;

