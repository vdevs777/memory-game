import { CardEntryAnimationType } from "@/animations/config/animation.config";
import { useAnimationStore } from "@/animations/stores/animation.store";
import {
  getEntryAnimationDuration,
  getFallAnimationDuration,
} from "@/animations/utils/animation.utils";
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

  const {
    initGame,
    resetGame,
    pauseGame,
    previewAllCards,
    hideAllCards,
    startGame,
    cards,
    status,
    clearGame,
    resumeGame,
  } = useGameStore();
  const { entryAnimationType, setShouldAnimate, setEntryAnimationType } =
    useAnimationStore();

  const [visibleCountdown, setVisibleCountdown] = useState(false);
  const [visibleTimeoutModal, setVisibleTimeoutModal] = useState(false);

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

  function handleTryAgain() {
    setVisibleTimeoutModal(false);
    setShouldAnimate(false);
    setShowVictoryModal(false);
    resetGame();

    createSequence()
      .wait(300)
      .then(() => setVisibleCountdown(true))
      .run();
  }

  function handleExit() {
    setVisibleTimeoutModal(false);

    createSequence()
      .wait(200)
      .then(() => router.push("/(private)/home"))
      .run();
  }

  function handleGoHome() {
    clearGame();
    router.replace("/(private)/home");
  }

  const [showExitModal, setShowExitModal] = useState(false);
  const [showVictoryModal, setShowVictoryModal] = useState(false);

  const handleOpenExitModal = useCallback(() => {
    if (status === "playing") {
      pauseGame();
      setShowExitModal(true);
    }
  }, [pauseGame, status]);

  const handleConfirmExit = useCallback(() => {
    setShowExitModal(false);
    resetGame();
    router.replace("/(private)/home");
  }, [resetGame]);

  const handleCancelExit = useCallback(() => {
    resumeGame();
    setShowExitModal(false);
  }, []);

  useEffect(() => {
    if (status === "finished") {
      setShowVictoryModal(true);
    }

    if (status === "timeout") {
      createSequence()
        .wait(getFallAnimationDuration())
        .then(() => setVisibleTimeoutModal(true))
        .run();
    }
  }, [status]);

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
  }, [
    difficulty,
    initGame,
    selectedTheme?.cards,
    selectedTheme?.title,
    setEntryAnimationType,
    setShouldAnimate,
    themeId,
  ]);

  return {
    selectedTheme,
    visibleCountdown,
    handleCountdownComplete,
    visibleTimeoutModal,
    handleExit,
    handleTryAgain,
    handleGoHome,
    showExitModal,
    handleCancelExit,
    handleConfirmExit,
    handleOpenExitModal,
    setShowVictoryModal,
    showVictoryModal,
  };
}
