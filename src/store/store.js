import { signal } from "../lib/signal.js";

export const currentStepStore = signal(1);

export const stepsStore = signal({
  material: false,
  dilationType: false,
  parameters: false,
  results: false,
});

export const materialStore = signal(null);

export const dilationTypeStore = signal(null);

export const temperatureStore = signal({
  initial: null,
  final: null,
  variation: null,
});

export const dimensionsStore = signal({
  width: null,
  height: null,
  depth: null,
});

export const resultsStore = signal({
  variation: null,
  finalDimension: null,
});
