import { colors } from "@/constants/colors";
import { Typography } from "@/shared/components/Typography";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGameVM } from "./useGame.vm";
import { CountdownOverlay } from "./components/CountdownOverlay";
import { CardGrid } from "./components/CardGrid";
import { GameHeader } from "./components/GameHeader";

export function GameView({
  selectedTheme,
  visibleCountdown,
  handleCountdownComplete,
  handleGoBack,
}: ReturnType<typeof useGameVM>) {
  return (
    <SafeAreaView style={styles.container}>
      <GameHeader handleGoBack={handleGoBack} />
      <View style={styles.gameInfo}>
        <Typography style={styles.title}>{selectedTheme?.title}</Typography>
        <Typography style={styles.subtitle}>
          Encontre todos os pares dentro do tempo!
        </Typography>

        <CardGrid />
      </View>
      <CountdownOverlay
        visibleCountdown={visibleCountdown}
        handleCountdownComplete={handleCountdownComplete}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.grayscale.gray700 },
  gameInfo: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 24 },
  title: {
    fontSize: 20,
    color: colors.grayscale.gray100,
    fontFamily: "Baloo2_800ExtraBold",
  },
  subtitle: { fontSize: 16, color: colors.grayscale.gray200, marginBottom: 24 },
});
