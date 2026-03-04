namespace BusSystem.Models
{
    public class FavouriteRoute
    {
        public int UserId { get; set; }
        public User User { get; set; } = null!;

        public int RouteId { get; set; }
        public Route Route { get; set; } = null!;
    }
}