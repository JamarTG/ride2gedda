import { useQuery } from "@tanstack/react-query";
import { mockNotifications } from "@/data/mock";
import type { Notification } from "@/types";

export function useNotifications() {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: async (): Promise<Notification[]> => {
      await new Promise((r) => setTimeout(r, 200));
      return mockNotifications;
    },
  });
}
