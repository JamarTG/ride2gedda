using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace Ride2Gedda.Models
{
    public class ApplicationUser : IdentityUser
    {
        [Required, MaxLength(50)]
        public string FirstName { get; set; } = string.Empty;

        [Required, MaxLength(50)]
        public string LastName { get; set; } = string.Empty;

        public ICollection<Report> Reports { get; set; } = [];
        public ICollection<FavouriteBusRoute> FavouriteBusRoutes { get; set; } = [];
        public ICollection<Notification> Notifications { get; set; } = [];
    }

}