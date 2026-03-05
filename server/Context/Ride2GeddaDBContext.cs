using Ride2Gedda.Models;
using Microsoft.EntityFrameworkCore;

public class Ride2GeddaDBContext(DbContextOptions<Ride2GeddaDBContext> options) : DbContext(options)
{
    public DbSet<ApplicationUser> Users { get; set; }
    public DbSet<Stop> Stops { get; set; }
    public DbSet<BusRoute> BusRoutes { get; set; }
    public DbSet<BusRouteSchedule> BusRouteSchedules { get; set; }
    public DbSet<ScheduleStop> ScheduleStops { get; set; }
    public DbSet<BusRouteViaStop> BusRouteViaStops { get; set; }
    public DbSet<FavouriteBusRoute> FavouriteBusRoutes { get; set; }
    public DbSet<Report> Reports { get; set; }
    public DbSet<Notification> Notifications { get; set; }

    public DbSet<RefreshToken> RefreshTokens { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<RefreshToken>()
            .HasKey(u => u.UserId);
        
        modelBuilder.Entity<RefreshToken>()
            .HasOne(u => u.User)
            .WithMany();
            

        modelBuilder.Entity<FavouriteBusRoute>()
            .HasKey(fr => new { fr.UserId, fr.BusRouteId });

        modelBuilder.Entity<FavouriteBusRoute>()
            .HasOne(fr => fr.User)
            .WithMany(u => u.FavouriteBusRoutes)
            .HasForeignKey(fr => fr.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<FavouriteBusRoute>()
            .HasOne(fr => fr.BusRoute)
            .WithMany(r => r.FavouriteByUsers)
            .HasForeignKey(fr => fr.BusRouteId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<BusRoute>()
            .HasOne(r => r.Origin)
            .WithMany(s => s.OriginBusRoutes)
            .HasForeignKey(r => r.OriginId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<BusRoute>()
            .HasOne(r => r.Destination)
            .WithMany(s => s.DestinationBusRoutes)
            .HasForeignKey(r => r.DestinationId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<BusRouteViaStop>()
            .HasOne(vs => vs.BusRoute)
            .WithMany(r => r.ViaStops)
            .HasForeignKey(vs => vs.BusRouteId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<BusRouteViaStop>()
            .HasOne(vs => vs.Stop)
            .WithMany(s => s.ViaBusRoutes)
            .HasForeignKey(vs => vs.StopId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<BusRouteViaStop>()
            .HasIndex(vs => new { vs.BusRouteId, vs.Sequence })
            .IsUnique();

        modelBuilder.Entity<BusRouteSchedule>()
            .HasOne(rs => rs.BusRoute)
            .WithMany(r => r.Schedules)
            .HasForeignKey(rs => rs.BusRouteId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<ScheduleStop>()
            .HasOne(ss => ss.BusRouteSchedule)
            .WithMany(rs => rs.Stops)
            .HasForeignKey(ss => ss.BusRouteScheduleId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<ScheduleStop>()
            .HasOne(ss => ss.Stop)
            .WithMany(s => s.ScheduleStops)
            .HasForeignKey(ss => ss.StopId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<ScheduleStop>()
            .HasIndex(ss => new { ss.BusRouteScheduleId, ss.Sequence })
            .IsUnique();

        modelBuilder.Entity<ApplicationUser>()
            .HasMany(u => u.Reports)
            .WithOne(r => r.User)
            .HasForeignKey(r => r.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<ApplicationUser>()
            .HasMany(u => u.Notifications)
            .WithOne(n => n.User)
            .HasForeignKey(n => n.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Report>()
            .HasOne(r => r.BusRoute)
            .WithMany()
            .HasForeignKey(r => r.BusRouteId)
            .OnDelete(DeleteBehavior.SetNull);


        modelBuilder.Entity<Notification>()
            .HasOne(n => n.BusRoute)
            .WithMany()
            .HasForeignKey(n => n.BusRouteId)
            .OnDelete(DeleteBehavior.SetNull);
    }
}