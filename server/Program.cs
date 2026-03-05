using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Ride2Gedda.Models;
using Ride2Gedda.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var connectionString =
    builder.Configuration.GetConnectionString("DefaultConnection")
        ?? throw new InvalidOperationException("Connection string"
        + "'DefaultConnection' not found.");

builder.Services.AddIdentity<ApplicationUser, IdentityRole>()
    .AddEntityFrameworkStores<Ride2GeddaDBContext>()
    .AddDefaultTokenProviders();

builder.Services.AddCors(options =>
   {
       options.AddPolicy("Allow8080",
           builder => builder.WithOrigins("http://localhost:8080") //for now
                             .AllowAnyMethod()
                             .AllowAnyHeader());
   });

builder.Services.AddDbContext<Ride2GeddaDBContext>(options =>
    options.UseNpgsql(connectionString));

builder.Services.AddControllers();

builder.Services.AddScoped<AuthService>();

var app = builder.Build();


if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseCors("Allow8080");

app.MapControllers();

app.UseHttpsRedirection();

app.UseCors();

app.Run();