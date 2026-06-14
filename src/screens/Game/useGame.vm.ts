import { CardEntryAnimationType } from "@/animations/config/animation.config";
import { useAnimationStore } from "@/animations/stores/animation.store";
import { getEntryAnimationDuration } from "@/animations/utils/animation.utils";
import { Difficulty } from "@/shared/interfaces/difficulty";
import { useGameStore } from "@/shared/stores/game.store";
import { challengeTheme, difficultyConfigs } from "@/shared/utils/challenge";
import { createSequence } from "@/shared/utils/sequence";
import { router, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";

export function useGameVM() {
  const { difficulty, themeId } = useLocalSearchParams<{
    themeId: string;
    difficulty: Difficulty;
  }>();

  const { initGame, previewAllCards, hideAllCards, startGame, cards } =
    useGameStore();
  const { entryAnimationType, setShouldAnimate, setEntryAnimationType } =
    useAnimationStore();

  const [visibleCountdown, setVisibleCountdown] = useState(false);

  const selectedTheme = challengeTheme.find((theme) => theme.id === themeId);

  const handleCountdownComplete = useCallback(() => {
    setVisibleCountdown(false);
    setShouldAnimate(true);

    const totalAnimationTime = getEntryAnimationDuration(
      cards.length,
      entryAnimationType,
    );

    createSequence()
      .wait(totalAnimationTime)
      .then(previewAllCards)
      .wait(2000)
      .then(hideAllCards)
      .wait(300)
      .then(startGame)
      .run();
  }, [
    cards.length,
    setShouldAnimate,
    entryAnimationType,
    previewAllCards,
    hideAllCards,
    startGame,
  ]);

  function handleGoBack() {
    router.back();
  }

  useEffect(() => {
    const theme = challengeTheme.find(({ id }) => id === themeId);

    if (theme && difficulty) {
      setShouldAnimate(false);
      const animationTypes: CardEntryAnimationType[] = ["deck", "throw"];

      const randomEntryType =
        animationTypes[Math.floor(Math.random() * animationTypes.length)];
      setEntryAnimationType(randomEntryType);

      initGame({
        id: `${themeId}-${difficulty}`,
        title: selectedTheme?.title || "Desconhecido",
        cards: selectedTheme?.cards || [],
        difficulty,
        estimatedTime: difficultyConfigs[difficulty].estimatedTime,
        timeLimit: difficultyConfigs[difficulty].timeLimit,
      });

      createSequence()
        .wait(500)
        .then(() => setVisibleCountdown(true))
        .run();
    }
  }, []);

  return {
    selectedTheme,
    visibleCountdown,
    handleCountdownComplete,
    handleGoBack,
  };
}
