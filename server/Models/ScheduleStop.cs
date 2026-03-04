using System;

namespace BusSystem.Models
{
    public class ScheduleStop
    {
        public int Id { get; set; }

        public int RouteScheduleId { get; set; }
        public RouteSchedule RouteSchedule { get; set; } = null!;

        public int StopId { get; set; }
        public Stop Stop { get; set; } = null!;

        public int Sequence { get; set; } 
        public TimeSpan? ArrivalTime { get; set; }
        public TimeSpan? DepartureTime { get; set; }
    }
}