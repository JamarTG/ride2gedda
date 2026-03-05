using System.ComponentModel.DataAnnotations;

namespace Ride2Gedda.Dto
{
    public class RegisterDto
    {
        [Required]
        [StringLength(100)]
        public string FirstName { get; set; } = string.Empty;

        [Required]
        [StringLength(100)]
        public string LastName { get; set; } = string.Empty;

        [Required]
        [StringLength(128)]
        public string Email { get; set; } = string.Empty;

        [StringLength(256)]
        [Required]
        public string Password { get; set; } = string.Empty;

        public string? ErrorMessage { get; set; }
        public string? SuccessMessage { get; set; }
    }
}

