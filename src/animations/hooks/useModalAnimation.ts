import { useCallback, useEffect, useRef } from "react";
import {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { SPRING_CONFIG } from "../config/animation.config";
import { runOnJS, scheduleOnRN } from "react-native-worklets";

interface UseModalAnimationProps {
  visible: boolean;
}

export function useModalAnimation({ visible }: UseModalAnimationProps) {
  const translateY = useSharedValue(-1000);
  const opacity = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));

  const pendingCallbackRef = useRef<() => void | null>(null);
  const executeCallback = useCallback(() => {
    if (pendingCallbackRef.current) {
      pendingCallbackRef.current();
      pendingCallbackRef.current = null;
    }
  }, []);

  const close = useCallback((callback: () => void) => {
    pendingCallbackRef.current = callback;

    const exitDuration = 300;

    translateY.value = withSpring(1000, { duration: exitDuration });
    opacity.value = withTiming(0, { duration: exitDuration }, (finished) => {
      if (finished) runOnJS(executeCallback)();
    });
  }, []);

  useEffect(() => {
    if (visible) {
      translateY.value = withSpring(0, SPRING_CONFIG.modal);
      opacity.value = withSpring(1, SPRING_CONFIG.modal);
    } else {
      translateY.value = -1000;
      opacity.value = 0;
    }
  }, [visible, translateY, opacity]);

  return { animatedStyle, close };
}
