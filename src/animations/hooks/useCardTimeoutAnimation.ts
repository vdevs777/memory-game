import {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";

export function useCardTimeoutAnimation() {
  const translateY = useSharedValue(0);
  const rotation = useSharedValue(0);
  const opacity = useSharedValue(1);

  function fall(delay: number = 0) {
    const randomRotation = (Math.random() - 0.5) * 60;

    opacity.value = withDelay(delay + 400, withTiming(0, { duration: 200 }));
    translateY.value = withDelay(
      delay,
      withTiming(800, { duration: 600, easing: Easing.in(Easing.cubic) }),
    );
    rotation.value = withDelay(
      delay,
      withTiming(randomRotation, {
        duration: 300,
        easing: Easing.out(Easing.ease),
      }),
    );
  }

  function reset() {
    translateY.value = 0;
  }

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: translateY.value },
      { rotate: `${rotation.value}deg` },
    ],
    opacity: opacity.value,
  }));

  return { animatedStyle, fall, reset };
}
