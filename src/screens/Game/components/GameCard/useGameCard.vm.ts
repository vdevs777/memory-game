import {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { GameCardProps } from ".";
import { useGameStore } from "@/shared/stores/game.store";
import { useEffect, useRef } from "react";
import { useCardEntryAnimation } from "@/animations/hooks/useCardEntryAnimation";
import { useCardShakeAnimation } from "@/animations/hooks/useCardShakeAnimation";
import { useCardSuccessAnimation } from "@/animations/hooks/useCardSuccessAnimation";
import { useCardTimeoutAnimation } from "@/animations/hooks/useCardTimeoutAnimation";

export function useGameCardVM({ card, index }: GameCardProps) {
  const rotation = useSharedValue(card.isFlipped ? 180 : 0);

  const { selectCard, status } = useGameStore();

  const { animatedStyle: shakeCardAnimatedStyle, shake } =
    useCardShakeAnimation();

  const {
    animatedStyle: cardSuccessAnimatedStyle,
    playSuccess,
    fadeOut,
  } = useCardSuccessAnimation();

  const {
    animatedStyle: cardTimeoutAnimatedStyle,
    fall,
    reset,
  } = useCardTimeoutAnimation();

  const previousFlippedRef = useRef(card.isFlipped);

  const entry = useCardEntryAnimation({ cardIndex: index });

  const frontAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { perspective: 1000 },
      { rotateY: `${interpolate(rotation.value, [0, 180], [0, 180])}deg` },
    ],
  }));

  const backAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { perspective: 1000 },
      { rotateY: `${interpolate(rotation.value, [0, 180], [180, 360])}deg` },
    ],
  }));

  useEffect(() => {
    rotation.value = withSpring(card.isFlipped ? 180 : 0, { duration: 300 });
  }, [card.isFlipped, rotation]);

  useEffect(() => {
    if (card.isFlipped === false && previousFlippedRef.current === true) {
      shake();
    }

    previousFlippedRef.current = card.isFlipped;
  }, [card.isFlipped, shake]);

  useEffect(() => {
    if (card.isMatched) playSuccess();

    setTimeout(() => fadeOut(), 600);
  }, [card.isMatched, playSuccess]);

  useEffect(() => {
    if (status === "timeout" && !card.isMatched) {
      const randomDelay = Math.random() * 200;
      fall(randomDelay);
    }
  }, [status]);

  return {
    card,
    index,
    frontAnimatedStyle,
    backAnimatedStyle,
    selectCard,
    entry,
    shakeCardAnimatedStyle,
    cardSuccessAnimatedStyle,
    cardTimeoutAnimatedStyle,
  };
}
