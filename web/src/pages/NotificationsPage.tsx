import { useEffect, useState } from "react";
import { IconArrowsShuffle, IconBell, IconCheck, IconClockHour4, IconNote, IconSettings, IconShieldCheck, IconSpeakerphone, IconUsers, IconX } from "@tabler/icons-react";
import { Card, CardContent } from "@/components/ui/card";
import { useNotifications } from "@/hooks/useNotifications";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/utils";
import { ReportCategory, type Notification } from "@/types";
import { NotificationCategory } from "@/types";


export default function NotificationsPage() {
  const { data, isLoading } = useNotifications();
  const [notifications, setNotifications] = useState<Notification[] | undefined>(undefined);

  useEffect(() => {
    if (data) setNotifications(data);
  }, [data]);

  const handleDismiss = (id: string) => {
    setNotifications((prev) => prev?.filter((n) => n.id !== id));
  };

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-display text-2xl md:text-3xl font-bold flex items-center gap-2">
          <IconBell className="h-6 w-6 text-primary" /> Notifications
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">Stay informed about route changes and alerts</p>
      </div>

      <div className="space-y-3">
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-20 w-full rounded-lg" />)
          : notifications?.map((n) => (
              <Card
                key={n.id}
                className={cn("border")}
              >
                <CardContent className="flex items-start gap-3 p-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold">{n.title}</p>
                      {n.read && <IconCheck className="h-3.5 w-3.5 text-success" />}
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">{n.message}</p>
                    <p className="mt-2 text-[10px] text-muted-foreground">
                      {new Date(n.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDismiss(n.id)}
                    className="ml-2 text-muted-foreground transition-colors hover:text-destructive"
                    aria-label="Dismiss notification"
                  >
                    <IconX className="h-4 w-4" />
                  </button>
                </CardContent>
              </Card>
            ))}
      </div>
    </div>
  );
}
