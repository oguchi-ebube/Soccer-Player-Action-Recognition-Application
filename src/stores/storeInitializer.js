import MetricsStore from "./metricsStore";

export default function initializeStores() {
  return {
    metricsStore: new MetricsStore(),
  };
}
