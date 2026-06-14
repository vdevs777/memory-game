import { colors } from "@/constants/colors";
import { Typography } from "@/shared/components/Typography";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import { useDifficultySelectorVM } from "./useDifficultySelector.vm";
import { DifficultyTab } from "./components/DifficultyTab";
import Animated from "react-native-reanimated";
import { Difficulty } from "@/shared/interfaces/difficulty";

interface DifficultySelectorViewProps {
  selectedDifficulty: Difficulty;
  setSelectedDifficulty: (difficulty: Difficulty) => void;
}

export function DifficultySelectorView({
  selectedDifficulty,
  setSelectedDifficulty,
}: DifficultySelectorViewProps) {
  const {
    difficulties,
    animatedIndicatorStyle,
    difficultyConfig,
    timeAnimatedStyle,
  } = useDifficultySelectorVM(selectedDifficulty);

  return (
    <View style={styles.difficultySection}>
      <View style={styles.difficultyHeader}>
        <Typography style={styles.difficultyLabel}>Dificuldade</Typography>
        <Animated.View style={[styles.timeIndicator, timeAnimatedStyle]}>
          <MaterialCommunityIcons
            name="clock-outline"
            color={colors.feedback.info}
            size={16}
          />
          <Typography>{difficultyConfig.estimatedTime}</Typography>
        </Animated.View>
      </View>

      <View style={styles.difficultyTabs}>
        <Animated.View style={[styles.indicator, animatedIndicatorStyle]} />
        {difficulties.map((difficulty, index) => (
          <DifficultyTab
            difficulty={difficulty}
            index={index}
            setSelectedDifficulty={setSelectedDifficulty}
            selectedDifficulty={selectedDifficulty}
            key={`difficulty-tab-${difficulty}`}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  difficultySection: {
    marginBottom: 24,
  },
  difficultyHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  difficultyLabel: {
    fontSize: 16,
    color: colors.grayscale.gray200,
  },
  timeIndicator: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.grayscale.gray500,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 6,
  },
  difficultyTabs: {
    flexDirection: "row",
    borderRadius: 100,
    padding: 4,
    position: "relative",
    borderColor: colors.grayscale.gray400,
    borderWidth: 1,
  },
  indicator: {
    position: "absolute",
    width: "33.33%",
    top: 4,
    zIndex: 0,
    borderRadius: 100,
    left: 0,
    bottom: 4,
    backgroundColor: colors.grayscale.gray500,
    borderColor: colors.grayscale.gray400,
    borderWidth: 1,
    marginLeft: 4,
  },
});
