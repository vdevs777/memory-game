import {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

export function useCardShakeAnimation() {
  const translateX = useSharedValue(0);
  const rotation = useSharedValue(0);

  function shake() {
    translateX.value = withSequence(
      withTiming(10, { duration: 50 }),
      withRepeat(
        withSequence(
          withTiming(-10, { duration: 50 }),
          withTiming(10, { duration: 50 }),
        ),
        3,
        false,
      ),
      withTiming(0, { duration: 50 }),
    );

    rotation.value = withSequence(
      withTiming(5, { duration: 50 }),

      withRepeat(
        withSequence(
          withTiming(-5, { duration: 50 }),
          withTiming(5, { duration: 50 }),
        ),
        3,
        false,
      ),

      withTiming(0, { duration: 50 }),
    );
  }

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { rotate: `${rotation.value}deg` },
    ],
  }));

  return { shake, animatedStyle };
}
