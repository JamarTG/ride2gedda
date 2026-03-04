namespace BusSystem.Models
{
    public class Stop
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;

        public ICollection<ScheduleStop> ScheduleStops { get; set; } = [];
        public ICollection<Route> OriginRoutes { get; set; } = [];
        public ICollection<Route> DestinationRoutes { get; set; } = [];
        public ICollection<RouteViaStop> ViaRoutes { get; set; } = [];
    }
}