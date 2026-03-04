import type {
  BusRoute,
  CommunityReport,
  Notification,
  DemandPrediction,
  FavoriteRoute,
  DashboardMetrics,
} from "@/types";
import { NotificationCategory, ReportCategory, ReportStatus } from "@/types";

export const mockRoutes: BusRoute[] = [
  {
    id: "r1",
    name: "Half Way Tree → Downtown Kingston",
    number: "1A",
    color: "hsl(48, 96%, 53%)",
    origin: "Half Way Tree",
    destination: "Downtown Kingston",
    isActive: true,
    frequency: "Every 12 min",
    stops: [
      { id: "s1", name: "Half Way Tree Transport Centre", latitude: 18.0106, longitude: -76.7975, routeIds: ["r1"], predictedArrival: { routeId: "r1", stopId: "s1", estimatedMinutes: 3, confidence: 0.92, updatedAt: new Date().toISOString() } },
      { id: "s2", name: "Cross Roads", latitude: 18.0076, longitude: -76.7889, routeIds: ["r1"], predictedArrival: { routeId: "r1", stopId: "s2", estimatedMinutes: 8, confidence: 0.87, updatedAt: new Date().toISOString() } },
      { id: "s3", name: "Torrington Bridge", latitude: 18.0040, longitude: -76.7850, routeIds: ["r1"], predictedArrival: { routeId: "r1", stopId: "s3", estimatedMinutes: 14, confidence: 0.81, updatedAt: new Date().toISOString() } },
      { id: "s4", name: "Parade / Downtown", latitude: 17.9974, longitude: -76.7936, routeIds: ["r1"], predictedArrival: { routeId: "r1", stopId: "s4", estimatedMinutes: 22, confidence: 0.74, updatedAt: new Date().toISOString() } },
    ],
  },
  {
    id: "r2",
    name: "Portmore → Kingston",
    number: "2B",
    color: "hsl(160, 60%, 36%)",
    origin: "Portmore Mall",
    destination: "Downtown Kingston",
    isActive: true,
    frequency: "Every 15 min",
    stops: [
      { id: "s5", name: "Portmore Mall", latitude: 17.9570, longitude: -76.8637, routeIds: ["r2"], predictedArrival: { routeId: "r2", stopId: "s5", estimatedMinutes: 5, confidence: 0.90, updatedAt: new Date().toISOString() } },
      { id: "s6", name: "Causeway Bridge", latitude: 17.9630, longitude: -76.8340, routeIds: ["r2"], predictedArrival: { routeId: "r2", stopId: "s6", estimatedMinutes: 15, confidence: 0.82, updatedAt: new Date().toISOString() } },
      { id: "s7", name: "Three Miles", latitude: 17.9800, longitude: -76.8100, routeIds: ["r2"], predictedArrival: { routeId: "r2", stopId: "s7", estimatedMinutes: 25, confidence: 0.75, updatedAt: new Date().toISOString() } },
    ],
  },
  {
    id: "r3",
    name: "Papine → Cross Roads",
    number: "3C",
    color: "hsl(0, 0%, 15%)",
    origin: "Papine",
    destination: "Cross Roads",
    isActive: false,
    frequency: "Every 20 min",
    stops: [
      { id: "s8", name: "Papine Square", latitude: 18.0195, longitude: -76.7468, routeIds: ["r3"], predictedArrival: null },
      { id: "s9", name: "Mona Campus", latitude: 18.0150, longitude: -76.7500, routeIds: ["r3"], predictedArrival: null },
      { id: "s10", name: "Liguanea", latitude: 18.0130, longitude: -76.7740, routeIds: ["r3"], predictedArrival: null },
    ],
  },
  {
    id: "r4",
    name: "Spanish Town → Kingston",
    number: "4D",
    color: "hsl(48, 96%, 53%)",
    origin: "Spanish Town",
    destination: "Parade",
    isActive: true,
    frequency: "Every 18 min",
    stops: [
      { id: "s11", name: "Spanish Town Depot", latitude: 17.9907, longitude: -76.9550, routeIds: ["r4"], predictedArrival: { routeId: "r4", stopId: "s11", estimatedMinutes: 4, confidence: 0.88, updatedAt: new Date().toISOString() } },
      { id: "s12", name: "Six Miles", latitude: 17.9850, longitude: -76.8600, routeIds: ["r4"], predictedArrival: { routeId: "r4", stopId: "s12", estimatedMinutes: 18, confidence: 0.78, updatedAt: new Date().toISOString() } },
    ],
  },
];

export const mockReports: CommunityReport[] = [
  { id: "rep1", userId: "u1", userName: "Marcus B.", category: ReportCategory.Delay, title: "Route 1A running 20 min behind", description: "Bus stuck in traffic near Cross Roads since 8am.", routeId: "r1", status: ReportStatus.Acknowledged, upvotes: 14, createdAt: "2026-03-03T08:30:00Z" },
  { id: "rep2", userId: "u2", userName: "Shanice T.", category: ReportCategory.Overcrowding, title: "Portmore bus packed at 7am", description: "No standing room on the 7:15 bus from Portmore Mall.", routeId: "r2", status: ReportStatus.Open, upvotes: 23, createdAt: "2026-03-03T07:20:00Z" },
  { id: "rep3", userId: "u3", userName: "Devon R.", category: ReportCategory.Breakdown, title: "Route 3C bus broke down at Mona", description: "Bus 3C-204 has engine trouble, blocking the stop.", routeId: "r3", status: ReportStatus.Open, upvotes: 8, createdAt: "2026-03-03T09:10:00Z" },
  { id: "rep4", userId: "u4", userName: "Tanya M.", category: ReportCategory.Safety, title: "Poor lighting at Papine stop", description: "The waiting area has no working lights after 6pm.", stopId: "s8", status: ReportStatus.Resolved, upvotes: 31, createdAt: "2026-03-02T18:00:00Z" },
];

export const mockNotifications: Notification[] = [
  { id: "n1", title: "Route 1A Delay", message: "Expected 15-minute delay due to traffic on Hope Road.", notificationCategory: NotificationCategory.Delay, routeId: "r1", read: false, createdAt: "2026-03-03T08:45:00Z" },
  { id: "n2", title: "Route 3C Suspended", message: "Service temporarily suspended due to breakdown at Mona.", notificationCategory: NotificationCategory.Breakdown, routeId: "r3", read: false, createdAt: "2026-03-03T09:15:00Z" },
  { id: "n3", title: "Fare Update", message: "New fares take effect March 10. Check the app for details.", notificationCategory: NotificationCategory.Info, read: true, createdAt: "2026-03-02T12:00:00Z" },
  { id: "n4", title: "Report Resolved", message: "Your report about Papine stop lighting has been resolved.", notificationCategory: NotificationCategory.Success, read: false, createdAt: "2026-03-03T07:00:00Z" },
];

export const mockDemandPredictions: DemandPrediction[] = [
  { hour: 5, label: "5 AM", predicted: 120, actual: 115 },
  { hour: 6, label: "6 AM", predicted: 340, actual: 360 },
  { hour: 7, label: "7 AM", predicted: 780, actual: 810 },
  { hour: 8, label: "8 AM", predicted: 920, actual: 895 },
  { hour: 9, label: "9 AM", predicted: 650, actual: 670 },
  { hour: 10, label: "10 AM", predicted: 420 },
  { hour: 11, label: "11 AM", predicted: 380 },
  { hour: 12, label: "12 PM", predicted: 510 },
  { hour: 13, label: "1 PM", predicted: 490 },
  { hour: 14, label: "2 PM", predicted: 460 },
  { hour: 15, label: "3 PM", predicted: 580 },
  { hour: 16, label: "4 PM", predicted: 750 },
  { hour: 17, label: "5 PM", predicted: 880 },
  { hour: 18, label: "6 PM", predicted: 720 },
  { hour: 19, label: "7 PM", predicted: 430 },
  { hour: 20, label: "8 PM", predicted: 250 },
];

export const mockFavorites: FavoriteRoute[] = [
  { routeId: "r1", routeName: "Half Way Tree → Downtown", routeNumber: "1A", nextArrival: 3 },
  { routeId: "r2", routeName: "Portmore → Kingston", routeNumber: "2B", nextArrival: 7 },
];

export const mockMetrics: DashboardMetrics = {
  activeRoutes: 12,
  totalRiders: 4823,
  avgWaitTime: 11,
  openReports: 7,
};
