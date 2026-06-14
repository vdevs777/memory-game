import { HomeView } from "@/screens/Home/Home.view";
import { useHomeVM } from "@/screens/Home/useHome.vm";

export default function Home() {
  const vm = useHomeVM();

  return <HomeView {...vm} />;
}
