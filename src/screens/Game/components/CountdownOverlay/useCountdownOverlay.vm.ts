import { useEffect, useState } from "react";
import { CountdownOverlayProps } from ".";

export function useCountdownOverlayVM({
  visibleCountdown,
  handleCountdownComplete,
}: CountdownOverlayProps) {
  const [count, setCount] = useState(3);
  useEffect(() => {
    if (visibleCountdown) {
      setCount(3);
      let currentCount = 3;

      const countdown = setInterval(() => {
        if (currentCount > 1) {
          currentCount--;
          setCount(currentCount);
        } else {
          clearInterval(countdown);
          handleCountdownComplete();
        }
      }, 1000);

      return () => clearInterval(countdown);
    }
  }, [setCount, visibleCountdown, handleCountdownComplete]);

  return { count, visibleCountdown };
}
