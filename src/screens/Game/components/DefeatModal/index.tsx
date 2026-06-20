import { Modal, Pressable, StyleSheet, View } from "react-native";
import { BlurView } from "expo-blur";
import Animated from "react-native-reanimated";
import { useModalAnimation } from "@/animations/hooks/useModalAnimation";
import { colors } from "@/constants/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Typography } from "@/shared/components/Typography";

interface DefeatModalProps {
  visible: boolean;
  onTryAgain: () => void;
  onGoHome: () => void;
}

export function DefeatModal({
  visible,
  onTryAgain,
  onGoHome,
}: DefeatModalProps) {
  const { animatedStyle, close } = useModalAnimation({ visible });

  function handleTryAgain() {
    close(onTryAgain);
  }

  return (
    <Modal transparent visible={visible}>
      <BlurView
        intensity={5}
        tint="dark"
        style={styles.overlay}
        experimentalBlurMethod="dimezisBlurView"
      >
        <Animated.View style={[animatedStyle, styles.modalContainer]}>
          <Pressable style={styles.closeButton} onPress={onGoHome}>
            <MaterialCommunityIcons
              name="close"
              color={colors.grayscale.gray100}
              size={16}
            />
          </Pressable>

          <MaterialCommunityIcons
            name="clock-outline"
            color={colors.semantic.error}
            size={29}
          />
          <Typography style={styles.title}>Ops, seu tempo acabou!</Typography>
          <Typography style={styles.message}>
            O tempo para finalizar o desafio terminou. Que tal tentar denovo?
          </Typography>
          <Pressable style={styles.button} onPress={handleTryAgain}>
            <Typography style={styles.buttonText}>Jogar novamente</Typography>
          </Pressable>
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
  button: {
    paddingVertical: 16,
    alignItems: "center",
    width: "100%",
    borderRadius: 100,
    borderWidth: 2,
    borderColor: colors.grayscale.gray400,
    marginTop: 16,
  },
  buttonText: {
    fontSize: 16,
    color: colors.grayscale.white,
    fontFamily: "Baloo2_800ExtraBold",
  },
  closeButton: { position: "absolute", right: 22, top: 22 },
});
