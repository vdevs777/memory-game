import { Typography } from "@/shared/components/Typography";
import { challengeTheme } from "@/shared/utils/challenge";
import { StyleSheet, View } from "react-native";
import { ChallengeCard } from "./components/ChallengeCard";
import { colors } from "@/constants/colors";
import { Difficulty } from "@/shared/interfaces/difficulty";

interface ChallengesListProps {
  handleSelectChallenge: (challengeId: string) => void;
}

export function ChallengesList({ handleSelectChallenge }: ChallengesListProps) {
  return (
    <View>
      <Typography style={styles.sectionTitle}>Desafios disponíveis</Typography>
      {challengeTheme.map((challenge) => (
        <ChallengeCard
          {...challenge}
          key={`challenge-id-${challenge.id}`}
          handleSelectChallenge={handleSelectChallenge}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 16,
    color: colors.grayscale.gray200,
    marginBottom: 16,
  },
});
