import { useModalAnimation } from "@/animations/hooks/useModalAnimation";
import { usePressAnimation } from "@/animations/hooks/usePressAnimation";
import { colors, gradients } from "@/constants/colors";
import { Typography } from "@/shared/components/Typography";
import { useGameStore } from "@/shared/stores/game.store";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { Modal, Pressable, StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";

interface VictoryModalProps {
  visible: boolean;
  onPlayAgain: () => void;
  onGoHistory: () => void;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function VictoryModal({
  visible,
  onPlayAgain,
  onGoHistory,
}: VictoryModalProps) {
  const { timeElapsed } = useGameStore();

  const minutes = Math.floor(timeElapsed / 60);
  const seconds = timeElapsed % 60;

  const time = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  const { animatedStyle: modalAnimatedStyle, close } = useModalAnimation({
    visible,
  });
  const {
    animatedStyle: pressAnimatedStyle,
    onPressIn,
    onPressOut,
  } = usePressAnimation();

  const {
    animatedStyle: historyPressAnimatedStyle,
    onPressIn: historyOnPressIn,
    onPressOut: historyOnPressOut,
  } = usePressAnimation();

  function handlePlayAgain() {
    close(onPlayAgain);
  }

  function handleGoHistory() {
    close(onGoHistory);
  }

  return (
    <Modal transparent visible={visible}>
      <BlurView
        intensity={5}
        tint="dark"
        style={styles.overlay}
        experimentalBlurMethod="dimezisBlurView"
      >
        <Animated.View style={[modalAnimatedStyle, styles.modalContainer]}>
          <MaterialCommunityIcons
            name="trophy-outline"
            color={colors.accent.lightPurple}
            size={32}
          />
          <Typography style={styles.title}>
            Você concluiu o desafio em {time}
          </Typography>
          <View style={styles.buttonGlow}>
            <Animated.View style={[pressAnimatedStyle]}>
              <LinearGradient
                colors={gradients.colorful}
                style={styles.buttonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Pressable
                  onPress={handlePlayAgain}
                  onPressIn={onPressIn}
                  onPressOut={onPressOut}
                >
                  <Typography style={styles.buttonText}>
                    Jogar novamente
                  </Typography>
                </Pressable>
              </LinearGradient>
            </Animated.View>
          </View>

          <AnimatedPressable
            onPressIn={historyOnPressIn}
            onPressOut={historyOnPressOut}
            onPress={handleGoHistory}
            style={[historyPressAnimatedStyle, styles.secondaryButton]}
          >
            <Typography style={styles.secondaryButtonText}>
              Ver histórico
            </Typography>
          </AnimatedPressable>
        </Animated.View>
      </BlurView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    backgroundColor: "rgba(0,0,0,0.50)",
  },
  modalContainer: {
    width: "100%",
    maxWidth: 400,
    alignItems: "center",
    padding: 32,
    borderRadius: 24,
    backgroundColor: colors.grayscale.gray450,
    borderWidth: 1,
    borderColor: colors.grayscale.gray400,
  },
  title: {
    fontSize: 20,
    color: colors.grayscale.gray100,
    marginTop: 20,
    marginBottom: 12,
    textAlign: "center",
    fontFamily: "Baloo2_800ExtraBold",
  },
  message: {
    fontSize: 16,
    color: colors.grayscale.gray200,
    textAlign: "center",
    lineHeight: 22,
    paddingHorizontal: 8,
  },
  buttonGradient: {
    borderRadius: 100,
    width: "100%",
    marginBottom: 12,
    padding: 12,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    color: colors.grayscale.white,
    fontFamily: "Baloo2_800ExtraBold",
  },
  secondaryButton: { padding: 12, width: "100%", alignItems: "center" },
  secondaryButtonText: {
    fontSize: 16,
    fontFamily: "Baloo2_800ExtraBold",
    color: colors.accent.lightPurple,
  },
  buttonGlow: {
    width: "100%",
  },
});
