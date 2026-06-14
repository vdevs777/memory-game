import { DifficultyIconViewProps } from "./DifficultyIcon.view";

export function useDifficultyIconVM({
  difficulty,
  color,
  isSelected,
  inactiveColor,
}: DifficultyIconViewProps) {
  const barHeights = [6, 10, 14];
  const barCount = difficulty === "Fácil" ? 1 : difficulty === "Médio" ? 2 : 3;

  function getBarStyle(index: number) {
    return {
      height: barHeights[index - 1],
      backgroundColor: index <= barCount && isSelected ? color : inactiveColor,
    };
  }

  return { getBarStyle };
}
