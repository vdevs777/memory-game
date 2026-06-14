import { StoreCard } from "@/shared/utils/challenge";
import { GameCardView } from "./GameCard.view";
import { useGameCardVM } from "./useGameCard.vm";

export interface GameCardProps {
  card: StoreCard;
  index: number;
}

export function GameCard({ card, index }: GameCardProps) {
  const vm = useGameCardVM({ card, index });

  return <GameCardView {...vm} />;
}
