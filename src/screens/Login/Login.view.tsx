import { LinearGradient } from "expo-linear-gradient";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors, gradients } from "@/constants/colors";
import { useLoginVM } from "./useLogin.vm";
import { usePressAnimation } from "@/animations/hooks/usePressAnimation";
import Animated from "react-native-reanimated";
import { useInputFocusAnimation } from "@/animations/hooks/useInputFocusAnimation";
import { Typography } from "@/shared/components/Typography";

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

export function LoginView({
  username,
  setUsername,
  handleSubmit,
}: ReturnType<typeof useLoginVM>) {
  const handleSubmitPressAnimation = usePressAnimation();
  const textInputAnimation = useInputFocusAnimation();

  return (
    <TouchableWithoutFeedback style={{ flex: 1 }} onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <View style={styles.content}>
            <View style={styles.logoContainer}>
              <Image
                style={styles.logo}
                source={require("@/assets/logo.png")}
                resizeMode="contain"
              />
            </View>

            <View style={styles.titleContainer}>
              <Typography style={styles.title}>memory game</Typography>
              <Typography style={styles.subtitle}>
                Teste sua memória enquanto aprende!
              </Typography>
            </View>

            <View style={styles.formContainer}>
              <AnimatedTextInput
                value={username}
                onChangeText={setUsername}
                placeholder="Digite seu nome"
                style={[styles.input, textInputAnimation.animatedStyle]}
                placeholderTextColor={colors.grayscale.gray300}
                textAlign="center"
                autoCapitalize="words"
                returnKeyType="done"
                onFocus={textInputAnimation.onFocus}
                onBlur={textInputAnimation.onBlur}
              />

              <View style={styles.buttonGlow}>
                <Animated.View style={handleSubmitPressAnimation.animatedStyle}>
                  <LinearGradient
                    colors={gradients.colorful}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 2 }}
                    style={styles.buttonGradient}
                  >
                    <TouchableOpacity
                      style={styles.button}
                      onPress={handleSubmit}
                      onPressIn={handleSubmitPressAnimation.onPressIn}
                      onPressOut={handleSubmitPressAnimation.onPressOut}
                    >
                      <Text style={styles.buttonText}>Entrar</Text>
                    </TouchableOpacity>
                  </LinearGradient>
                </Animated.View>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.grayscale.gray700,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  logoContainer: {
    marginBottom: 32,
  },
  logo: {
    width: 71,
    height: 71,
  },
  titleContainer: {
    alignItems: "center",
    marginBottom: 48,
  },
  title: {
    fontSize: 28,
    color: colors.grayscale.gray100,
    marginBottom: 8,
    fontFamily: "Baloo2_800ExtraBold",
  },
  subtitle: {
    fontSize: 16,
    color: colors.grayscale.gray200,
  },
  formContainer: {
    width: "100%",
    gap: 16,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.grayscale.white,
  },
  buttonGradient: {
    borderRadius: 50,
  },
  button: {
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonGlow: {
    borderRadius: 50,
    boxShadow: `0px 0px 20px ${colors.accent.purple}`,
  },
  input: {
    width: "100%",
    backgroundColor: colors.grayscale.gray500,
    borderRadius: 50,
    paddingHorizontal: 24,
    paddingVertical: 16,
    fontSize: 16,
    color: colors.grayscale.white,
    borderWidth: 1,
    borderColor: colors.grayscale.gray400,
  },
});
