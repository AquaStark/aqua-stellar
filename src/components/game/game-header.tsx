import { Droplet, Fish, Gem, Menu } from "lucide-react";
import PrimaryButton from "../ui/primary-button";

interface GameHeaderProps {
  onMenuToggle: () => void;
}

// Displays the top HUD with player stats and a menu toggle.
const GameHeader = ({ onMenuToggle }: GameHeaderProps) => (
  <header className="flex items-center justify-between border-b border-blue-400/30 bg-blue-950/60 px-4 py-3 text-white backdrop-blur-md">
    <div>
      <h1 className="text-lg font-bold">Aqua Stellar Aquarium</h1>
      <p className="text-xs text-blue-100/70">Prototype experience · No blockchain connectivity</p>
    </div>
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-3 rounded-2xl border border-blue-400/40 bg-blue-900/60 px-3 py-2 text-xs">
        <span className="flex items-center gap-1 text-emerald-200">
          <Fish size={16} /> Happiness 82%
        </span>
        <span className="flex items-center gap-1 text-cyan-200">
          <Droplet size={16} /> Cleanliness 74%
        </span>
        <span className="flex items-center gap-1 text-amber-200">
          <Gem size={16} /> Energy 68%
        </span>
      </div>
      <PrimaryButton
        variant="secondary"
        className="rounded-xl px-4 py-2 text-xs"
        onClick={onMenuToggle}
      >
        <Menu size={16} />
        Menu
      </PrimaryButton>
    </div>
  </header>
);

export default GameHeader;

