import { Typography } from "@/shared/components/Typography";
import { useAuthStore } from "@/shared/stores/auth.store";
import { Pressable, StyleSheet, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "@/constants/colors";
import { usePressAnimation } from "@/animations/hooks/usePressAnimation";
import Animated from "react-native-reanimated";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function HomeHeader() {
  const { user } = useAuthStore();

  const pressAnimatedStyle = usePressAnimation({ scaleActive: 0.8 });

  return (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        <View style={styles.headerLeft}>
          <View>
            <Typography style={styles.welcome}>
              Bem-vindo, {user?.name}
            </Typography>
            <Typography style={styles.subTitle}>
              Começe a jogar selecionando os desafios abaixo.
            </Typography>
          </View>
        </View>
        <View style={{ width: 40 }}>
          <AnimatedPressable
            style={[styles.trophyContainer, pressAnimatedStyle.animatedStyle]}
            onPressIn={pressAnimatedStyle.onPressIn}
            onPressOut={pressAnimatedStyle.onPressOut}
          >
            <MaterialCommunityIcons
              name="trophy-outline"
              size={18}
              color={colors.accent.lightPurple}
            />
          </AnimatedPressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 60,
    paddingBottom: 20,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  headerLeft: { flex: 1, maxWidth: "60%" },
  welcome: {
    fontSize: 20,
    marginBottom: 8,
    fontFamily: "Baloo2_700Bold",
  },
  subTitle: {
    fontSize: 16,
    color: colors.grayscale.gray200,
  },
  trophyContainer: {
    width: 40,
    height: 40,
    borderColor: colors.grayscale.gray400,
    borderRadius: 40,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.grayscale.gray450,
  },
});
