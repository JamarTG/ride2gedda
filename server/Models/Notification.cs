using Ride2Gedda.Enums;

namespace Ride2Gedda.Models
{
    public class Notification
    {
        public int Id { get; set; }

        public required string UserId { get; set; }
        public required ApplicationUser User { get; set; }

        public int? BusRouteId { get; set; }
        public BusRoute? BusRoute { get; set; }

        public string Title { get; set; } = string.Empty;
        public string Message { get; set; } = string.Empty;
        public NotificationCategory Category { get; set; }

        public DateTime SentAt { get; set; } = DateTime.UtcNow;
        public bool IsRead { get; set; } = false;
    }
}