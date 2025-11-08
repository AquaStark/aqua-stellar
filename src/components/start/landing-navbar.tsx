import {
  LogOut,
  Maximize2,
  Menu,
  Store,
  Wand2,
  Settings,
  Sparkles,
  X
} from "lucide-react";
import clsx from "clsx";
import { useMemo } from "react";
import useNavbarState from "../../hooks/use-navbar-state";
import PrimaryButton from "../ui/primary-button";

interface LandingNavbarProps {
  isPulsing?: boolean;
  onNavigate?: (path: string) => void;
}

// Recreates the Aqua Stark landing navbar with simplified stateful behavior.
const LandingNavbar = ({ isPulsing = false, onNavigate }: LandingNavbarProps) => {
  const navItems = useMemo(
    () => [
      { id: "store", label: "Store", icon: Store },
      { id: "tutorial", label: "Tutorial", icon: Wand2 },
      { id: "settings", label: "Settings", icon: Settings },
      { id: "credits", label: "Credits", icon: Sparkles }
    ],
    []
  );
  const {
    activeButton,
    isConnected,
    isSidebarOpen,
    toggleSidebar,
    handleActionSelect,
    toggleConnection
  } = useNavbarState();

  const handleNavigation = (itemId: string) => {
    handleActionSelect(itemId);
    onNavigate?.(itemId);
  };

  return (
    <>
      <nav className="relative z-20 flex h-full items-center justify-between bg-gradient-to-b from-black/40 to-transparent px-2 py-2 sm:px-4">
        <button
          type="button"
          className="flex items-center justify-center rounded-md border border-blue-300 bg-gradient-to-b from-blue-400 to-blue-600 p-2 text-white shadow-lg transition-transform duration-200 hover:scale-105 sm:hidden"
          onClick={toggleSidebar}
          aria-label="Toggle menu"
        >
          {isSidebarOpen ? <X size={18} /> : <Menu size={18} />}
        </button>

        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Aqua_Stark-removebg-preview-ubKSrqYo7jzOH5qXqxEw4CyRHXIjfq.png"
          alt="Aqua Stark Logo"
          className="h-10 w-auto drop-shadow-2xl sm:h-14 md:h-16"
          draggable={false}
        />

        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-3 sm:flex">
          {navItems.map(item => (
            <PrimaryButton
              key={item.id}
              variant="secondary"
              className={clsx(
                "flex items-center gap-2 rounded-lg px-4 py-2 text-xs shadow-lg sm:text-sm",
                activeButton === item.id && "ring-2 ring-cyan-300"
              )}
              onClick={() => handleNavigation(item.id)}
            >
              <item.icon size={16} />
              {item.label}
            </PrimaryButton>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="rounded-md border border-blue-300 bg-gradient-to-b from-blue-400 to-blue-600 p-2 text-white shadow-lg transition-transform duration-200 hover:scale-105"
          >
            <Maximize2 size={18} />
          </button>

          {isConnected ? (
            <div className="flex items-center gap-2 rounded-xl border border-blue-400/40 bg-blue-900/50 px-3 py-2 text-xs text-white shadow-lg">
              <span className="font-mono">0xA4…21</span>
              <button
                type="button"
                className="rounded-md border border-red-300 bg-gradient-to-b from-red-400 to-red-600 p-2 text-white shadow"
                onClick={toggleConnection}
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <div className={clsx(isPulsing && "animate-pulse-glow")}>
              <PrimaryButton
                variant="accent"
                className="rounded-lg px-4 py-2 text-xs sm:text-sm"
                onClick={toggleConnection}
              >
                Connect Wallet
              </PrimaryButton>
            </div>
          )}
        </div>
      </nav>

      {isSidebarOpen && (
        <div className="fixed inset-0 z-30 sm:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={toggleSidebar}
            aria-label="Close sidebar"
          />
          <div className="absolute right-0 top-0 h-full w-64 bg-gradient-to-b from-blue-900/95 to-blue-800/95 p-6 shadow-2xl">
            <div className="mb-6 flex justify-end">
              <button
                type="button"
                className="rounded-lg bg-blue-700/60 p-2 text-white"
                onClick={toggleSidebar}
              >
                <X size={18} />
              </button>
            </div>
            <div className="space-y-3">
              {navItems.map(item => (
                <PrimaryButton
                  key={item.id}
                  variant="secondary"
                  className={clsx(
                    "flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm",
                    activeButton === item.id && "ring-2 ring-cyan-300"
                  )}
                  onClick={() => handleNavigation(item.id)}
                >
                  <item.icon size={18} />
                  {item.label}
                </PrimaryButton>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LandingNavbar;

