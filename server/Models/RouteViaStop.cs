namespace BusSystem.Models
{
    public class RouteViaStop
    {
        public int Id { get; set; }

        public int RouteId { get; set; }
        public Route Route { get; set; } = null!;

        public int StopId { get; set; }
        public Stop Stop { get; set; } = null!;

        public int Sequence { get; set; }
    }
}
