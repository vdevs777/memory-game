import { Pressable, StyleSheet, View } from "react-native";
import { useGameHeaderVM } from "./useGameHeader.vm";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "@/constants/colors";
import { usePressAnimation } from "@/animations/hooks/usePressAnimation";
import Animated from "react-native-reanimated";
import { Typography } from "@/shared/components/Typography";
import { GameHeaderProps } from ".";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function GameHeaderView({
  time,
  isCriticalTime,
  animatedTimerStyle,
  handleGoBack,
}: ReturnType<typeof useGameHeaderVM> & GameHeaderProps) {
  const pressAnimation = usePressAnimation({
    scaleActive: 0.8,
    width: 48,
  });

  return (
    <View style={styles.container}>
      <AnimatedPressable
        style={[styles.backButton, pressAnimation.animatedStyle]}
        onPressIn={pressAnimation.onPressIn}
        onPressOut={pressAnimation.onPressOut}
        onPress={handleGoBack}
      >
        <MaterialCommunityIcons
          name="chevron-left"
          size={32}
          color={colors.grayscale.gray100}
        />
      </AnimatedPressable>
      <Animated.View style={[styles.timerContainer, animatedTimerStyle]}>
        <MaterialCommunityIcons
          size={20}
          color={isCriticalTime ? colors.feedback.danger : colors.feedback.info}
          name="clock-outline"
        />
        <Typography
          style={[styles.timerText, isCriticalTime && styles.timerTextCritical]}
        >
          {time}
        </Typography>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 16,
  },
  backButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.grayscale.gray500,
    borderWidth: 1,
    borderColor: colors.grayscale.gray500,
  },
  timerContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.grayscale.gray500,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
    gap: 8,
    borderWidth: 1,
    borderColor: colors.grayscale.gray500,
  },
  timerText: {
    fontSize: 16,
    fontFamily: "Baloo2_700Bold",
    color: colors.feedback.info,
  },

  timerTextCritical: {
    color: colors.feedback.danger,
  },
});
