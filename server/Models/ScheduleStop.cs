namespace Ride2Gedda.Models
{
    public class ScheduleStop
    {
        public int Id { get; set; }

        public int BusRouteScheduleId { get; set; }
        public required BusRouteSchedule BusRouteSchedule { get; set; }

        public int StopId { get; set; }
        public required Stop Stop { get; set; }

        public int Sequence { get; set; } 
        public TimeSpan? ArrivalTime { get; set; }
        public TimeSpan? DepartureTime { get; set; }
    }
}