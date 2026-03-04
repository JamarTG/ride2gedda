namespace BusSystem.Models
{
    public class Route
    {
        public int Id { get; set; }
        public string RouteNumber { get; set; } = null!;

        public int OriginId { get; set; }
        public Stop Origin { get; set; } = null!;

        public int DestinationId { get; set; }
        public Stop Destination { get; set; } = null!;

        public ICollection<RouteViaStop> ViaStops { get; set; } = [];
        public string Depot { get; set; } = null!;
        public string RouteType { get; set; } = null!;

        public ICollection<RouteSchedule> Schedules { get; set; } = [];
        public ICollection<FavouriteRoute> FavouriteByUsers { get; set; } = [];
    }
}