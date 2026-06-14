import { colors } from "@/constants/colors";
import { Difficulty } from "../interfaces/difficulty";

const difficultyColors = {
  Fácil: colors.feedback.info,
  Médio: colors.semantic.warning,
  Difícil: colors.semantic.error,
} as Record<Difficulty, string>;

export function getDifficultyColor(difficulty: Difficulty) {
  return difficultyColors[difficulty];
}
