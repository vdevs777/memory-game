import { useCardSelectionAnimation } from "@/animations/hooks/useCardSelectionAnimation";
import { useGameCardVM } from "./useGameCard.vm";
import { colors, gradients } from "@/constants/colors";
import { Typography } from "@/shared/components/Typography";
import { LinearGradient } from "expo-linear-gradient";
import { Image, Pressable, StyleSheet } from "react-native";
import Animated from "react-native-reanimated";

export function GameCardView({
  card,
  backAnimatedStyle,
  frontAnimatedStyle,
  selectCard,
  entry,
  shakeCardAnimatedStyle,
  cardSuccessAnimatedStyle,
  cardTimeoutAnimatedStyle,
}: ReturnType<typeof useGameCardVM>) {
  const {
    animatedStyle: selectionAnimatedStyle,
    onPressIn,
    onPressOut,
  } = useCardSelectionAnimation();

  return (
    <Animated.View
      style={[
        styles.containerWidth,
        entry.animatedStyle,
        selectionAnimatedStyle,
        shakeCardAnimatedStyle,
        cardSuccessAnimatedStyle,
        cardTimeoutAnimatedStyle,
      ]}
    >
      <Pressable
        style={styles.container}
        onPress={() => selectCard(card.id)}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
      >
        <Animated.View style={[styles.innerContainer]}>
          <Animated.View style={[styles.cardFace, frontAnimatedStyle]}>
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.cardGradient}
              colors={gradients.card}
            >
              <Image
                style={styles.logoImage}
                source={require("@/assets/logo-transparent.png")}
              />
            </LinearGradient>
          </Animated.View>

          <Animated.View style={[styles.cardFace, backAnimatedStyle]}>
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.cardGradient}
              colors={gradients.card}
            >
              <Image source={card.image} style={styles.cardImage} />
              <Typography style={styles.cardText}>{card.name}</Typography>
            </LinearGradient>
          </Animated.View>
        </Animated.View>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  containerWidth: {
    width: "32%",
    height: 130,
    marginBottom: 8,
  },
  container: {
    flex: 1,
  },
  innerContainer: { flex: 1 },
  cardFace: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backfaceVisibility: "hidden",
    borderColor: colors.grayscale.gray400,
    borderWidth: 1,
    borderRadius: 16,
  },
  cardGradient: {
    flex: 1,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  logoImage: { width: "50%", height: "50%" },
  cardImage: { width: 32, height: 32, borderRadius: 8 },
  cardText: { color: colors.grayscale.gray100, fontSize: 16 },
});
