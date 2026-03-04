namespace BusSystem.Models
{
    public class User
    {
        public int Id { get; set; }
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string PasswordHash { get; set; } = null!;

        public ICollection<Report> Reports { get; set; } = [];
        public ICollection<FavouriteRoute> FavouriteRoutes { get; set; } = [];
        public ICollection<Notification> Notifications { get; set; } = [];
    }
}