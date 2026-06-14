import { usePressAnimation } from "@/animations/hooks/usePressAnimation";
import { colors } from "@/constants/colors";
import { Typography } from "@/shared/components/Typography";
import { ChallengeTheme } from "@/shared/utils/challenge";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Pressable, StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";

interface ChallengeCardProps extends ChallengeTheme {
  handleSelectChallenge: (challengeId: string) => void;
}

export function ChallengeCard({
  title,
  gradient,
  arrowColor,
  handleSelectChallenge,
  id,
}: ChallengeCardProps) {
  const pressAnimation = usePressAnimation();

  return (
    <Animated.View style={pressAnimation.animatedStyle}>
      <LinearGradient
        colors={gradient as readonly [string, string, ...string[]]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.challengeCard}
      >
        <Pressable
          style={styles.challengeContent}
          onPressIn={pressAnimation.onPressIn}
          onPressOut={pressAnimation.onPressOut}
          onPress={() => handleSelectChallenge(id)}
        >
          <Typography style={styles.challengeTitle}>{title}</Typography>
          <View style={[styles.arrowButton, { backgroundColor: arrowColor }]}>
            <MaterialCommunityIcons name="arrow-right" size={24} />
          </View>
        </Pressable>
      </LinearGradient>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  challengeCard: { borderRadius: 16, marginBottom: 16, overflow: "hidden" },
  challengeContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
  },
  challengeTitle: {
    fontSize: 18,
    color: colors.grayscale.gray100,
    fontFamily: "Baloo2_800ExtraBold",
    maxWidth: "60%",
  },
  arrowButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 16,
  },
});
