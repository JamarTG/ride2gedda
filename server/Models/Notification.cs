using BusSystem.Models.Enums;

namespace BusSystem.Models
{
    public class Notification
    {
        public int Id { get; set; }

        public int UserId { get; set; }
        public User User { get; set; } = null!;

        public int? RouteId { get; set; }
        public Route? Route { get; set; }

        public string Title { get; set; } = null!;
        public string Message { get; set; } = null!;
        public NotificationCategory Category { get; set; }

        public DateTime SentAt { get; set; } = DateTime.UtcNow;
        public bool IsRead { get; set; } = false;
    }
}