using BusSystem.Models;
using Microsoft.EntityFrameworkCore;

public class Ride2GeddaDBContext(DbContextOptions<Ride2GeddaDBContext> options) : DbContext(options)
{
    public DbSet<User> Users { get; set; }
    public DbSet<Stop> Stops { get; set; }
    public DbSet<BusSystem.Models.Route> Routes { get; set; }
    public DbSet<RouteSchedule> RouteSchedules { get; set; }
    public DbSet<ScheduleStop> ScheduleStops { get; set; }
    public DbSet<RouteViaStop> RouteViaStops { get; set; }
    public DbSet<FavouriteRoute> FavouriteRoutes { get; set; }
    public DbSet<Report> Reports { get; set; }
    public DbSet<Notification> Notifications { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<FavouriteRoute>()
            .HasKey(fr => new { fr.UserId, fr.RouteId });

        modelBuilder.Entity<FavouriteRoute>()
            .HasOne(fr => fr.User)
            .WithMany(u => u.FavouriteRoutes)
            .HasForeignKey(fr => fr.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<FavouriteRoute>()
            .HasOne(fr => fr.Route)
            .WithMany(r => r.FavouriteByUsers)
            .HasForeignKey(fr => fr.RouteId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<BusSystem.Models.Route>()
            .HasOne(r => r.Origin)
            .WithMany(s => s.OriginRoutes)
            .HasForeignKey(r => r.OriginId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<BusSystem.Models.Route>()
            .HasOne(r => r.Destination)
            .WithMany(s => s.DestinationRoutes)
            .HasForeignKey(r => r.DestinationId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<RouteViaStop>()
            .HasOne(vs => vs.Route)
            .WithMany(r => r.ViaStops)
            .HasForeignKey(vs => vs.RouteId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<RouteViaStop>()
            .HasOne(vs => vs.Stop)
            .WithMany(s => s.ViaRoutes)
            .HasForeignKey(vs => vs.StopId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<RouteViaStop>()
            .HasIndex(vs => new { vs.RouteId, vs.Sequence })
            .IsUnique();

        modelBuilder.Entity<RouteSchedule>()
            .HasOne(rs => rs.Route)
            .WithMany(r => r.Schedules)
            .HasForeignKey(rs => rs.RouteId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<ScheduleStop>()
            .HasOne(ss => ss.RouteSchedule)
            .WithMany(rs => rs.Stops)
            .HasForeignKey(ss => ss.RouteScheduleId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<ScheduleStop>()
            .HasOne(ss => ss.Stop)
            .WithMany(s => s.ScheduleStops)
            .HasForeignKey(ss => ss.StopId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<ScheduleStop>()
            .HasIndex(ss => new { ss.RouteScheduleId, ss.Sequence })
            .IsUnique();

        modelBuilder.Entity<User>()
            .HasMany(u => u.Reports)
            .WithOne(r => r.User)
            .HasForeignKey(r => r.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<User>()
            .HasMany(u => u.Notifications)
            .WithOne(n => n.User)
            .HasForeignKey(n => n.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Report>()
            .HasOne(r => r.Route)
            .WithMany()
            .HasForeignKey(r => r.RouteId)
            .OnDelete(DeleteBehavior.SetNull);


        modelBuilder.Entity<Notification>()
            .HasOne(n => n.Route)
            .WithMany()
            .HasForeignKey(n => n.RouteId)
            .OnDelete(DeleteBehavior.SetNull);
    }
}