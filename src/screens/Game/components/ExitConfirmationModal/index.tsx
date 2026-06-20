import { useModalAnimation } from "@/animations/hooks/useModalAnimation";
import { colors } from "@/constants/colors";
import { Typography } from "@/shared/components/Typography";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Modal, Pressable, StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";

interface ExitConfirmationModalProps {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ExitConfirmationModal({
  visible,
  onConfirm,
  onCancel,
}: ExitConfirmationModalProps) {
  const { animatedStyle, close } = useModalAnimation({ visible });

  function handleConfirm() {
    close(onConfirm);
  }

  function handleCancel() {
    close(onCancel);
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
          <MaterialCommunityIcons
            name="alert-circle-check-outline"
            size={64}
            color={colors.semantic.warning}
          />
          <Typography style={styles.title}>Sair do jogo?</Typography>
          <Typography style={styles.message}>
            Seu progresso atual será perdido.
          </Typography>
          <Pressable onPress={handleConfirm} style={styles.button}>
            <Typography style={styles.buttonText}>Sair do jogo</Typography>
          </Pressable>
          <Pressable onPress={handleCancel} style={styles.button}>
            <Typography style={styles.buttonText}>Continuar jogando</Typography>
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
});
