using BusSystem.Models.Enums;

namespace BusSystem.Models
{
    public class RouteSchedule
    {
        public int Id { get; set; }
        public int RouteId { get; set; }
        public Route Route { get; set; } = null!;

        public DayType? DayType { get; set; } // null = generic schedule

        public ICollection<ScheduleStop> Stops { get; set; } = [];
    }
}