import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, MapPin, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useRoutes } from "@/hooks/useRoutes";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export default function RoutesPage() {
  const [search, setSearch] = useState("");
  const { data: routes, isLoading } = useRoutes(search);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-display text-2xl font-bold">Bus Routes</h1>
        <p className="text-sm text-muted-foreground">Browse and search all JUTC routes</p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search routes, stops, destinations…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="space-y-3">
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-20 w-full rounded-lg" />
            ))
          : routes?.map((route) => (
              <Link key={route.id} to={`/routes/${route.id}`}>
                <Card className="border-0 shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5 cursor-pointer">
                  <CardContent className="flex items-center gap-4 p-4">
                    <span
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl font-display text-base font-bold text-primary-foreground"
                      style={{ backgroundColor: route.color }}
                    >
                      {route.number}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="truncate text-sm font-semibold">{route.name}</p>
                        <Badge
                          variant={route.isActive ? "default" : "secondary"}
                          className={cn(
                            "text-[10px] px-1.5 py-0",
                            route.isActive ? "bg-success text-success-foreground" : ""
                          )}
                        >
                          {route.isActive ? "Live" : "Inactive"}
                        </Badge>
                      </div>
                      <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        <span>{route.stops.length} stops</span>
                        <span className="mx-1">·</span>
                        <span>{route.frequency}</span>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground" />
                  </CardContent>
                </Card>
              </Link>
            ))}
        {routes?.length === 0 && (
          <div className="py-12 text-center text-muted-foreground">
            <MapPin className="mx-auto mb-2 h-8 w-8" />
            <p className="font-medium">No routes found</p>
            <p className="text-sm">Try a different search term</p>
          </div>
        )}
      </div>
    </div>
  );
}
