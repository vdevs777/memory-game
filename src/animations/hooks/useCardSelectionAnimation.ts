import {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { SPRING_CONFIG } from "../config/animation.config";

export function useCardSelectionAnimation() {
  const scale = useSharedValue(1);

  function onPressIn() {
    scale.value = withSpring(1.05, SPRING_CONFIG.selection);
  }

  function onPressOut() {
    scale.value = withSpring(1, SPRING_CONFIG.selection);
  }

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return { animatedStyle, onPressIn, onPressOut };
}
