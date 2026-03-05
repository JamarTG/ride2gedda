namespace Ride2Gedda.Models
{
    public class Stop
    {
        public int Id { get; set; }
        public required string Name { get; set;}

        public ICollection<ScheduleStop> ScheduleStops { get; set; } = [];
        public ICollection<BusRoute> OriginBusRoutes { get; set; } = [];
        public ICollection<BusRoute> DestinationBusRoutes { get; set; } = [];
        public ICollection<BusRouteViaStop> ViaBusRoutes { get; set; } = [];
    }
}