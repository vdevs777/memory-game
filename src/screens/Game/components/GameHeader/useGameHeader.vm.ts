import { useGameStore } from "@/shared/stores/game.store";
import { useEffect } from "react";
import {
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

export function useGameHeaderVM() {
  const { timeRemaining } = useGameStore();

  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  const scale = useSharedValue(1);

  const time = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  const isCriticalTime = timeRemaining <= 20;

  const animatedTimerStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  useEffect(() => {
    if (isCriticalTime) {
      scale.value = withRepeat(
        withSequence(
          withTiming(1.1, { duration: 300 }),
          withTiming(1, { duration: 300 }),
        ),
        -1,
        true,
      );
    } else {
      cancelAnimation(scale);
    }
  }, [timeRemaining, isCriticalTime, scale]);

  return { time, isCriticalTime, animatedTimerStyle };
}
