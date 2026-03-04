import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { mockReports } from "@/data/mock";
import type { CommunityReport } from "@/types";
import { ReportStatus } from "@/types";

let reports = [...mockReports];

export function useReports() {
  return useQuery({
    queryKey: ["reports"],
    queryFn: async (): Promise<CommunityReport[]> => {
      await new Promise((r) => setTimeout(r, 300));
      return [...reports].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    },
  });
}

export function useSubmitReport() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: Omit<CommunityReport, "id" | "upvotes" | "createdAt" | "status">) => {
      await new Promise((r) => setTimeout(r, 500));
      const newReport: CommunityReport = {
        ...data,
        id: "rep_" + Date.now(),
        upvotes: 0,
        status: ReportStatus.Open,
        createdAt: new Date().toISOString(),
      };
      reports = [newReport, ...reports];
      return newReport;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["reports"] }),
  });
}
