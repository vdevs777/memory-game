import { colors } from "@/constants/colors";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { HomeHeader } from "./components/HomeHeader";
import { DifficultySelectorView } from "./components/DifficultySelector/DifficultySelector.view";
import { ChallengesList } from "./components/ChallengesList";
import { useHomeVM } from "./useHome.vm";

export function HomeView(vm: ReturnType<typeof useHomeVM>) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <HomeHeader />
        <DifficultySelectorView {...vm} />
        <ChallengesList handleSelectChallenge={vm.handleSelectChallenge} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.grayscale.gray700,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
});
