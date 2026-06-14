import { useCallback } from "react";
import {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  WithSpringConfig,
} from "react-native-reanimated";
import { SPRING_CONFIG } from "../config/animation.config";
import { colors } from "@/constants/colors";

interface UseInputFocusAnimation {
  springConfig?: WithSpringConfig;
}

export function useInputFocusAnimation({
  springConfig = SPRING_CONFIG.press,
}: UseInputFocusAnimation = {}) {
  // 0 = no focus; 1 = focused
  const focus = useSharedValue(0);

  const onFocus = useCallback(() => {
    focus.value = withSpring(1, springConfig);
  }, [focus, springConfig]);

  const onBlur = useCallback(() => {
    focus.value = withSpring(0, springConfig);
  }, [focus, springConfig]);

  const animatedStyle = useAnimatedStyle(() => {
    const borderColor = interpolateColor(
      focus.value,
      [0, 1],
      [colors.grayscale.gray400, colors.accent.cyan],
    );

    return { borderColor, transform: [{ scale: 1 + focus.value * 0.02 }] };
  });

  return { onFocus, onBlur, animatedStyle };
}
