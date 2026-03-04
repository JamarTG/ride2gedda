import { CategoryMeta, ReportCategory } from "@/types";
import { IconArrowsShuffle, IconClockHour4, IconNote, IconSettings, IconShieldCheck, IconUsers } from "@tabler/icons-react";

export const categoryMeta: Record<ReportCategory, CategoryMeta> = {
  [ReportCategory.Delay]: { label: "Delay", Icon: IconClockHour4 },
  [ReportCategory.Safety]: { label: "Safety", Icon: IconShieldCheck },
  [ReportCategory.Overcrowding]: { label: "Overcrowding", Icon: IconUsers },
  [ReportCategory.Breakdown]: { label: "Breakdown", Icon: IconSettings },
  [ReportCategory.RouteChange]: { label: "Route Change", Icon: IconArrowsShuffle },
  [ReportCategory.Other]: { label: "Other", Icon: IconNote },
};
