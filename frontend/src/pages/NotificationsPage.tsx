import { Bell, Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useNotifications } from "@/hooks/useNotifications";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

const typeStyles: Record<string, string> = {
  info: "border-l-primary",
  warning: "border-l-warning",
  alert: "border-l-destructive",
  success: "border-l-success",
};

export default function NotificationsPage() {
  const { data: notifications, isLoading } = useNotifications();

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-display text-2xl font-bold flex items-center gap-2">
          <Bell className="h-6 w-6 text-primary" /> Notifications
        </h1>
        <p className="text-sm text-muted-foreground">Stay informed about route changes and alerts</p>
      </div>

      <div className="space-y-3">
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-20 w-full rounded-lg" />)
          : notifications?.map((n) => (
              <Card
                key={n.id}
                className={cn("border-0 border-l-4 shadow-md", typeStyles[n.type])}
              >
                <CardContent className="flex items-start gap-3 p-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold">{n.title}</p>
                      {n.read && <Check className="h-3.5 w-3.5 text-success" />}
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">{n.message}</p>
                    <p className="mt-2 text-[10px] text-muted-foreground">
                      {new Date(n.createdAt).toLocaleString()}
                    </p>
                  </div>
                  {!n.read && <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-primary animate-pulse-dot" />}
                </CardContent>
              </Card>
            ))}
      </div>
    </div>
  );
}
