import { useState } from "react";
import { Link } from "react-router-dom";
import { IconSearch, IconMapPin, IconChevronRight } from "@tabler/icons-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { OutlineBadge } from "@/components/OutlineBadge";
import { useRoutes } from "@/hooks/useRoutes";
import { Skeleton } from "@/components/ui/skeleton";

export default function RoutesPage() {
  const [search, setSearch] = useState("");
  const { data: routes, isLoading } = useRoutes(search);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-display text-2xl md:text-3xl font-bold">
          Bus Routes
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Browse and search all JUTC routes
        </p>
      </div>

      <div className="relative">
        <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search routes, stops, destinations…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="space-y-3 flex flex-col">
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-20 w-full rounded-lg" />
            ))
          : routes?.map((route) => (
              <Link key={route.id} to={`/routes/${route.id}`}>
                <Card className="border transition-all hover:bg-primary/10 hover:-translate-y-0.5 cursor-pointer">
                  <CardContent className="flex items-center gap-4 p-4">
                    <b className={`text-4xl border p-4 ${route.isActive ? "text-primary border-primary" : "text-muted-foreground border-border"} rounded-sm`}>{route.number}</b>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="truncate text-sm font-semibold">
                          {route.name}
                        </p>
                        <OutlineBadge
                          tone={route.isActive ? "success" : "muted"}
                        >
                          {route.isActive ? "Live" : "Inactive"}
                        </OutlineBadge>
                      </div>
                      <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                        <IconMapPin className="h-4" />
                        <span>{route.stops.length} stops</span>
                        <span className="mx-1">·</span>
                        <span>{route.frequency}</span>
                      </div>
                    </div>
                    <IconChevronRight className="h-5 w-5 shrink-0 text-muted-foreground" />
                  </CardContent>
                </Card>
              </Link>
            ))}

        {routes?.length === 0 && (
          <div className="py-12 text-center text-muted-foreground">
            <IconMapPin className="mx-auto mb-2 h-8 w-8" />
            <p className="font-medium">No routes found</p>
            <p className="text-sm">Try a different search term</p>
          </div>
        )}
      </div>
    </div>
  );
}
