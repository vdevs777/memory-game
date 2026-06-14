import {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";

export function useCardTimeoutAnimation() {
  const translateY = useSharedValue(0);

  function fall(delay: number = 0) {
    translateY.value = withDelay(
      delay,
      withTiming(800, { duration: 600, easing: Easing.in(Easing.cubic) }),
    );
  }

  function reset() {
    translateY.value = 0;
  }

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return { animatedStyle, fall, reset };
}
