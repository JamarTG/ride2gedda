import { useParams, Link } from "react-router-dom";
import { ArrowLeft, MapPin, Clock, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useRoute } from "@/hooks/useRoutes";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/utils";

export default function RouteDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: route, isLoading } = useRoute(id!);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-40 w-full" />
        <Skeleton className="h-60 w-full" />
      </div>
    );
  }

  if (!route) {
    return (
      <div className="py-20 text-center">
        <p className="text-lg font-medium">Route not found</p>
        <Link to="/routes" className="text-primary hover:underline text-sm mt-2 inline-block">
          ← Back to routes
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <Link to="/routes" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Back
      </Link>

      
      <div className="flex items-start gap-4">
        <span
          className="flex h-14 w-14 items-center justify-center rounded-2xl font-display text-lg font-bold text-primary-foreground shadow-lg"
          style={{ backgroundColor: route.color }}
        >
          {route.number}
        </span>
        <div>
          <h1 className="font-display text-xl font-bold">{route.name}</h1>
          <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
            <Badge variant={route.isActive ? "default" : "secondary"} className={cn(route.isActive && "bg-success text-success-foreground")}>
              {route.isActive ? "Active" : "Inactive"}
            </Badge>
            <span>{route.frequency}</span>
          </div>
        </div>
      </div>

      
      <Card className="border ">
        <CardHeader className="pb-2">
          <CardTitle className="font-display text-base flex items-center gap-2">
            <MapPin className="h-4 w-4 text-secondary" /> Stops & AI Predictions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative ml-4 border-l-2 border-dashed border-muted pl-6">
            {route.stops.map((stop, i) => {
              const isFirst = i === 0;
              const isLast = i === route.stops.length - 1;
              const arrival = stop.predictedArrival;

              return (
                <div key={stop.id} className="relative pb-6 last:pb-0">
                  
                  <div
                    className={cn(
                      "absolute -left-[31px] h-4 w-4 rounded-full border-2 border-card",
                      isFirst ? "bg-secondary" : isLast ? "bg-primary" : "bg-muted-foreground/40"
                    )}
                  />
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className={cn("text-sm font-medium", (isFirst || isLast) && "font-semibold")}>
                        {stop.name}
                      </p>
                      {isFirst && <span className="text-xs text-secondary">Origin</span>}
                      {isLast && <span className="text-xs text-primary">Destination</span>}
                    </div>
                    {arrival && (
                      <div className="flex items-center gap-1.5 rounded-lg bg-muted px-2.5 py-1">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        <span className="font-display text-sm font-bold">{arrival.estimatedMinutes} min</span>
                        <Zap className="h-3 w-3 text-primary" />
                        <span className="text-[10px] text-muted-foreground">{Math.round(arrival.confidence * 100)}%</span>
                      </div>
                    )}
                    {!arrival && !route.isActive && (
                      <span className="text-xs text-muted-foreground">No predictions</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
