using System.ComponentModel.DataAnnotations;

namespace Ride2Gedda.Dto
{
    public class LoginRequestDto
    {
        [Required]
        [StringLength(128)]
        public string Email { get; set; } = string.Empty;

        [StringLength(256)]
        [Required]
        public string Password { get; set; } = string.Empty;
    }
}

