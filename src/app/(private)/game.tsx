import { GameView } from "@/screens/Game/Game.view";
import { useGameVM } from "@/screens/Game/useGame.vm";

export default function Game() {
  const vm = useGameVM();

  return <GameView {...vm} />;
}
