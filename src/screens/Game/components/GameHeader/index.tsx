import { GameHeaderView } from "./GameHeader.view";
import { useGameHeaderVM } from "./useGameHeader.vm";

export interface GameHeaderProps {
  handleGoBack: () => void;
}

export function GameHeader({ handleGoBack }: GameHeaderProps) {
  const vm = useGameHeaderVM();

  return <GameHeaderView {...vm} handleGoBack={handleGoBack} />;
}
