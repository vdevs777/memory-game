import { useNumberAnimation } from "@/animations/hooks/useNumberAnimation";
import { Difficulty } from "@/shared/interfaces/difficulty";
import { difficultyConfigs } from "@/shared/utils/challenge";
import { useEffect, useState } from "react";
import {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const difficulties = ["Fácil", "Médio", "Difícil"] as Difficulty[];

export function useDifficultySelectorVM(selectedDifficulty: Difficulty) {
  console.log("Selected difficulty in VM:", selectedDifficulty);
  const difficultyConfig = difficultyConfigs[selectedDifficulty];

  const { animatedStyle: timeAnimatedStyle } = useNumberAnimation(
    difficultyConfig.estimatedTime,
  );

  const selectedIndex = difficulties.indexOf(selectedDifficulty);
  const translateX = useSharedValue(selectedIndex * 100);

  useEffect(() => {
    const newIndex = difficulties.indexOf(selectedDifficulty);
    translateX.value = withSpring(newIndex * 100, {
      stiffness: 120,
      damping: 30,
    });
  }, [selectedDifficulty, difficulties]);

  const animatedIndicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: `${translateX.value}%` }],
  }));

  return {
    difficulties,
    animatedIndicatorStyle,
    difficultyConfig,
    timeAnimatedStyle,
  };
}
