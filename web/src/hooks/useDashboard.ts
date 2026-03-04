import { useQuery } from "@tanstack/react-query";
import { mockMetrics, mockFavorites, mockDemandPredictions } from "@/data/mock";

export function useDashboardMetrics() {
  return useQuery({
    queryKey: ["dashboard-metrics"],
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 300));
      return mockMetrics;
    },
  });
}

export function useFavorites() {
  return useQuery({
    queryKey: ["favorites"],
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 200));
      return mockFavorites;
    },
  });
}

export function useDemandPredictions() {
  return useQuery({
    queryKey: ["demand-predictions"],
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 250));
      return mockDemandPredictions;
    },
  });
}
