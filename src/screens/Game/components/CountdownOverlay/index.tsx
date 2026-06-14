import { CountdownOverlayView } from "./CountdownOverlay.view";
import { useCountdownOverlayVM } from "./useCountdownOverlay.vm";

export interface CountdownOverlayProps {
  visibleCountdown: boolean;
  handleCountdownComplete: () => void;
}

export function CountdownOverlay(params: CountdownOverlayProps) {
  const vm = useCountdownOverlayVM(params);

  return <CountdownOverlayView {...vm} />;
}
