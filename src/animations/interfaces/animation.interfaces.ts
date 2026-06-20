export interface AnimationTimings {
  entry: {
    throw: { duration: number; delayBetweenCards: number };
    deck: { duration: number; delayBetweenCards: number };
  };
  fall: {
    duration: number;
    rotation: number;
    opacityDuration: number;
    opacityDelay: number;
    maxRandomDelay: number;
  };
}
