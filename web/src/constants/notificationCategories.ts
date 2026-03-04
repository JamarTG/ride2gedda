import { NotificationCategory, ReportCategory } from "@/types";
import { IconArrowsShuffle, IconBell, IconCheck, IconClockHour4, IconNote, IconSettings, IconShieldCheck, IconSpeakerphone, IconUsers } from "@tabler/icons-react";

export const notificationCategoryMeta = {
  [ReportCategory.Delay]: { label: "Delay", Icon: IconClockHour4, defaultMessage: "A delay occurred" },
  [ReportCategory.Safety]: { label: "Safety", Icon: IconShieldCheck, defaultMessage: "Safety alert"},
  [ReportCategory.Overcrowding]: { label: "Overcrowding", Icon: IconUsers, defaultMessage: "Overcrowding reported"},
  [ReportCategory.Breakdown]: { label: "Breakdown", Icon: IconSettings, defaultMessage: "Vehicle breakdown" },
  [ReportCategory.RouteChange]: { label: "Route Change", Icon: IconArrowsShuffle, defaultMessage: "Route has changed"},
  [NotificationCategory.Info]: { label: "Informational", Icon: IconNote, defaultMessage: "General update" },
  [NotificationCategory.Announcement]: { label: "Announcement", Icon: IconSpeakerphone, defaultMessage: "General announcement"},
  [NotificationCategory.Reminder]: { label: "Reminder", Icon: IconBell, defaultMessage: "Don't forget!" },
  [NotificationCategory.Success]: { label: "Success", Icon: IconCheck, defaultMessage: "Issue resolved" },
} 
