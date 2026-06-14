import { Difficulty } from "@/shared/interfaces/difficulty";
import { Pressable, StyleSheet, View } from "react-native";
import { DifficultyIconView } from "../DifficultyIcon/DifficultyIcon.view";
import { getDifficultyColor } from "@/shared/utils/difficulty";
import { Typography } from "@/shared/components/Typography";
import { colors } from "@/constants/colors";

interface DifficultyTabProps {
  index: number;
  difficulty: Difficulty;
  setSelectedDifficulty: (difficulty: Difficulty) => void;
  selectedDifficulty: Difficulty;
}

export function DifficultyTab({
  index,
  difficulty,
  setSelectedDifficulty,
  selectedDifficulty,
}: DifficultyTabProps) {
  return (
    <Pressable
      key={`difficulty-key-${index}`}
      style={styles.difficultyTab}
      onPress={() => setSelectedDifficulty(difficulty)}
    >
      <View style={styles.difficultyBadge}>
        <DifficultyIconView
          color={getDifficultyColor(difficulty)}
          difficulty={difficulty}
          inactiveColor={colors.grayscale.gray200}
          isSelected={selectedDifficulty === difficulty}
        />
        <Typography
          style={{
            ...styles.difficultyLabel,
            fontFamily:
              selectedDifficulty === difficulty
                ? "Baloo2_800ExtraBold"
                : "Baloo2_400Regular",
            color:
              selectedDifficulty === difficulty
                ? colors.grayscale.white
                : colors.grayscale.gray200,
          }}
        >
          {difficulty}
        </Typography>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  difficultyLabel: {
    fontSize: 16,
    color: colors.grayscale.gray200,
  },
  difficultyTab: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 4,
    borderRadius: 100,
    gap: 12,
    zIndex: 1,
  },
  difficultyBadge: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: 8,
    borderRadius: "50%",
  },
});
