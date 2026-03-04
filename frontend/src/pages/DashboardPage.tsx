import { motion } from "framer-motion";
import {
  IconMapPin,
  IconUsers,
  IconClock,
  IconAlertTriangle,
  IconStar,
  IconArrowRight,
} from "@tabler/icons-react";

import { Card, CardContent } from "@/components/ui/card";
import { useDashboardMetrics, useFavorites } from "@/hooks/useDashboard";
import { Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/utils";
import { useNotifications } from "@/hooks/useNotifications";
import { notificationCategoryMeta } from "@/constants/notificationCategories";
import { createElement } from "react";

const fadeIn = { hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } };

// function getGreeting() {
//   const hour = new Date().getHours();
//   if (hour < 12) return "Morning";
//   if (hour < 18) return "Afternoon";
//   return "Evening";
// }

export default function DashboardPage() {
  const { data: metrics, isLoading: metricsLoading } = useDashboardMetrics();
  const { data: favorites } = useFavorites();
  const { data: notifications } = useNotifications();
  // const { isConnected } = useWebSocket();

  // const unreadCount = notifications?.filter((n) => !n.read).length ?? 0;

  const statCards = [
    { label: "Active Routes", value: metrics?.activeRoutes, icon: IconMapPin },
    {
      label: "Riders Today",
      value: metrics?.totalRiders?.toLocaleString(),
      icon: IconUsers,
    },
    {
      label: "Avg Wait",
      value: metrics?.avgWaitTime ? `${metrics.avgWaitTime} min` : undefined,
      icon: IconClock,
    },
    {
      label: "Open Reports",
      value: metrics?.openReports,
      icon: IconAlertTriangle,
    },
  ];

  return (
    <div className="space-y-6">
      {/*       
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <span className={cn("h-2 w-2 rounded-full", isConnected ? "bg-success animate-pulse-dot" : "bg-destructive")} />
        {isConnected ? "Live updates active" : "Reconnecting…"}
        <Wifi className="ml-auto h-3 w-3" />
      </div> */}

      <div>
        {/* <h1 className="font-display text-2xl md:text-3xl font-bold">Good {getGreeting()}, Commuter 👋</h1> */}
        <p className="mt-1 text-sm text-muted-foreground">
          Here's what's happening across Kingston's bus network
        </p>
      </div>

      <motion.div
        className="grid grid-cols-2 gap-3 md:grid-cols-4"
        variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
        initial="hidden"
        animate="visible"
      >
        {statCards.map(({ label, value, icon: Icon }) => (
          <motion.div key={label} variants={fadeIn}>
            <Card className="border">
              <CardContent className="flex items-center gap-3 p-4">
                <div className="rounded-xl bg-muted p-2.5 text-primary">
                  <Icon className="h-6" />
                </div>
                <div>
                  {metricsLoading ? (
                    <Skeleton className="mb-1 h-6 w-12" />
                  ) : (
                    <p className="font-display text-2xl font-bold">{value}</p>
                  )}
                  <p className="text-xs text-muted-foreground">{label}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold flex items-center gap-2">
            <IconStar className="h-4 w-4 text-primary" /> Favorite Routes
          </h2>
          <Link
            to="/routes"
            className="text-xs font-medium text-primary hover:underline flex items-center gap-1"
          >
            All routes <IconArrowRight className="h-3 w-3" />
          </Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {favorites?.map((fav) => (
            <Link key={fav.routeId} to={`/routes/${fav.routeId}`}>
              <Card className="border transition-shadow hover:shadow-lg cursor-pointer">
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary font-display text-sm font-bold text-primary-foreground">
                      {fav.routeNumber}
                    </span>
                    <div>
                      <p className="text-sm font-medium">{fav.routeName}</p>
                      <p className="text-xs text-muted-foreground">Next bus</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-display text-lg font-bold text-secondary">
                      {fav.nextArrival} min
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold">
            Unread Notifications (3)
          </h2>
          <Link
            to="/notifications"
            className="text-xs font-medium text-primary hover:underline flex items-center gap-1"
          >
            View all <IconArrowRight className="h-3 w-3" />
          </Link>
        </div>
        <div className="space-y-2">
          {notifications?.slice(0, 3).map((n) => (
            <Card key={n.id} className="border">
              <CardContent className="flex items-start gap-3 p-3">
                {createElement(
                  notificationCategoryMeta[n.notificationCategory].Icon,
                  { className: "h-5 w-5 shrink-0" },
                )}
                <div>
                  <p className="text-sm font-medium">{n.title}</p>
                  <p className="text-xs text-muted-foreground">{n.message}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
