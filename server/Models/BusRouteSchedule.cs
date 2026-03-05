using Ride2Gedda.Enums;

namespace Ride2Gedda.Models
{
    public class BusRouteSchedule
    {
        public int Id { get; set; }
        public int BusRouteId { get; set; }
        public required BusRoute BusRoute { get; set; }

        public DayType? DayType { get; set; } 

        public ICollection<ScheduleStop> Stops { get; set; } = [];
    }
}