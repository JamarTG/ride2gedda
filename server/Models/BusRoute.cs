namespace Ride2Gedda.Models
{
    public class BusRoute
    {
        public int Id { get; set; }
        public required string BusRouteNumber { get; set; }

        public int OriginId { get; set; }
        public required Stop Origin { get; set; }

        public int DestinationId { get; set; }
        public required Stop Destination { get; set; }

        public ICollection<BusRouteViaStop> ViaStops { get; set; } = [];
        public string? Depot { get; set; }
        public required string BusRouteType { get; set; }

        public ICollection<BusRouteSchedule> Schedules { get; set; } = [];
        public ICollection<FavouriteBusRoute> FavouriteByUsers { get; set; } = [];
    }
}