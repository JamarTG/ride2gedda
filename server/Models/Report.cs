using BusSystem.Models.Enums;

namespace BusSystem.Models
{
    public class Report
    {
        public int Id { get; set; }

        public int UserId { get; set; }
        public User User { get; set; } = null!;

        public int? RouteId { get; set; }
        public Route? Route { get; set; }

        public string Title { get; set; } = null!;
        public string Description { get; set; } = null!;
        public ReportCategory Category { get; set; }
        public ReportStatus Status { get; set; } = ReportStatus.Open;

        public int Upvotes { get; set; } = 0;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}