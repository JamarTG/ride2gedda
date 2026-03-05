using Ride2Gedda.Enums;

namespace Ride2Gedda.Models
{
    public class Report
    {
        public int Id { get; set; }

        public required string UserId { get; set; }
        public required ApplicationUser User { get; set; }

        public int? BusRouteId { get; set; }
        public BusRoute? BusRoute { get; set; }

        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public ReportCategory Category { get; set; }
        public ReportStatus Status { get; set; } = ReportStatus.Open;

        public int Upvotes { get; set; } = 0;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}