import { IconChartBar, IconTrendingUp } from "@tabler/icons-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDemandPredictions } from "@/hooks/useDashboard";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function PredictionChartPage() {
  const { data, isLoading } = useDemandPredictions();

  const peakHour = data?.reduce((max, d) => (d.predicted > max.predicted ? d : max), data[0]);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-display text-2xl md:text-3xl font-bold flex items-center gap-2">
          <IconChartBar className="h-6 w-6 text-primary" /> AI Demand Predictions
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Machine learning model forecasting rider demand across all routes
        </p>
      </div>

      {/* {peakHour && (
        <Card className="border bg-primary/10">
          <CardContent className="flex items-center gap-3 p-4">
            <IconTrendingUp className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm font-semibold">Peak Hour: {peakHour.label}</p>
              <p className="text-xs text-muted-foreground">
                Predicted {peakHour.predicted.toLocaleString()} riders — plan extra buses
              </p>
            </div>
          </CardContent>
        </Card>
      )} */}

      <Card className="border">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Hourly Ridership Forecast</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Skeleton className="h-64 w-full" />
          ) : (
            <ResponsiveContainer width="100%" height={320}>
              <AreaChart data={data} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                <defs>
                  <linearGradient id="predicted" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(48, 96%, 53%)" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="hsl(48, 96%, 53%)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="actual" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(160, 60%, 36%)" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="hsl(160, 60%, 36%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(48, 10%, 80%)" opacity={0.3} />
                <XAxis dataKey="label" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{
                    borderRadius: "0.75rem",
                    border: "none",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
                    fontSize: 12,
                  }}
                />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Area
                  type="monotone"
                  dataKey="predicted"
                  stroke="hsl(48, 96%, 53%)"
                  strokeWidth={2}
                  fill="url(#predicted)"
                  name="Predicted"
                />
                <Area
                  type="monotone"
                  dataKey="actual"
                  stroke="hsl(160, 60%, 36%)"
                  strokeWidth={2}
                  fill="url(#actual)"
                  name="Actual"
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
