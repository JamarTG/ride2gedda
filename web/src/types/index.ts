import { IconProps } from "@tabler/icons-react";

export enum UserRole {
  Citizen = "citizen",
  Driver = "driver",
  Admin = "admin",
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  avatarUrl?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials extends LoginCredentials {
  firstName: string;
  lastName: string;
  role: UserRole;
}

export interface BusRoute {
  id: string;
  name: string;
  number: string;
  color: string;
  origin: string;
  destination: string;
  stops: BusStop[];
  isActive: boolean;
  frequency: string;
}

export interface BusStop {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  routeIds: string[];
  predictedArrival: PredictedArrival | null;
}

export interface PredictedArrival {
  routeId: string;
  stopId: string;
  estimatedMinutes: number;
  confidence: number;
  updatedAt: string;
}

export interface CommunityReport {
  id: string;
  userId: string;
  userName: string;
  category: ReportCategory;
  title: string;
  description: string;
  routeId?: string;
  stopId?: string;
  status: ReportStatus;
  upvotes: number;
  createdAt: string;
}

export enum ReportCategory {
  Delay = "delay",
  Safety = "safety",
  Overcrowding = "overcrowding",
  Breakdown = "breakdown",
  RouteChange = "route_change",
  Other = "other",
}
export enum NotificationCategory {
  Delay = "delay",
  Safety = "safety",
  Overcrowding = "overcrowding",
  Breakdown = "breakdown",
  RouteChange = "route_change",
  Info = "informational",
  Reminder = "reminder",
  Announcement = "announcement",
  Success = "success",
}

export interface CategoryMeta {
  label: string;
  Icon: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<SVGSVGElement>>;
}

export enum ReportStatus {
  Open = "open",
  Acknowledged = "acknowledged",
  Resolved = "resolved",
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  notificationCategory: NotificationCategory;
  routeId?: string;
  read: boolean;
  createdAt: string;
}

export interface DemandPrediction {
  hour: number;
  label: string;
  predicted: number;
  actual?: number;
}

export interface FavoriteRoute {
  routeId: string;
  routeName: string;
  routeNumber: string;
  nextArrival: number;
  origin: string;
  destination: string;
}

export interface DashboardMetrics {
  activeRoutes: number;
  totalRiders: number;
  avgWaitTime: number;
  openReports: number;
}
