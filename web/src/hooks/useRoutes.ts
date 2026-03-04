import { useQuery } from "@tanstack/react-query";
import { mockRoutes } from "@/data/mock";
import type { BusRoute } from "@/types";

async function fetchRoutes(): Promise<BusRoute[]> {
  
  await new Promise((r) => setTimeout(r, 400));
  return mockRoutes;
}

async function fetchRouteById(id: string): Promise<BusRoute | undefined> {
  await new Promise((r) => setTimeout(r, 300));
  return mockRoutes.find((r) => r.id === id);
}

export function useRoutes(search?: string) {
  return useQuery({
    queryKey: ["routes", search],
    queryFn: async () => {
      const routes = await fetchRoutes();
      if (!search) return routes;
      const q = search.toLowerCase();
      return routes.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.number.toLowerCase().includes(q) ||
          r.origin.toLowerCase().includes(q) ||
          r.destination.toLowerCase().includes(q)
      );
    },
  });
}

export function useRoute(id: string) {
  return useQuery({
    queryKey: ["route", id],
    queryFn: () => fetchRouteById(id),
    enabled: !!id,
  });
}
