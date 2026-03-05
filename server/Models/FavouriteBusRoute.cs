namespace Ride2Gedda.Models
{
    public class FavouriteBusRoute
    {
        public required string UserId { get; set; }
        public required ApplicationUser User { get; set; }

        public int BusRouteId { get; set; }
        public required BusRoute BusRoute { get; set; }
    }
}