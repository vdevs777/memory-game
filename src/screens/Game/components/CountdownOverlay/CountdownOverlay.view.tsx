import { Typography } from "@/shared/components/Typography";
import { StyleSheet, View } from "react-native";
import { useCountdownOverlayVM } from "./useCountdownOverlay.vm";

export function CountdownOverlayView({
  count,
  visibleCountdown,
}: ReturnType<typeof useCountdownOverlayVM>) {
  if (!visibleCountdown) return;

  return (
    <View style={styles.overlay}>
      <View style={styles.contentWrapper}>
        <Typography style={styles.countText}>{count}</Typography>
      </View>
    </View>
  );
}

export const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    inset: 0,
    backgroundColor: "rgba(0,0,0,0.7)",
    alignItems: "center",
    justifyContent: "center",
  },
  contentWrapper: {
    width: 160,
    height: 160,
    justifyContent: "center",
    alignItems: "center",
  },
  countText: { fontSize: 72, fontFamily: "Baloo2_800ExtraBold" },
});
