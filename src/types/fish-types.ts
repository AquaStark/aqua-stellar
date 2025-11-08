// Represents the minimal data required to describe a fish in the prototype UI.
export interface FishInfo {
  id: number;
  name: string;
  description: string;
  image: string;
  rarity: string;
  habitat: string;
  stats: {
    happiness: number;
    energy: number;
    hunger: number;
  };
}

