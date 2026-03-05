

namespace Ride2Gedda.Models
{
    public class RefreshToken
    {
        public required string Token { get; set; }
        public required string UserId { get; set; }
        public virtual required ApplicationUser User { get; set;} 
        public DateTime ExpiresOn { get; set; }
        public bool IsExpired => DateTime.UtcNow >= ExpiresOn;
        public DateTime CreatedOn { get; set; }
        public DateTime? RevokedOn { get; set; }
        public bool IsActive => RevokedOn == null && !IsExpired;
    }
}